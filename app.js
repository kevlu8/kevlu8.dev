const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const cookieParser = require("cookie-parser");

app.set(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

const port = 8080;

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/index.html"));
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

app.get("/ai", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai.html"));
});

app.get("/ai/ML-Tagger", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger.html"));
});

app.get("/ai/ML-Tagger/nature", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/nature.html"));
});

app.get("/ai/ML-Tagger/people", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/people.html"));
});

app.get("/ai/ML-Tagger/food", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/food.html"));
});

app.get("/ai/ML-Tagger/tech", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/tech.html"));
});

app.get("/ai/ML-Tagger/sussy", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/html/ai/ML-Tagger/sussy.html"));
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
