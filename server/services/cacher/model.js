module.exports = {
  api: {
    initiative: {
      initiativeId: {
        type: 'params',
        module: {
          post: {
            type: 'additive',
            alias: 'addNewInitiative',
            expired: 'day',
          },
          put: 'change',
        },
      },
    },
  },
};
