var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require("path");
var multer = require("multer");
fs = require("fs-extra");
app.use(bodyParser.urlencoded({ extended: true }));
 
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const myurl = "mongodb://localhost:27017";
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });
//MongoDB Connection
 
MongoClient.connect(myurl, (err, client) => {
  if (err) return console.log(err);
  db = client.db("test");
});
 
//Uploading multiple files
app.get('/',function(req,res){
  res.sendFile(__dirname + '/upload.html');

});

app.post("/uploadphoto", upload.single("myImage"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database
  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64"),
  };
  db.collection("images").insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});
app.get("/photos", (req, res) => {
  db.collection("images")
    .find()
    .toArray((err, result) => {
      const imgArray = result.map((element) => element._id);
      console.log(imgArray);
      if (err) return console.log(err);
      res.send(imgArray);
    });
});
 
app.get("/photos/:id", (req, res) => {
  var filename = req.params.id;
  console.log(filename);
  db.collection("images").findOne(ObjectId(filename), (err, result) => {
    if (err) return console.log(err);
    res.contentType("image/jpeg"); //  res.send(result.image.buffer)
    fs.writeFileSync("new-path.jpg", result.image.buffer);
    res.sendFile(path.join(__dirname, "new-path.jpg"));
  });
});
app.listen(9000, () => {
  console.log("Running");
});

