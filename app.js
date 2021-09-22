//Requiring dependencies
const https = require('https');
const express = require('express');

const app = express();

//Parses body of html files for data
app.use(express.urlencoded({extended: true}));
//Makes css directory detectable
app.use(express.static("public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.listen(4000, function(req, res){
  console.log("Server running: Port 4000")
})
