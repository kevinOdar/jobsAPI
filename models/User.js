const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please, provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please, provide a name'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please, provide a valid password'],
    minlength: 6,
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'Please, confirm the password'],
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = async function () {
  const token = jwt.sign(
    {
      userId: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

const UserModel = model('User', UserSchema);

module.exports = UserModel;
