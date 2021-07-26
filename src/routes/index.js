const { Router } = require("express");
const router = Router();

const { getUsers } = require("../controllers/index.controller");


router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.get("/register", (req, res) => {
    res.render("register.ejs");
});


module.exports = router;