import DBConnector from './DBConnector';

export default (req, res, next) => {
  const _DBConnector = new DBConnector({ user: req.user });

  req.instudy = {
    DBConnector: _DBConnector,
    user: req.user,
  };

  if (req.user) next();
  else res.sendStatus(401);
};
