module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  mongoLogin: process.env.MONGO_LOGIN,
  mongoPassword: process.env.MONGO_PASSWORD,
  cookieKey: process.env.COOKIE_KEY,
  PORT: process.env.PORT,
  sessionDuration: process.env.SESSION_DURATION,
  file_cloud: {
    cloud_name: process.env.PHOTO_CLOUD_NAME,
    api_key: process.env.PHOTO_API_KEY,
    api_secret: process.env.PHOTO_API_SECRET,
  },
};
