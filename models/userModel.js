const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'PasswordConfirm is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
