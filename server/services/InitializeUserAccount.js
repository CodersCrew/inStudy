function InitializeUserAccount(profile) {
  this.profile = profile;
}

InitializeUserAccount.prototype.prepare = function() {
  return checkUser(this.profile)
};

function checkUser(profile) {
  if(userExist(profile)) {
    return UpdateUserProfile();
  } else {
    return createUser(profile)
  }
}

function userExist() {

}

module.exports = InitializeUserAccount;
