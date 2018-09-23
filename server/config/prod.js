module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGODB_URI,
  mongoURIold: process.env.MONGODB_URI_OLD,
  cookieKey: process.env.COOKIE_KEY,
  PORT: process.env.PORT,
  sessionDuration: process.env.SESSION_DURATION,
  cloudinaryConfig: {
    cloud_name: process.env.PHOTO_CLOUD_NAME,
    api_key: process.env.PHOTO_API_KEY,
    api_secret: process.env.PHOTO_API_SECRET,
  },
  MAIL_CONFIG: {
    host: process.env.EMAIL_SMTP,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
};
