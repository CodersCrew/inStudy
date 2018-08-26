const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports.addNewModule = function (module, user) {
  return User.findByIdAndUpdate(user._id, {
    $addToSet: {
      modules: module,
    }
  })
};
