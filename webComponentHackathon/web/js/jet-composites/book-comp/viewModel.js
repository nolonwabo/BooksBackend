/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery','ojs/ojrouter'], function (oj, ko, $) {
    'use strict';



    function Task(data) {
      return {
        image : ko.observable(data.image),
        title :  ko.observable(data.title),
        author : ko.observable(data.author),
        description : ko.observable(data.description),
        available_Books : ko.observable(data.available_Books),
        index: data._id
      }
    }




    function BookModel() {

      var self = this;
      var router = oj.Router.rootInstance;
      self.clickHandler = function(evt,ui){
        console.log(evt.index);
        router.store(evt.index);
        router.go('about');
      }

      self.books = ko.observableArray([]);



      $.getJSON("https://immense-refuge-39063.herokuapp.com/api/booklist", function(allData) {
              console.log("ppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");

        var mappedTasks = $.map(allData.data, function(item) {
          return new Task(item)
        });
        self.books(mappedTasks);
      });


    }

    return new BookModel();

    $("#add").click(function(data){
            $.post( "https://immense-refuge-39063.herokuapp.com/api/booklist", function( newBook ) {
                    console.log("+==============================");
                    var mappedBooks = $.map(newBook.data, function(book){
                            return new Task(book)
                    });
                    self.books(mappedBooks)
            });
    })

    });
