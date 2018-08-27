import mongoose from 'mongoose';
import FBCrawler from './../services/Crawler/FBCrawler';

const createInitiative = (initiative, user) =>
  new FBCrawler()
    .addPage(`https://www.facebook.com/pg/${initiative.facebookUrl}/about/?ref=page_internal`)
    .scrape()
    .then(fetchedProfile => {
      const Initiative = mongoose.model('initiatives');
      return new Initiative({ ...initiative, FBProfile: fetchedProfile }).save();
    })
    .then(createdInitaitive => {
      return mongoose.model('users').findByIdAndUpdate(user._id, {
        $addToSet: {
          initiatives: new mongoose.mongo.ObjectId(createdInitaitive._id),
        },
      });
    });

const assignToUser = (createdInitiative, user) =>
  mongoose.model('users').findByIdAndUpdate(user, {
    $addToSet: {
      initiatives: new mongoose.mongo.ObjectId(createdInitiative._id),
    },
  });

const initiativeNotExist = ({ email }) =>
  mongoose
    .model('initiatives')
    .findOne({ email })
    .then(initiative => (initiative ? new Error('Dana inicjatywa już istnieje') : true));

export default (initiative, user) => {
  console.log(initiative, user);
  return initiativeNotExist(initiative).then(() => createInitiative(initiative, user));
  // .then((createdInitiative) => assignToUser(createdInitiative, user))
};
