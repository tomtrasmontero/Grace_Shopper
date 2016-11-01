module.exports = {
  DATABASE_URL: 'postgres://localhost:5432/fsg',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: 'INSERT_FACEBOOK_CLIENTID_HERE',
    clientSecret: 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_FACEBOOK_CALLBACK_HERE'
  },
  GOOGLE: {
    clientID: '704062991503-926nj8h75lmo2aqjg36euametlf5ami7.apps.googleusercontent.com',
    clientSecret: '6KDyrvwih-jXXrmZ8VDRvroH',
    callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
  },
  LOGGING: true,
  NATIVE: true
};
