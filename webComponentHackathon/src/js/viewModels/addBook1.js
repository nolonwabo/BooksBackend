define(['ojs/ojcore', 'knockout', 'jquery', 'ais', 'ds', 'jet-composites/filter-table/loader', 'jet-composites/overview-card/loader','jet-composites/book-comp/loader'],
  function (oj, ko, $, ais, ds) {


// <<<<<<< HEAD
//   // return showAllBooksViewModel();
//     function DashboardViewModel() {
//       var self = this;
//       // check ds is initialized
//       self.itemsArray = ko.observable([]);
//       // for web component pattern
//       // data service delivers for filter-table component --- data prop requirements
//
//       self.itemData = ds.getItemsStatic();
//       ds.init().then(function (data){
//         console.log(data)
//         // for JQUERY injection pattern - below in hamdleAttached method
// })
// }
//
// });
// =======
          function Task(data) {
                  this.image = ko.observable(data.image);
            this.title = ko.observable(data.title);
            this.author = ko.observable(data.author);
            this.description = ko.observable(data.description);
            this.available_Books = ko.observable(data.available_Books);
          }

          //return new DashboardViewModel();
          function BookModel() {
            var self = this;

            $.getJSON("https://immense-refuge-39063.herokuapp.com/api/booklist", function(allData) {
              console.log(allData);
              var mappedTasks = $.map(allData, function(item) {
                return new Task(item)
              });
              self.books(mappedTasks);
            });

            self.books = ko.observableArray([]);

          }

          return new BookModel();

        });
