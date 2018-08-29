import mongoose from 'mongoose';
import FBCrawler from './../services/Crawler/FBCrawler';

const createInitiative = (initiative, user) => {
  const Initiative = mongoose.model('initiatives');

  return new FBCrawler()
    .addPage(`https://www.facebook.com/pg/${initiative.facebookUrl}/about/?ref=page_internal`)
    .scrape()
    .then(fetchedProfile => {
      console.log(fetchedProfile);
      return new Initiative({ ...initiative, FBProfile: fetchedProfile }).save();
    })
    .then(createdInitaitive => assignToUser(createdInitaitive._id, user._id));
};

const assignToUser = (createdInitiativeId, userId) =>
  mongoose.model('users').findByIdAndUpdate(userId, {
    $addToSet: {
      initiatives: new mongoose.mongo.ObjectId(createdInitiativeId),
    },
  });

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

export default (initiative, user) => initiativeNotExist(mapUserInputToSave(initiative)).then(() => createInitiative(initiative, user));
