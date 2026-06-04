const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Email invalido'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(value) {
        return /^https?:\/\/(www\.)?[\w\-.~:/?%#\[\]@!$&'()*+,;=]+/.test(value);
      },
      message: 'URL invalida'
    }
  }
});

module.exports = mongoose.model('user', UserSchema);