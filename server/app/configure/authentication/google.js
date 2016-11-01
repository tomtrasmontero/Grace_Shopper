'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (token, refreshToken, profile, done) {
      var info = {
        firstName: profile.displayName.split(" ")[0] || null,
        // google may not provide an email, if so we'll just fake it
        email: profile.emails ? profile.emails[0].value : [profile.username , 'example.com'].join('@'),
        avatar: profile.photos ? profile.photos[0].value : undefined
      };
      User.findOrCreate({
        where: {google_id: profile.id},
        defaults: info
      })
      .spread(function (user) {
        done(null, user);
      })
      .catch(done);
    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
