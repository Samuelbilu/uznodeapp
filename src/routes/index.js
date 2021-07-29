const { Router } = require("express");
const router = Router();


router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/login", (req, res) => {
    //res.render("login.ejs");
    res.send("página em teste");
});

router.get("/register", (req, res) => {
    //res.render("register.ejs");
    res.send("pagina em teste");
});

module.exports = router;