const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnauthenticatedError('You need authorization!');
  if (!authorization.startsWith('Bearer '))
    throw new UnauthenticatedError('Invalid token!');
  const token = authorization.split(' ')[1];

  const { userId, name } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { userId, name };

  if (!req.user) throw new UnauthenticatedError('Invalid token!');
  next();
};

module.exports = authenticationMiddleware;
