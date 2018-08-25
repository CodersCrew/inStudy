const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');

module.exports = function (initiative, user) {
  return initiativeNotExist(initiative)
    .then(() => createInitiative(initiative))
    .then((createdInitiative) => assignToUser(createdInitiative, user))
};

function createInitiative(initiative) {
  return new Initiative(initiative)
    .save();
}

function assignToUser(createdInitiative, user) {
  return User
    .findByIdAndUpdate(user._id, {
      $addToSet: {
        initiatives: new mongoose.mongo.ObjectId(createdInitiative._id),
      }
    })
}

function initiativeNotExist({ shortUrl }) {
  return Initiative.findOne({ shortUrl })
    .then((initiative) => {
      if(initiative) return new Error('Dana inicjatywa już istnieje')
      else return initiative;
    })
}
