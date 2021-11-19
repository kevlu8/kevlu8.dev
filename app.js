const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get('/', function(req, res) {
    res.render(path.join(__dirname + "/views/index.ejs"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}. Go to http://localhost:${port} to get to the app.`);
});