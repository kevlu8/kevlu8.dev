const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const passwordGenerator = require("./passwordGenerator");
const cookieParser = require("cookie-parser");

app.set(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

const port = 8080;

let secret = [];
let isLoggedIn = false;

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

app.get("/vip", function(req, res) {
	if (req.cookies.friendsOnly) {
		console.log("found cookie friendsOnly");
		res.sendFile(path.join(__dirname, "/public/html/VIP.html"));
	} else {
		res.redirect("/404");
	}
});

app.post("/vip", function(req, res) {
	const json = fs.readFileSync("./loginInfo.json");
	const config = JSON.parse(json);
	if (req.body.usr && req.body.pwd) {
		const username = req.body.usr;
		const password = req.body.pwd;

		config.db[username] = password;

		console.log(config);
		res.redirect("/404");
		var stringifed = JSON.stringify(config);
		fs.writeFile("loginInfo.json", stringifed, function(err) {
			if (err) {
				console.log(err);
			}
		});
	} else if (req.body.usr1 && req.body.pwd1) {

	} else {
		res.redirect("/vip");
	}
});

app.get("/secretstuff", function(req, res) {
	if (req.cookies.friendsOnly) {
		console.log("found cookie friendsOnly");
		res.render(path.join(__dirname, "/views/secretstuff.ejs"));
	} else {
		res.redirect("/404");
	}
});

app.post("/secretstuff", function(req, res) {
	const sub = req.body.sub;
	const time = req.body.time;
	const sort = req.body.sort;

	const spawn = require("child_process").spawn;
	const pythonProcess = spawn('python',["/home/kevlu8/kevlu8.dev/getReddit.py", sub, 10000, sort, time]);
	
	pythonProcess.stdout.on('Done', function(Done) {});

	// Loop through lines of text file and put in array
	const stuff = [];
	fs.readFile("stuff.txt", "utf8", function(err, data) {
		if (err) console.log(err);
		
		const splitData = data.split("\r\n");
	
		for (let i = 0; i < splitData.length; i++) {
			stuff.push(splitData[i]);
		}

		const posted = true;

		res.render(path.join(__dirname, "/views/secretstuff.ejs"), {posted: posted, stuff: stuff});
	});
});

app.get('/css/main.css', function(req, res) {
	res.sendFile(path.join(__dirname, "/public/css/main.css"));
});

app.get('/kevlu8.jpg', function(req, res) {
	res.sendFile(path.join(__dirname, "/kevlu8.jpg"));
});

app.get('/404', function(req, res){
	res.status(404).send("404 Not Found!");
});

app.get('*', function(req, res){
	res.redirect("/404");
});

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port} or port ${process.env.PORT}. Go to http://localhost:${port} to get to the app.`);
});
