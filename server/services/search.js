const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');

module.exports.searchInitiative = async (query) => {
  const initiatives = await Initiative.find(
    {
      $text: {
        $search: query,
      },
    },
    {
      score: {
        $meta: 'textScore',
      },
    },
    {
      sort: {
        score: {
          $meta: 'textScore',
        },
      },
    }
  ).lean();

  return initiatives;
}
