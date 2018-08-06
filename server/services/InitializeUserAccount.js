const DBConnect = require('./DBConnector');

function InitializeUserAccount(profile) {
  this.profile = profile;
}

InitializeUserAccount.prototype.prepare = function() {
  return userExist(this.profile);
};

function userExist(profile) {
  console.log(profile.emails);
  DBConnect.prepare(profile);
  return DBConnect.getUser(profile.id).then(
    user => (user ? DBConnect.putUser(profile) : DBConnect.setUser(profile)),
  );
}

module.exports = InitializeUserAccount;
