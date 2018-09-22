import mongoose from 'mongoose';
import FBCrawler from './Crawler/FBCrawler';

const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const initiativeExist = initiativeShortUrl =>
  mongoose.model('initiatives').findOne({
    shortUrl: initiativeShortUrl,
  });

const shortenInitiativeProfile = singleInitiative => {
  const { image, name, description, shortUrl } = singleInitiative;
  return {
    image: singleInitiative.FBProfile[0]?.content?.logo,
    name,
    description,
    profileCompleted: true,
    shortUrl,
    university: {
      name: 'Uniwersytet Ekonomiczny',
      id: '1',
      image: '/img/universities/5a90aac95ded6d5a4a06195d.png',
    },
  };
};

//logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url
class FetchInitiative {
  constructor() {
    // Initiative = mongoose.model('initiatives');
  }

  getInitiative = page => {
    if (page) {
      return Initiative.find({})
        .skip(page * 10)
        .limit(10);
    } else {
      return Initiative.find({});
    }
  };

  deleteInitiative = initId => this.Initiative.findByIdAndDelete(initId);

  getShortInitiativeProfile = page =>
    this.getInitiative(page).then(initiatives =>
      initiatives.map(singleInitiative => shortenInitiativeProfile(mapRAWInitiativeObjectToViewReady(singleInitiative))))
      .then(e => {
        console.log(e)
        return e
      })

  setInitiative = initiative =>
    initiativeExist(initiative.shortUrl).then(foundInitiative => {
      if (foundInitiative) {
        return Promise.resolve(foundInitiative);
      } else {
        return new Initiative(initiative).save();
      }
    });

  // getSingleInitiative = shortUrl => {
  //   return Initiative.findOne({ shortUrl })
  //     .then(singleInitiative => ({ ...singleInitiative.toObject(), profileCompleted: true }))
  //     .then(profile => mapRAWInitiativeObjectToViewReady(profile));
  // };
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

  getAllModules = initiativeId => {
    return Initiative.findById(initiativeId).then(result => result.modules);
  };

  updateModule = (module, initiativeId, moduleId) =>
    new Promise((resolve, reject) => {
      Initiative.findById(initiativeId, (err, initiative) => {
        let newModule;

        const updatedModules = initiative.modules.map(item => {
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
          err => {
            if (err) {
              reject(err);
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

  getFBProfile = shortUrl =>
    new FBCrawler().addPage(`https://www.facebook.com/pg/${shortUrl}/about/?ref=page_internal`).scrape();

  setFBProfile = (shortUrl, profile) => {
    return Initiative.findOneAndUpdate({ shortUrl }, { $set: { FBProfile: profile } });
  };

  assignInitiative = (userId, initiativeId) => {
    return User.findByIdAndUpdate(userId, {
      $addToSet: {
        initiatives: initiativeId,
      }
    })
  }
}

function mapRAWInitiativeObjectToViewReady(RAWInitiative) {
  if (RAWInitiative) {
    const AboutPage = RAWInitiative.FBProfile.find(page => page.content && page.content.kind === 'About');

    if (!RAWInitiative.image && AboutPage && AboutPage.content && AboutPage.content.logo) {
      RAWInitiative.image = AboutPage.content.logo;
    }
  }
  return RAWInitiative;
}

export const changeBasicInitiativeData = (basic, initiativeId) => {
  return mongoose.model('initiatives').findByIdAndUpdate(initiativeId, {
    $set: {
      ...basic,
    },
  });
};

export default FetchInitiative;
