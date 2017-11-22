var mongoose = require('mongoose');
const MongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/booklist";
console.log(MongoURL);
mongoose.connect(MongoURL, {
  useMongoClient: true
});


var storeBookList = mongoose.model('storeBookList', {
  image: String,
  title: String,
  author: String,
  description: String,
available_Books: Number,
thumbs_Up: Number,
thumbs_Down: Number,
comments: String,
name: String
 });

module.exports = storeBookList;
