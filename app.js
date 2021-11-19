const express = require("express");
const app = express();
const path = require("path");
const snoowrap = require("snoowrap");
const fs = require("fs");
const readline = require("readline");

app.set("view engine", "ejs");
app.set(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function readLine() {
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('secrets.txt')
	});
	lineReader.on('line', function (line) {
	  console.log(line);
	});
}

readLine();

//secrets.txt - username, pwd, client id, client secret
/*
let UN = readLineNum(1);
let PWD = readLineNum(2);
let CI = readLineNum(3);
let CS = readLineNum(4);*/

/*const reddit = new snoowrap({
	userAgent: "A script for my personal website in the making, kevlu8.dev",
	clientId: 'qRKNnNLdrGgidA_0bUE9gg',
	clientSecret: 'y5jiwQCmFAoRJIkVt2N0i5HkwsClwA',
	username: 'DiscordCopyPastaBot',
	password: 'gameknight999'
});*/

//console.log(UN);

const port = 8080;

app.get('/', function(req, res) {
    res.render(path.join(__dirname + "/views/index.ejs"));
});

let username = "cum";

app.post('/vips', function(req, res) {
	if (req.jizz == username) {
		res.send("welcome to cum :smirk:");
	}
});

app.get('*', function(req, res){
  res.status(404).send("404 Not Found!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}. Go to http://localhost:${port} to get to the app.`);
});