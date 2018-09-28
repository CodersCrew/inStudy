import mongoose from 'mongoose';
import FBCrawler from './Crawler/FBCrawler';
import roles, { MEMBER } from './roles';
const { searchInitiative } = require('./../services/search');
const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const Member = mongoose.model('member');
const University = mongoose.model('universities');
const to = require('./../utils/to');
const initiativeExist = initiativeShortUrl =>
  mongoose.model('initiatives').findOne({
    shortUrl: initiativeShortUrl,
  });

const shortenInitiativeProfile = async singleInitiative => {
  const { image, name, description, shortUrl, color, modules } = singleInitiative;

  const [err, university] = await to(University.findById(singleInitiative.university));
  if (err) throw new Error("fetch db error");

  return {
    image: image || 'https://screenshotlayer.com/images/assets/placeholder.png',
    name,
    description,
    color,
    profileCompleted: modules.length >= 3,
    shortUrl,
    university,
  };
};

export const getShortInitiativeProfile = async (page, count, query) => {
  const ITEMS_PER_PAGE = 10;
  if (query) {
    return await to(searchInitiative(query));
  }

  const [err, initiatives] = await to(Initiative.find({}).skip(page * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE));
  if (err) throw new Error("");

  const parsedInitiatives = initiatives.map((singleInitiative) => shortenInitiativeProfile(mapRAWInitiativeObjectToViewReady(singleInitiative)))

  return Promise.all(parsedInitiatives);
};

// logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url
class FetchInitiative {

  deleteInitiative = initId => this.Initiative.findByIdAndDelete(initId);

  setInitiative = initiative =>
    initiativeExist(initiative.shortUrl).then(foundInitiative => (foundInitiative)
      ? Promise.resolve(foundInitiative)
      : new Initiative(initiative).save());

  getSingleInitiative = shortUrl =>
    new Promise((resolve, reject) => {
      Initiative.findOne({ shortUrl }, (err, initiative) => {
        if (initiative === null) {
          reject('NOT_FOUND');
        } else {
          const profile = { ...initiative.toObject(), profileCompleted: true };
          resolve(mapRAWInitiativeObjectToViewReady(profile));
        }
      });
    });

  addInitiativeModule = (initiativeId, module) => {
    console.log(initiativeId);
    console.log(module);
    module._id = new mongoose.mongo.ObjectId();

    return Initiative.findByIdAndUpdate(initiativeId, {
      $addToSet: {
        modules: module,
      },
    });
  };

  getAllModules = initiativeId => Initiative.findById(initiativeId).then(result => result.modules);

  updateModule = (module, initiativeId, moduleId) =>
    new Promise((resolve, reject) => {
      Initiative.findById(initiativeId, (err, initiative) => {
        let newModule;

        const updatedModules = initiative.modules.map((item) => {
          if (String(item._id) === String(moduleId)) {
            newModule = { ...module, _id: new mongoose.mongo.ObjectId() };
            return newModule;
          }
          return item;
        });

        Initiative.findByIdAndUpdate(
          initiativeId,
          {
            $set: {
              modules: updatedModules,
            },
          },
          (error) => {
            if (error) {
              reject(error);
            } else {
              resolve(newModule);
            }
          },
        );
      });
    });

  deleteModule = (initiativeId, moduleId) =>
    Initiative.findByIdAndUpdate(initiativeId, {
      $pull: {
        modules: {
          _id: new mongoose.mongo.ObjectId(moduleId),
        },
      },
    });

  reorderModules = (initId, modules) => Initiative.findByIdAndUpdate(initId, {
    $set: { modules },
  })

  getFBProfile = shortUrl =>
    new FBCrawler().addPage(`https://www.facebook.com/pg/${shortUrl}/about/?ref=page_internal`).scrape();

  setFBProfile = (shortUrl, profile) => Initiative.findOneAndUpdate({ shortUrl }, { $set: { FBProfile: profile } });

  assignInitiative = async (userId, initiativeId) => {

    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        initiatives: initiativeId,
      },
    });

    const initiative = await Initiative.findById(initiativeId);

    return await Initiative.findByIdAndUpdate(initiativeId, {
      $addToSet: {
        members: new Member(roles(userId, MEMBER, initiative))
      }
    })
  }
}

export const mapRAWInitiativeObjectToViewReady = (RAWInitiative) => {
  if (!RAWInitiative.image && RAWInitiative.FBProfile?.logo) {
    RAWInitiative.image = RAWInitiative.FBProfile.logo;
  }

  RAWInitiative.facebookUrl = `https://www.facebook.com/${RAWInitiative.facebookUrl}`;
  return RAWInitiative;
}

export const changeBasicInitiativeData = (basic, initiativeId) => {
  return mongoose.model('initiatives').findByIdAndUpdate(initiativeId, {
    $set: {
      ...basic,
    },
  });
};

export const restoreInitiative = () => {

}

export default new FetchInitiative();
