import mongoose from 'mongoose';
import FBCrawler from './Crawler/FBCrawler';

const Initiative = mongoose.model('initiatives');
const User = mongoose.model('users');
const initiativeExist = initiativeShortUrl =>
  mongoose.model('initiatives').findOne({
    shortUrl: initiativeShortUrl,
  });

const shortenInitiativeProfile = (singleInitiative) => {
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

const mapRAWInitiativeObjectToViewReady = (RAWInitiative) => {
  if (RAWInitiative) {
    const AboutPage = RAWInitiative.FBProfile.find(page => page.content && page.content.kind === 'About');

    if (AboutPage && AboutPage.content && AboutPage.content.logo) {
      return { ...RAWInitiative, image: AboutPage.content.logo };
    }
  }

  return RAWInitiative;
};

// logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url
class FetchInitiative {
  getInitiative = (page) => {
    if (page) {
      return Initiative.find({})
        .skip(page * 10)
        .limit(10);
    }
    return Initiative.find({});
  };

  deleteInitiative = initId => this.Initiative.findByIdAndDelete(initId);

  getShortInitiativeProfile = page =>
    this.getInitiative(page).then(initiatives =>
      initiatives.map(singleInitiative => shortenInitiativeProfile(singleInitiative)));

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

  assignInitiative = (userId, initiativeId) => User.findByIdAndUpdate(userId, {
    $addToSet: {
      initiatives: initiativeId,
    },
  })
}

export default FetchInitiative;
