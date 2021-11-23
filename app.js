const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const snoowrap = require("snoowrap");
const fs = require("fs");
const readline = require("readline");
const passwordGenerator = require("./passwordGenerator");
const cookieParser = require("cookie-parser");

app.set(express.static("public"));
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

const port = 8080;

let secret = [];
let isLoggedIn = false;

fs.readFile("secrets.txt", "utf8", function(err, data) {
	if (err) console.log(err);
	
	const splitData = data.split("\r\n");

	for (let i = 0; i < splitData.length; i++) {
		secret.push(splitData[i]);
	}

	let UN = secret[0];
	let PWD = secret[1];
	let CI = secret[2];
	let CS = secret[3];

	const reddit = new snoowrap({
		userAgent: "A script for my personal website in the making, kevlu8.dev",
		clientId: `${CI}`,
		clientSecret: `${CS}`,
		username: `${UN}`,
		password: `${PWD}`
	});
});

app.get('/', function(req, res) {
	if (req.cookies.loggedIn) {
		console.log("found cookie loggedIn");
		isLoggedIn = true;
		res.sendFile(path.join(__dirname, "/public/html/index.html"));
	} else if (req.cookies.friendsOnly) {
		res.sendFile(path.join(__dirname, "/public/html/index.html"));
	} else {
		console.log("no cookie found");
		res.redirect("/login");
	}
});

app.get('/login', function(req, res) {
	if (req.cookies.loggedIn) {
		isLoggedIn = true;
		res.redirect("/");
	} else {
		res.sendFile(path.join(__dirname, "/public/html/login.html"));
	}
});

app.post('/login', function(req, res) {
	const json = fs.readFileSync("./passwords.json");
	const config = JSON.parse(json);

	if (req.body.password == config.passwords.mainPwd) {
		res.cookie("loggedIn", "true", { maxAge: 694200000, httpOnly: false });
		res.redirect("/");
	} else if (req.body.password == config.passwords.friendsOnly) {
		res.cookie("loggedIn", "true", { maxAge: 694200000, httpOnly: false });
		res.cookie("friendsOnly", "true", { maxAge: 694200000, httpOnly: false });
		res.redirect("/");
	} else {
		res.redirect("/login");
	}
});

app.get("/logout", function(req, res) {
	res.clearCookie("loggedIn");
	res.clearCookie("friendsOnly");
	res.redirect('/');
});

app.get("/contact", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/contact.html"));
});

app.get("/about", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/about.html"));
});

app.get("/quotes", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/quotes.html"));
});

app.get("/friendsonly", function(req, res) {
	if (req.cookies.friendsOnly) {
		console.log("found cookie friendsOnly");
		res.sendFile(path.join(__dirname, "/public/html/friendsOnly.html"));
	} else {
		res.redirect("/404");
	}
});

app.get('/css/main.css', function(req, res) {
	res.sendFile(path.join(__dirname, "/public/css/main.css"));
});

app.get('/kevlu8.jpg', function(req, res) {
	res.sendFile(path.join(__dirname, "/kevlu8.jpg"));
});

app.get('*', function(req, res){
	res.status(404).send("404 Not Found!");
});

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port} or port ${process.env.PORT}. Go to http://localhost:${port} to get to the app.`);
});
