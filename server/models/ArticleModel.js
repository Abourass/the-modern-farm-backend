const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {type: String},
  content: {type: String},
  author: {type: String},
  number: {type: Number}
});
module.exports = mongoose.model('articles', ArticleSchema);
