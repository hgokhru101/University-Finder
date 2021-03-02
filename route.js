var express = require("express");
var app = express();
var path = require("path");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var cookieParser = require("cookie-parser");
const { appsactivity } = require("googleapis/build/src/apis/appsactivity");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

CLIENT_ID = "269636531390-0bnpol77fqq2pfcnalg86uvm6kdjb03q.apps.googleusercontent.com";
CLIENT_SECRET="K9K7Ty2mPNm2AuAIGgWoCbfz";
CALLBACK_URL="http://localhost:9000/authorized";
PORT =9000;
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser( function(id, done) {
  done(null, id);
});
passport.deserializeUser( function(id, done) {
  done(null, id);
});
passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, email, cb) {
    return cb(null, email.id);
  }
));


// app.use("/", function (req, res, next) {
//   console.log(req.url);
//   next();
// });


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/success", (req, res) =>{
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/google/auth",
  passport.authenticate("google", {scope: ["profile", "email"]}));
app.get("/authorized",
  passport.authenticate("google", {failureRedirect: "/"}),
  (req, res) =>{
    res.redirect("/success");
});

var username = "harsh";
var password = "ait";

app.get("/home", function (req, res,next) {
  console.log(JSON.stringify(req.query));
  console.log(req.query.Username);
  res.cookie("Username", req.query.Username);
  res.cookie("Password", req.query.Password);
  console.log("Cookies: ", req.cookies);
  next();
  }, function (req, res, next) {
    if (req.query.Username == username && req.query.Password == password) {
      res.redirect("/success");
    } else {
      res.send("Error");
    }    
});


app.get("/manage_feed", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "manage_feed.html"));
});

app.get("/engg_feed", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "engg_feed.html"));
});

app.get("/artdes_feed", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "artdes_feed.html"));
});

app.get("/medicine_feed", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "medicine_feed.html"));
});

app.get("/law_feed", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "law_feed.html"));
});

app.get("/media_feed", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "media_feed.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(9000, () => {
  console.log("Running");
});
