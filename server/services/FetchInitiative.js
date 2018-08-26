const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
const FBCrawler = require('./Crawler/FBCrawler');

const initiativeExist = initiativeShortUrl =>
  Initiative.findOne({
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
  getInitiative(page) {
    if (page) {
      return Initiative.find({})
        .skip(page * 10)
        .limit(10);
    } else {
      return Initiative.find({});
    }
  }

  getShortInitiativeProfile(page) {
    return this.getInitiative(page).then(initiatives =>
      initiatives.map(singleInitiative => shortenInitiativeProfile(singleInitiative)),
    );
  }

  setInitiative(initiative) {
    return initiativeExist(initiative.shortUrl).then(foundInitiative => {
      if (foundInitiative) {
        return Promise.resolve(foundInitiative);
      } else {
        return new Initiative(initiative).save();
      }
    });
  }

  getSingleInitiative(shortUrl) {
    return Initiative.findOne({
      shortUrl,
    }).then(singleInitiative => ({ ...singleInitiative.toObject(), profileCompleted: true }));
  }

  addInitiativeModule(initiativeId, module) {
    module._id = new mongoose.mongo.ObjectId();

    return Initiative.findByIdAndUpdate(initiativeId, {
      $addToSet: {
        modules: module,
      },
    });
  }

  getAllModules(initiativeId) {
    return Initiative.findById(initiativeId).then(result => {
      return Promise.resolve(result.modules);
    });
  }

  deleteModule(initiativeId, moduleId) {
    return Initiative.findByIdAndUpdate(initiativeId, {
      $pull: {
        modules: {
          _id: new mongoose.mongo.ObjectId(moduleId),
        },
      },
    });
  }

  getFBProfile(shortUrl) {
    return new FBCrawler()
      .addPage(`https://www.facebook.com/pg/${shortUrl}/about/?ref=page_internal`)
      .scrape();
  }

  setFBProfile(shortUrl, profile) {
    return Initiative.findOneAndUpdate({ shortUrl }, { $set: { FBProfile: profile } });
  }
}

module.exports = FetchInitiative;
