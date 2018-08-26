const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const FBCrawler = require('./../services/Crawler/FBCrawler');

module.exports = function (initiative, user) {
  return initiativeNotExist(mapUserInputToSave(initiative))
    .then(() => createInitiative(initiative, user))
};

function createInitiative(initiative, user) {
  return new FBCrawler()
    .addPage(`https://www.facebook.com/pg/${initiative.facebookUrl}/about/?ref=page_internal`)
    .scrape()
    .then((fetchedProfile) => {
      return new Initiative({ ...initiative, FBProfile: fetchedProfile})
        .save();
    })
    .then((createdInitaitive) => assignToUser(createdInitaitive._id, user._id))
}

function assignToUser(createdInitiativeId, userId) {
  return User
    .findByIdAndUpdate(userId, {
      $addToSet: {
        initiatives: new mongoose.mongo.ObjectId(createdInitiativeId),
      }
    })
}

function initiativeNotExist(initiative) {
  const { email, facebookUrl, shortUrl } = initiative;
  return Initiative.findOne({
    $or: [{ email }, { facebookUrl }, { shortUrl }],
  })
    .then((initiative) => {
      if(initiative) {
        return Promise.reject('Dana inicjatywa już istnieje')
      }

      return true;
    })
}

function mapUserInputToSave(RAWInputData) {
  const FBUrlRegExp = new RegExp('^@([a-zA-Z0-9]+)$|facebook\.com\/([a-zA-Z0-9]+)\/?$|facebook\.com\/pg\/([a-zA-Z0-9]+)\/?|^[a-zA-Z0-9]+$', 'i')
    .exec(RAWInputData.facebookUrl);

  //TODO: dodac obslluge bledow
  RAWInputData.facebookUrl = FBUrlRegExp.slice(0).reverse().find((singleMatch) => singleMatch);
  RAWInputData.shortUrl = RAWInputData.facebookUrl;

  return RAWInputData;
}
