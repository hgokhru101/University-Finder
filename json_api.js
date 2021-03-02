var express = require("express");
var app = express();
var path = require("path");
const fetch = require('node-fetch');

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    //Fetch url in json
let url = "http://universities.hipolabs.com/search?country=india";
let settings = { method: "Get" };
fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      console.log(json[0])
      res.json(json)
    });
//end fetch
})

app.listen(port, function() {
    console.log('Node.js listening on port ' + port)
})