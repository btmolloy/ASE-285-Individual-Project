const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  salt: String

});

const User = mongoose.model('User', userSchema);

module.exports = { User };
