import mongoose from 'mongoose';
const Initiative = mongoose.model('initiatives');
const Member = mongoose.model('member');
import FBCrawler from './../services/Crawler/FBCrawler';

const createInitiative = (initiative, user) => {

  return new FBCrawler()
    .addPage(`https://www.facebook.com/pg/${initiative.facebookUrl}/about/?ref=page_internal`)
    .scrape()
    .then(fetchedProfile => {
      const newMember = new Member({
        user: new mongoose.mongo.ObjectId(user._id),
        role: 'admin',
        roleDescription: `Członek inicjatywy "${initiative.name}" działającej na uczelni ${initiative.university}, obszarze ${initiative.category}`
      });

      return new Initiative({ ...initiative, FBProfile: fetchedProfile, members: [newMember] }).save();
    })
    .then(createdInitiative => assignToUser(createdInitiative, user._id));
};

const assignToUser = async (createdInitiative, userId) => {
  await mongoose.model('users').findByIdAndUpdate(userId, {
    $addToSet: {
      initiatives: new mongoose.mongo.ObjectId(createdInitiative._id),
    },
  });
  return createdInitiative;
};

const initiativeNotExist = initiative => {
  const { email, facebookUrl, shortUrl } = initiative;
  return mongoose
    .model('initiatives')
    .findOne({
      $or: [{ email }, { facebookUrl }, { shortUrl }],
    })
    .then(initiative => {
      if (initiative) {
        return Promise.reject('Dana inicjatywa już istnieje');
      }

      return true;
    });
};

const mapUserInputToSave = RAWInputData => {
  const FBUrlRegExp = new RegExp(
    '^@([a-zA-Z0-9]+)$|facebook.com/([a-zA-Z0-9]+)/?$|facebook.com/pg/([a-zA-Z0-9]+)/?|^[a-zA-Z0-9]+$',
    'i',
  ).exec(RAWInputData.facebookUrl);

  //TODO: dodac obslluge bledow
  RAWInputData.facebookUrl = FBUrlRegExp.slice(0)
    .reverse()
    .find(singleMatch => singleMatch);
  RAWInputData.shortUrl = RAWInputData.facebookUrl;

  return RAWInputData;
};

export default (initiative, user) =>
  initiativeNotExist(mapUserInputToSave(initiative))
    .then(() => createInitiative(initiative, user));
