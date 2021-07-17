const { render } = require("ejs");
const favicon = require("serve-favicon")
const path = require('path')
const express = require("express");
const app = express();

const port = 3000

app.get("/", (req, res) => {
    render("index.ejs")
});

app.get("/login", (req, res) => {
    render("login.ejs")
});

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.listen(process.env.PORT || port, () =>{
    console.log("Express server listening")
});