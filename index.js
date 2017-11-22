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
  next();
})
app.use(express.static('public'));
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

//List of all shoes per brandname.
// app.get('/api/shoes/brand/:brandname', function(req, res) {
//   var brandname = req.params.brandname
//   shiftModel.find({
//     brand: brandname
//   }, function(err, brandShoes) {
//     if (err) {
//       return res.json({
//         status: "error",
//         error: err
//       })
//     } else {
//       res.json({
//         // status: "success",
//         data: brandShoes
//       })
//     }
//   })
//
// });

//List of shoes per given size.
// app.get('/api/shoes/size/:size', function(req, res) {
//   var shoeSize = req.params.size
//   shiftModel.find({
//     size: shoeSize
//   }, function(err, sizeShoe) {
//     if (err) {
//       return res.json({
//         status: "error",
//         error: err
//       });
//     } else {
//       res.json({
//         status: "success",
//         data: sizeShoe
//       })
//     }
//   })
//
// });

//List of shoes given size and brand.
// app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {
//   var brandname = req.params.brandname
//   var size = req.params.size
//   shiftModel.find({
//     brand: brandname,
//     size: size
//   }, function(err, dataFiltering) {
//     console.log(dataFiltering);
//     if (err) {
//       return res.json({
//         status: "error",
//         error: err
//       })
//     } else {
//       res.json({
//         status: "success",
//         data: dataFiltering,
//
//       })
//     }
//   })
//
// });

//Update the stock.
app.post('/api/booklist/borrow/:id', function(req, res) {
  var id = req.params.id;

  bookModel.findOneAndUpdate({
      _id: ObjectId(id)
    }, {
      $inc: {
        "avaliable_Books": -1
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
  var avaliable_Books = req.body.avaliable_Books;



  // bookModel.findOneAndUpdate({
  //     brand: brand,
  //     color: color,
  //     price: price,
  //     size: size
  //   }, {
  //     $inc: {
  //       in_stock: in_stock
  //     }
  //   },
    //function(err, shoeResults) {
    //  if (err) {
      //  return err;
      //}
       //else if (!shoeResults) {
        bookModel.create({
            image: image,
            title: title,
            author: author,
            description: description,
            avaliable_Books: avaliable_Books

          },
          function(err, bookData) {
            if (err) {
              return err;
            }
            res.json({
              bookData
            })

          });
      //}
    })


// app.get('/api/size', function(req, res) {
//   shiftModel.find({}, function(err, sizeDropdown) {
//     var sizeArray = [];
//     var sizeObject = {};
//     for (var i = 0; i < sizeDropdown.length; i++) {
//       var sizeLoop = sizeDropdown[i];
//       if (sizeObject[sizeLoop.size] === undefined) {
//         sizeObject[sizeLoop.size] = sizeLoop.size;
//         sizeArray.push(sizeLoop.size);
//       }
//     }
//     if (err) {
//       return (err)
//     }
//     res.json({
//       sizeArray
//     })
//   })
//
// });

// app.get('/api/brand', function(req, res) {
//   shiftModel.find({}, function(err, brandDropdown) {
//     var brandArray = [];
//     var brandObject = {};
//     for (var i = 0; i < brandDropdown.length; i++) {
//       var brandLoop = brandDropdown[i];
//       if (brandObject[brandLoop.brand] === undefined) {
//         brandObject[brandLoop.brand] = brandLoop.brand;
//         brandArray.push(brandLoop.brand);
//       }
//     }
//     if (err) {
//       return (err)
//     }
//     res.json({
//       brandArray
//     })
//   })
//
// });

var port = process.env.PORT || 5000
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
