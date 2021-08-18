const { Router } = require("express");
const router = Router();

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.get("/auth/login", (req, res) => {
    res.render("redirectLogin.ejs");
});

router.post("/login", (req, res) => {
    res.render('redirectLogin.ejs')
});

router.get("/register", (req, res) => {
    res.render("register.ejs");
});
module.exports = router;