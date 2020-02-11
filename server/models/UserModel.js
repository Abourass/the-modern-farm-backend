const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  displayName: String,
});
module.exports = mongoose.model('users', UserSchema);
