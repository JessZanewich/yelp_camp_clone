var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Comment    = require("../models/comment"),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

//Create a new comment
router.post("/", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          req.flash("error", "Smething went wrong.");
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          
          //save comment
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Successfully added a comment");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//EDIT Comment Route
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
  
});

//UPDATE Comment Route
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });  
});

//DESTROY Comment Route
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment was deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });

});

module.exports = router;