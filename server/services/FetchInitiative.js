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
    image,
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
    // this.Initiative = mongoose.model('initiatives');
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

  getShortInitiativeProfile = page => {
    return this.getInitiative(page).then(initiatives =>
      initiatives.map(singleInitiative => shortenInitiativeProfile(singleInitiative)),
    );
  };

  setInitiative = initiative => {
    return initiativeExist(initiative.shortUrl).then(foundInitiative => {
      if (foundInitiative) {
        return Promise.resolve(foundInitiative);
      } else {
        return new Initiative(initiative).save();
      }
    });
  };

  getSingleInitiative = shortUrl => {
    return Initiative.findOne({ shortUrl })
      .then(singleInitiative => ({ ...singleInitiative.toObject(), profileCompleted: true }))
      .then(profile => mapRAWInitiativeObjectToViewReady(profile))
      .then(singleInitiative => ({ ...singleInitiative.toObject(), profileCompleted: true }))
      .then(profile => mapRAWInitiativeObjectToViewReady(profile));
  };

  addInitiativeModule = (initiativeId, module) => {
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

  deleteModule(initiativeId, moduleId) {
    return Initiative.findByIdAndUpdate(initiativeId, {
      $pull: {
        modules: {
          _id: new mongoose.mongo.ObjectId(moduleId),
        },
      },
    });
  }

  getFBProfile = shortUrl => {
    return new FBCrawler().addPage(`https://www.facebook.com/pg/${shortUrl}/about/?ref=page_internal`).scrape();
  };

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
  const AboutPage = RAWInitiative.FBProfile.find(page => page.content && page.content.kind === 'About');

  if (AboutPage && AboutPage.content && AboutPage.content.logo) {
    RAWInitiative.image = AboutPage.content.logo;
  }

  return RAWInitiative;
}

export default FetchInitiative;
