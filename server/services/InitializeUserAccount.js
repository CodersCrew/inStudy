const DBConnect = require('./DBConnector');

const userExist = profile => {
  DBConnect.prepare(profile);
  return DBConnect.getUser(profile.id).then(
    user => (user ? DBConnect.putUser(profile) : DBConnect.setUser(profile)),
  );
};

class InitializeUserAccount {
  constructor(profile) {
    this.profile = profile;
  }

  prepare() {
    return userExist(this.profile);
  }
}

module.exports = InitializeUserAccount;
