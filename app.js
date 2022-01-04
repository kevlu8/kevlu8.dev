const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const fs = require("fs");
const readline = require("readline");

app.set(express.static("public"));

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

app.post("/api/reddit/nature", (req, res) => {
	if (cachedImgs.length == 0 || cachedImgs[0] != "nature") {
		cachedImgs = [];
		cachedImgs.push("nature");
		reddit.getSubreddit("itookapicture").getTop({
			time: "week",
			limit: 100
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
			}
			let random = Math.floor(Math.random() * submissions.length);
			let submission = submissions[random];
			let url = submission.url;
			let title = submission.title;
			res.send(url)
		});
	}
});

app.post("/api/reddit/food", (req, res) => {
	if (cachedImgs.length == 0 || cachedImgs[0] != "food") {
		cachedImgs = [];
		cachedImgs.push("food");
		reddit.getSubreddit("food").getTop({
			time: "week",
			limit: 100
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
			}
			let random = Math.floor(Math.random() * submissions.length);
			let submission = submissions[random];
			let url = submission.url;
			let title = submission.title;
			res.send(url)
		});
	}
});

app.post("/api/reddit/tech", (req, res) => {
	if (cachedImgs.length == 0 || cachedImgs[0] != "tech") {
		cachedImgs = [];
		cachedImgs.push("tech");
		reddit.getSubreddit("technology").getTop({
			time: "week",
			limit: 100
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
			}
			let random = Math.floor(Math.random() * submissions.length);
			let submission = submissions[random];
			let url = submission.url;
			let title = submission.title;
			res.send(url)
		});
	}
});

app.post("/api/reddit/sussy", (req, res) => {
	if (cachedImgs.length == 0 || cachedImgs[0] != "hentai") {
		cachedImgs = [];
		cachedImgs.push("hentai");
		reddit.getSubreddit("hentai").getTop({
			time: "week",
			limit: 100
		}).then(submissions => {
			for (let i = 0; i < submissions.length; i++) {
				cachedImgs.push(submissions[i].url);
			}
			let random = Math.floor(Math.random() * submissions.length);
			let submission = submissions[random];
			let url = submission.url;
			let title = submission.title;
			res.send(url)
		});
	}
});

app.post("/api/aistorage/tag", (req, res) => {
	// Store the image and the tags in the database
});

app.post("/api/aistorage/rate", (req, res) => {
	// Store the image and the rating in the database
});

app.get('/css/main.css', (req, res) => {
	res.sendFile(path.join(__dirname, "/public/css/main.css"));
});

app.get('/kevlu8.jpg', (req, res) => {
	res.sendFile(path.join(__dirname, "/kevlu8.jpg"));
});

app.get('*', (req, res) => {
	res.status(404).send("404 Not Found!");
});

app.listen(process.env.PORT || port, () => {
	console.log(`Listening on port ${port} or port ${process.env.PORT}. Go to http://localhost:${port} to get to the app.`);
});
