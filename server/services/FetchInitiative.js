const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
function FetchInitiative() {

}
//logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url
FetchInitiative.prototype.getInitiative = function(page) {
  if(page) {
    return Initiative.find({})
      .skip(page * 10)
      .limit(10);
  } else {
    return Initiative.find({});
  }

};

FetchInitiative.prototype.getShortInitiativeProfile = function(page) {
  return this.getInitiative(page)
    .then(initiatives => initiatives.map(singleInitiative => shortenInitiativeProfile(singleInitiative)))
};

function shortenInitiativeProfile(singleInitiative) {
  const { image, name, description, shortUrl} = singleInitiative;
  return {
    image,
    name,
    description,
    profileCompleted: true,
    shortUrl,
    university: {
      name: 'Uniwersytet Ekonomiczny',
      id: '1',
      image: '/url',
    },
  };
}

module.exports = FetchInitiative;
