const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
const FBCrawler = require('./Crawler/FBCrawler');

function FetchInitiative() {}
//logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url
FetchInitiative.prototype.getInitiative = function(page) {
  if (page) {
    return Initiative.find({})
      .skip(page * 10)
      .limit(10);
  } else {
    return Initiative.find({});
  }
};

FetchInitiative.prototype.getShortInitiativeProfile = function(page) {
  return this.getInitiative(page).then(initiatives =>
    initiatives.map(singleInitiative => shortenInitiativeProfile(singleInitiative)),
  );
};

FetchInitiative.prototype.setInitiative = function(initiative) {
  return initiativeExist(initiative.shortUrl).then(foundInitiative => {
    if (foundInitiative) {
      return Promise.resolve(foundInitiative);
    } else {
      return new Initiative(initiative).save();
    }
  });
};

FetchInitiative.prototype.getSingleInitiative = function(shortUrl) {
  return Initiative.findOne({
    shortUrl,
  }).then(singleInitiative => {
    return { ...singleInitiative.toObject(), profileCompleted: true };
  });
};

FetchInitiative.prototype.addInitiativeModule = function(initiativeId, module) {
  module._id = new mongoose.mongo.ObjectId();

  return Initiative.findByIdAndUpdate(initiativeId, {
    $addToSet: {
      modules: module,
    },
  });
};

FetchInitiative.prototype.getAllModules = function(initiativeId) {
  return Initiative.findById(initiativeId).then(result => {
    return Promise.resolve(result.modules);
  });
};

FetchInitiative.prototype.deleteModule = function(initiativeId, moduleId) {
  return Initiative.findByIdAndUpdate(initiativeId, {
    $pull: {
      modules: {
        _id: new mongoose.mongo.ObjectId(moduleId),
      },
    },
  });
};

FetchInitiative.prototype.getFBProfile = function(shortUrl) {
  return new FBCrawler()
    .addPage(`https://www.facebook.com/pg/${shortUrl}/about/?ref=page_internal`)
    .scrape();
};

FetchInitiative.prototype.setFBProfile = function(shortUrl, profile) {
  return Initiative.findOneAndUpdate(
    {
      shortUrl,
    },
    {
      $set: {
        FBProfile: profile,
      },
    },
  );
};

function initiativeExist(initiativeShortUrl) {
  return Initiative.findOne({
    shortUrl: initiativeShortUrl,
  });
}

function shortenInitiativeProfile(singleInitiative) {
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
}

module.exports = FetchInitiative;
