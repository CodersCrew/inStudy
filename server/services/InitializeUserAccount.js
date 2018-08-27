import DBConnect from './DBConnector';

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

  prepare = () => userExist(this.profile);
}

export default InitializeUserAccount;
