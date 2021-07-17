const favicon = require("serve-favicon");
const path = require('path');
const express = require("express");
const app = express();

const port = 80

app.get("/", (req, res) => {
    res.send("testando")
});

app.get("/login", (req, res) => {
    res.render("login.ejs")
});

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.listen(process.env.PORT || port, () =>{
    console.log("Express server listening")
});