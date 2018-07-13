const DBConnect = require('./DBConnector');

function InitializeUserAccount(profile) {
  this.profile = profile;
}

InitializeUserAccount.prototype.prepare = function() {
  return userExist(this.profile)
};

function userExist(profile) {
  DBConnect.prepare(profile)
  return DBConnect.getUser(profile.id)
    .then(user => {
      if(user) {
        return DBConnect.putUser(profile);
      } else {
        return DBConnect.setUser(profile)
      }
    })
}

module.exports = InitializeUserAccount;
