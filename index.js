"use strict";
var express = require('express');
var app = express();
var bookModel = require('./model');
var ObjectId = require("mongodb").ObjectId;
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
  if(req.method === "OPTIONS"){
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
  }
  next();
})
app.use(express.static('webComponentHackathon/web'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//List of all books.
app.get('/api/booklist', function(req, res) {
  bookModel.find({}, function(err, allBooks) {
    if (err) {
      return res.json({
        status: "error",
        error: err
      });
    } else {
      res.json({
        status: "success",
        data: allBooks
      });
    }
  })

});



app.get('/api/booklist/authour/:author', function(req, res) {
  var authorName = req.params.author;
  console.log(authorName);
  bookModel.find({
    author: authorName
  }, function(err, authorNames) {
    if (err) {
      return res.json({
        status: "error",
        error: err
      });
    } else {
      res.json({
        status: "success",
        authorNames: authorNames
      })
    }
  })

});

app.post('/api/booklist/borrow/:id', function(req, res) {
  var id = req.params.id;

  bookModel.findOneAndUpdate({
      _id: ObjectId(id)
    }, {
      $inc: {
        "available_Books": -1
      }
    },

    {
      upsert: false,
      new: true
    },

    function(err, updatedBookInfo) {
      if (err) {
        return res.json({
          status: "error",
          error: err,
          data: []
        });
      }
//       if (updatedBookInfo.avaliable_Books <= 0) {
// updatedBookInfo.remove()
        res.json({
          status: "success",
          data: updatedBookInfo
        })
      // }

    })
})
//Add new shoe.
app.post('/api/booklist', function(req, res) {
  var image = req.body.image;
  var title = req.body.title;
  var author = req.body.author;
  var description = req.body.description;
  var available_Books = req.body.available_Books;



        bookModel.create({
            image: image,
            title: title,
            author: author,
            description: description,
            available_Books: available_Books

          },
          function(err, bookData) {
            if (err) {
              return err;
            }
            res.json({
              bookData:bookData
            })

          });
      //}
    })


    app.post('/api/return', function(req, res) {

      var title = req.body.title;
      var author = req.body.author;
      //var description = req.body.description;
      var available_Books = req.body.available_Books;

      bookModel.findOneAndUpdate({
          title: title,
          author: author,


        }, {
          $inc: {
            available_Books: available_Books
          }
        },
              function(err, bookData) {
                if (err) {
                  return err;
                }
                res.json({
                  bookData
                })

              });
          });


var port = process.env.PORT || 5000
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
