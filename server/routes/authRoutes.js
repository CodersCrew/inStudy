import passport from 'passport';
import mongoose from 'mongoose';
import { mapUserToView } from './../services/fetchUser';
import { mapRAWInitiativeObjectToViewReady } from './../services/FetchInitiative'

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/student/profil');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    const Initiative = mongoose.model('initiatives');

    const mapUser = mapUserToView(req.user);
    Initiative.find({
      _id: {
        $in: mapUser?.initiatives?.map(initiative => new mongoose.mongo.ObjectId(initiative)),
      },
    })
      .then(initiatives => {
        if (initiatives.length) res.json({ ...mapUser, initiatives: initiatives.map(initiative => mapRAWInitiativeObjectToViewReady(initiative)) });
        else res.json(mapUser);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(404);
      });
  });
};
