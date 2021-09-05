require('express-async-errors');
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = await newUser.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('Please, provide a valid email and password');
  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new UnauthenticatedError('Invalid credentials');
  if (!(await foundUser.comparePassword(password)))
    throw new UnauthenticatedError('Incorrect password');
  const token = await foundUser.createJWT();
  // req.Headers.token = token;
  // if (jwt.verify(foundUser.token, process.env.JWT_SECRET));
  res.status(StatusCodes.OK).json({ user: { name: foundUser.name }, token });
};

module.exports = {
  register,
  login,
};
