const KEYS = {
  development: {
    googleClientID: '491102740351-oej9c2qnj1mhj3qaceuhigkopisd19f5.apps.googleusercontent.com',
    googleClientSecret: '90R8W5D2N5zOVcnmEbeSx6x2',
    mongoURI: 'mongodb://ds231941.mlab.com:31941/instudy-dev',
    mongoLogin: 'admin',
    mongoPassword: 'admin123',
    cookieKey: 'hjgHJTYUGF65Rhfyruy675RJYHF785R5hftFGgr',
    PORT: 5000,
    sessionDuration: 30 * 24 * 60 * 60 * 1000,
  },
  production: {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    PORT: process.env.PORT,
    sessionDuration: process.env.SESSION_DURATION
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = KEYS.production;
} else {
  module.exports = KEYS.development;
}
