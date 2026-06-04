const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /^https?:\/\/(www\.)?[\w\-.~:/?%#\[\]@!$&'()*+,;=]+/.test(value);
      },
      message: 'URL invalida'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});

module.exports = mongoose.model('card', CardSchema);