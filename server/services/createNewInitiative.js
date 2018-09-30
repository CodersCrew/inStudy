import mongoose from 'mongoose';
import revertChanges, { REVERT_INITIATIVE } from './revertChanges';
import to from './../utils/to';
const UserModel = mongoose.model('users');
const InitiativeModel = mongoose.model('initiatives');
const MemberModel = mongoose.model('member');
const { ObjectId } = mongoose.mongo;

const createInitiative = (initiative, user) => {
  const newMember = new MemberModel({
    user: new ObjectId(user._id),
    role: 'admin',
    roleDescription: `Członek inicjatywy "${initiative.name}" działającej na uczelni ${initiative.university}, obszarze ${initiative.category}`,
  });

  return new InitiativeModel({ ...initiative, members: [newMember] }).save()
  .then(createdInitiative => assignToUser(createdInitiative, user._id));
}

const assignToUser = async (createdInitiative, userId) => {
  const { _id } = createdInitiative;

  console.log(createdInitiative);
  const assignUserQuery = {
    $addToSet: {
      initiatives: new ObjectId(_id),
    },
  };

  const [err] = await to(UserModel.findByIdAndUpdate(userId, assignUserQuery));
  if (err) await revertChanges(REVERT_INITIATIVE, { _id });
  return createdInitiative;
};

const initiativeNotExist = (initiative) => {
  const { email, facebookUrl, shortUrl } = initiative;
  return InitiativeModel
    .findOne({
      $or: [{ email }, { facebookUrl }, { shortUrl }],
    })
    .then((initiative) => {
      if (initiative) {
        return Promise.reject('ITEM_EXIST');
      }

      return true;
    });
};

const mapUserInputToSave = (RAWInputData) => {
  const FBUrlRegExp = new RegExp(
    '^@([a-zA-Z0-9]+)$|facebook\.com\/([a-zA-Z0-9]+)\/?$|facebook\.com\/pg\/([a-zA-Z0-9]+)\/?|^[a-zA-Z0-9]+$|facebook\.com\/([a-zA-Z0-9.]+)\/?',
    'i',
  );

  //TODO: dodac obslluge bledow
  let fetchedPhrase = FBUrlRegExp.exec(RAWInputData.facebookUrl);

  if (fetchedPhrase) {
    RAWInputData.facebookUrl = fetchedPhrase
      .slice(0)
      .reverse()
      .find(singleMatch => singleMatch);
  }

  RAWInputData.shortUrl = RAWInputData.facebookUrl;
  return RAWInputData;
};

export default (initiative, user) =>
  initiativeNotExist(mapUserInputToSave(initiative))
    .then(() => createInitiative(initiative, user));
