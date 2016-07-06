var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

//Index Route
router.get("/", function(req, res) {
  res.render("landing");
});

/****** AUTH ROUTING ******/

/* Register Routes */
router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to the YelpCamp community, " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

/* Login Routes */

//Show login Template
router.get("/login", function(req, res) {
  req.flash("success", "Successfully logged in");
  res.render("login");
});

//Login Auth Logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {});

/* Logout Route */

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/campgrounds");
});

module.exports = router;