/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojrouter'],
 function(oj, ko, $) {
   var router = oj.Router.rootInstance;

    function AddingDetailsModel() {
      var self = this;
     self.firstName = ko.observable();
     self.lastName = ko.observable();
     self.email = ko.observable()
     self.address = ko.observable()
     self.savedBook = ko.observable()
     self.message = ko.observable("")


     self.borrowBook = function(){
      var currentfstName = self.firstName();
      var currentlstName = self.lastName();
      var currentemail = self.email();
      var currentaddres = self.address();
  console.log("------------------");
      $.ajax({
   url:"https://immense-refuge-39063.herokuapp.com/api/booklist/borrow/" + self.savedBook() ,
   type: 'POST',
   dataType: 'json',
   success: function(bookTaken) {
   self.message("You have borrowed your book successfully")
   }

 })

}

      //  self.books(mappedTasks);
    //  });

      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.
      $(function() {
           oj.Router.sync().then(function() {
              // Retrieve and set the sort order on the table
              var savedBook = router.retrieve();
              if (savedBook) {

                 self.savedBook(savedBook);
              }

              // ko.applyBindings(viewModel)
                //  document.getElementById('routing-container'));
           });
         })
      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
  
    return new AddingDetailsModel();


  })
