import { MODIFY_INITIATIVE } from './consts';

export const userLogged = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  else return next();
};

export const permissionGranted = section => (req, res, next) => {
  const { user } = req;

  switch (section) {
    case MODIFY_INITIATIVE: {
      const userInitiatives = user.initiatives;
      const initiativeId = req.params.initId;
      if (userInitiatives.find(singleInitiative => singleInitiative === initiativeId)) return next();
      else res.sendStatus(403);
    }
    default:
      return res.sendStatus(403);
  }
};
