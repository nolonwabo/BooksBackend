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
thumbs_Up: Number,
thumbs_Down: Number,
comments: String,
avaliable_Books: Number
 });

module.exports = storeBookList;
