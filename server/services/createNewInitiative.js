import mongoose from 'mongoose';
const Initiative = mongoose.model('initiatives');
const Member = mongoose.model('member');
import FBCrawler from './../services/Crawler/FBCrawler';
import roles, { ADMIN } from './../services/roles';

const assignToUser = async (createdInitiative, userId) => {
  console.log(createdInitiative);
  await mongoose.model('users').findByIdAndUpdate(userId, {
    $addToSet: {
      initiatives: new mongoose.mongo.ObjectId(createdInitiative._id),
    },
  });
  return createdInitiative;
};

const createInitiative = (initiative, user) => {

  const newMember = new Member(roles(user.id, ADMIN, initiative));

  return new Initiative({ ...initiative, members: [newMember] }).save()
    .then(createdInitiative => assignToUser(createdInitiative, user._id));
  // return new FBCrawler()
  //   .addPage(`https://www.facebook.com/pg/${initiative.facebookUrl}/about/?ref=page_internal`)
  //   .scrape()
  //   .then(fetchedProfile => {
  //
  //     const newMember = new Member(roles(user.id, ADMIN, initiative));
  //     return new Initiative({ ...initiative, FBProfile: fetchedProfile[0]?.content, members: [newMember] }).save();
  //   })
  //   .then(createdInitiative => assignToUser(createdInitiative, user._id));
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
        return Promise.reject('ITEM_EXIST');
      }

      return true;
    });
};

const mapUserInputToSave = RAWInputData => {
  const FBUrlRegExp = new RegExp(
    '^@([a-zA-Z0-9]+)$|facebook\.com\/([a-zA-Z0-9]+)\/?$|facebook\.com\/pg\/([a-zA-Z0-9]+)\/?|^[a-zA-Z0-9]+$|facebook\.com\/([a-zA-Z0-9.]+)\/?',
    'i',
  );

  //TODO: dodac obslluge bledow
  RAWInputData.facebookUrl = FBUrlRegExp.exec(RAWInputData.facebookUrl)
    .slice(0)
    .reverse()
    .find(singleMatch => singleMatch);
  RAWInputData.shortUrl = RAWInputData.facebookUrl;

  return RAWInputData;
};

export default (initiative, user) =>
  initiativeNotExist(mapUserInputToSave(initiative))
    .then(() => createInitiative(initiative, user));
