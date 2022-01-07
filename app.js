/* ----------------- Requires ----------------- */

const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const bodyParser = require("body-parser");

/* ----------------- Constants ----------------- */

app.set(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const snoowrap = require("snoowrap");

reddit = new snoowrap({
	userAgent: "ML-Tagger bot script for training",
	clientId: `${process.env.CLIENT_ID}`,
	clientSecret: `${process.env.CLIENT_SECRET}`,
	username: `${process.env.USERNAME}`,
	password: `${process.env.PASSWORD}`,
	refreshToken: `${process.env.REFRESH_TOKEN}`
});

const port = 8080;

cachedImgs = [];
cachedTitles = [];

/* ----------------- GETs and POSTs ----------------- */

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/index.html"));
});

app.get("/contact", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/contact.html"));
});

app.get("/about", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/about.html"));
});

app.get("/quotes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/quotes.html"));
});

app.get("/recommendations", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/recommendations.html"));
});

app.get("/personal", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/personal.html"));
});

app.get("/ai", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/ai.html"));
});

app.get("/ai/ML-Tagger", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger.html"));
});

app.get("/ai/ML-Tagger/nature", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/nature.html"));
});

app.get("/ai/ML-Tagger/food", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/food.html"));
});

app.get("/ai/ML-Tagger/tech", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/tech.html"));
});

app.get("/ai/ML-Tagger/sussy", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/sussy.html"));
});

/* ----------------- Below is the code for the API ----------------- */

app.post("/api/reddit/nature", (req, res) => {
	let url = "", title = "";
	if (cachedImgs.length == 0 || cachedImgs[0] != "nature") {
		cachedImgs = [];
		cachedImgs.push("nature");
		cachedTitles = [];
		cachedTitles.push("nature")
		reddit.getSubreddit("itookapicture").getTop({
			time: "week",
			limit: 250
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
				cachedTitles.push(submissions[i].title);
			}
			while (!url.startsWith("https://i.redd.it" || !url.startsWith("https://i.imgur.com"))) {
				let random = Math.floor(Math.random() * submissions.length);
				let submission = submissions[random];
				url = submission.url;
				title = submission.title;
			}
		});
	} else {
		// Images are already cached
		let random = Math.floor(Math.random() * cachedImgs.length);
		url = cachedImgs[random];
		title = cachedTitles[random];
		while (!url.startsWith("https://i.redd.it" || !url.startsWith("https://i.imgur.com"))) {
				console.log(url)
				let random = Math.floor(Math.random() * submissions.length);
				let submission = submissions[random];
				title = submission.title;
				url = submission.url;
		}
		let arr = [url, title];
		res.send(arr);	
	}
});

app.post("/api/reddit/food", (req, res) => {
	let url = "", title = "";
	if (cachedImgs.length == 0 || cachedImgs[0] != "food") {
		cachedImgs = [];
		cachedImgs.push("food");
		cachedTitles = [];
		cachedTitles.push("food")
		reddit.getSubreddit("food").getTop({
			time: "week",
			limit: 250
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
				cachedTitles.push(submissions[i].title);
			}
			while (!url.startsWith("https://i.redd.it" || !url.startsWith("https://i.imgur.com"))) {
				console.log(url)
				let random = Math.floor(Math.random() * submissions.length);
				let submission = submissions[random];
				title = submission.title;
				url = submission.url;
			}
			let arr = [url, title];
			res.send(arr);
		});
	} else {
		// Images are already cached
		let random = Math.floor(Math.random() * cachedImgs.length);
		url = cachedImgs[random];
		title = cachedTitles[random];
		console.log(url); 
		while (!url.startsWith("https://i.redd.it" || !url.startsWith("https://i.imgur.com"))) { 
				let random = Math.floor(Math.random() * cachedImgs.length);
				let submission = cachedImgs[random];
				title = cachedTitles.title;
				url = submission.url;
		}
		if (url.startsWith("https://i.redd.it")) {
			// This is i.redd.it so you'll need to scale the title properly
		} else if (url.startsWith("https://i.imgur.com")) {
			// Imgur
			url.slice(0, -10);
		}
	
		let arr = [url, title];
		res.send(arr);	
	}
});

app.post("/api/reddit/sussy", (req, res) => {
	if (cachedImgs.length == 0 || cachedImgs[0] != "hentai") {
		cachedImgs = [];
		cachedImgs.push("hentai");
		cachedTitles = [];
		cachedTitles.push("hentai")
		reddit.getSubreddit("hentai").getTop({
			time: "week",
			limit: 250
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
				cachedTitles.push(submissions[i].title);
			}
			let url = "", title = "";
			while (!url.startsWith("https://i.redd.it" || !url.startsWith("https://i.imgur.com"))) {
				let random = Math.floor(Math.random() * submissions.length);
				let submission = submissions[random];
				url = submission.url;
				title = submission.title;
			}
			if (url.startsWith("https://i.redd.it")) {
				// This is i.redd.it so you'll need to scale the title properly
			} else if (url.startsWith("https://i.imgur.com")) {
				// Imgur
			}
		});
	} else {
		// Images are already cached
		let random = Math.floor(Math.random() * cachedImgs.length);
		url = cachedImgs[random];
		title = cachedTitles[random];
		while (!url.startsWith("https://i.redd.it" || !url.startsWith("https://i.imgur.com"))) {
				console.log(url)
				let random = Math.floor(Math.random() * submissions.length);
				let submission = submissions[random];
				title = submission.title;
				url = submission.url;
		}
		if (url.startsWith("https://i.redd.it")) {
			// This is i.redd.it so you'll need to scale the title properly
		} else if (url.startsWith("https://i.imgur.com")) {
			// Imgur
			url.slice(0, -10);
		}
	
		let arr = [url, title];
		res.send(arr);	
	}
});

app.post("/api/aistorage/tag", (req, res) => {
	// Store the image and the tags in the database
	console.log(req.body)
	let json = express.json(req.body);
	console.log(json);
	let tags = req.body.tags;
	let img;
	let type;
	try { // Had to use try catch statements instead of if else due to if statements throwing errors if type is undefined
		if (typeof req.body.food !== 'undefined') type = "food";
	} catch {
		try {
			if (typeof req.body.nature !== 'undefined') type = "nature";
		} catch {
			if (typeof req.body.sussy !== 'undefined') type = "sussy";
		}
	}

	let arr = JSON.parse(req.body);

	for (let i = 0; i < arr.length; i++) {
		console.log(arr[i])
		if (arr[i].startsWith("https")) {
			img = arr[i];
		}
	}

	const exec = require("child_process").exec;
	exec(`python3 downloadImage.py -l ${img} -t ${type}`)
});

app.post("/api/aistorage/rate", (req, res) => {
	// Store the image and the rating in the database
});

/* ----------------- Other Files ----------------- */

app.get('/css/main.css', (req, res) => {
	res.sendFile(path.join(__dirname, "/public/css/main.css"));
});

app.get('/css/home.css', (req, res) => {
	res.sendFile(path.join(__dirname, "/public/css/home.css"));
});

app.get('/kevlu8.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, "/kevlu8.jpg"));
});

app.get('*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, "/public/html/404.html"));
});

/* ----------------- Start Server ----------------- */

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${process.env.PORT || port}. Go to http://localhost:${process.env.PORT || port} to get to the app.`);
});
