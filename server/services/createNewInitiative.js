const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const FBCrawler = require('./../services/Crawler/FBCrawler');

module.exports = function (initiative, user) {
  console.log(initiative, user)
  return initiativeNotExist(initiative)
    .then(() => createInitiative(initiative, user))
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
    .then((createdInitaitive) => {
      return User.findByIdAndUpdate(user._id, {
        $addToSet: {
          initiatives: new mongoose.mongo.ObjectId(createdInitaitive._id),
        }
      })
    })
}

function assignToUser(createdInitiative, user) {
  return User
    .findByIdAndUpdate(user, {
      $addToSet: {
        initiatives: new mongoose.mongo.ObjectId(createdInitiative._id),
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
