import mongoose from 'mongoose';
const InitiativeModel = mongoose.model('initiatives');
const UserModel = mongoose.model('users');
const MemberModel = mongoose.model('member');
const UniversityModel = mongoose.model('universities');

export const REVERT_INITIATIVE = 'REVERT_INITIATIVE';

const revertSingleInitiative = (data) => () => {
  const { _id } = data;
  return InitiativeModel.findByIdAndRemove(_id);
};

export default (kind, data) => {
  const options = {
    REVERT_INITIATIVE: revertSingleInitiative(data),
  };

  options[kind]();
}
