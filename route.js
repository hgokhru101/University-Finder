var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
// app.use("/", function (req, res, next) {
//   console.log(req.url);
//   next();
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/home", function (req, res) {
  console.log(JSON.stringify(req.query));
  console.log(req.query.Username);
  res.cookie("name", req.query.Username);
  console.log("Cookies: ", req.cookies);
  res.sendFile(path.join(__dirname, "public", "home.html"));
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
  res.status(404).send("FORBIDDEN 404. NOT FOUND");
});

app.listen(9000, () => {
  console.log("Running");
});
