var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    flash          = require("connect-flash"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override");
    seedDB         = require("./seeds"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user");

//Requiring routes
var indexRoutes      = require("./routes/index"), 
    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

/***** CONFIGURATION *****/
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://jzanewich:Tomato42!@ds011449.mlab.com:11449/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

/* Passport Authentification Configuration */
app.use(require("express-session")({
  secret: "Huskies are super cute!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success     = req.flash("success");
  res.locals.error       = req.flash("error");
  
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server is listening...");
});