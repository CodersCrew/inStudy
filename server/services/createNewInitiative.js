const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const FBCrawler = require('./../services/Crawler/FBCrawler');

module.exports = function (initiative, user) {
  console.log(initiative, user)
  return initiativeNotExist(initiative)
    .then(() => createInitiative(mapUserInputToSave(initiative), user))
    // .then((createdInitiative) => assignToUser(createdInitiative, user))
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

function initiativeNotExist({ email }) {
  return Initiative.findOne({ email })
    .then((initiative) => {
      if(initiative) return new Error('Dana inicjatywa już istnieje')
      else return true;
    })
}

function mapUserInputToSave(RAWInputData) {
  const FBUrlRegExp = new RegExp('^@([a-zA-Z0-9]+)$|facebook\.com\/([a-zA-Z0-9]+)\/?$|facebook\.com\/pg\/([a-zA-Z0-9]+)\/?|^[a-zA-Z0-9]+$', 'i')
    .exec(RAWInputData.facebookUrl);

  RAWInputData.facebookUrl = FBUrlRegExp.slice(0).reverse().find((singleMatch) => singleMatch);
  return RAWInputData;
}
