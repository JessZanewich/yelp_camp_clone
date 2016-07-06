var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
var data = [
  {
    name: "Golden Ears",
    image: "http://farm3.static.flickr.com/2371/2523078005_b64ec00578.jpg",
    description: "A beautiful campground not too far from the hustle and bustle of Greater Vancouver. A great weekend getaway."
  },
  {
    name: "Castle Mountain",
    image: "http://www.canadiannaturephotographer.com/Rockies/castlemountain_winter.jpg",
    description: "This small, intimate campground offers rustic, no-service camping in a beautiful wooded area. Campers can enjoy nearby attractions such as Silverton Falls and Johnston Canyon. Hiking, biking, scenic drives and wildlife viewing are close by."
  },
  {
    name: "Three Sisters",
    image: "https://s3.amazonaws.com/storage.filemobile.com/storage/7234507/15",
    description: "Three Sisters campground is located in Dead Man's Flats. It is a beautiful camping spot with hikes surrounding and many places to swim."
  }
];

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("removed camp");
      //add a few campgrounds
      // data.forEach(function(seed) {
      //   Campground.create(seed, function(err, campground) {
      //     if(err) {
      //       console.log(err);
      //     } else {
      //       console.log("added a campground");
      //       //create a comment
      //       Comment.create(
      //         {
      //           text: "Amazing campground, the water was a perfect temperature and I felt very relaxed.",
      //           author: "Suzy Que"
      //         }, function(err, comment) {
      //           if(err) {
      //             console.log(err);
      //           } else {
      //             campground.comments.push(comment);
      //             campground.save();
      //             console.log("Created new comment");
      //           }
      //         }
      //       );
      //     }
      //   });
      // });
    }
  });
  
}

module.exports = seedDB;

