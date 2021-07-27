const { Router } = require("express");
const router = Router();

//usuários

const { createUser, verifyUser, users } = require("../controllers/index.controller");

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/login", (req, res) => {
    //res.render("login.ejs");
    res.send("página em teste")
});

/*router.post("/login", (req, res) => {
    const { username, password} = req.body;

    verifyUser(username, password);
    if(verifyUser){
        res.send("logged")
    }
});*/

router.get("/register", (req, res) => {
    res.render("register.ejs");
});

router.post("/register", (req, res) => {
    const { username, password} = req.body;

    createUser(username, password);
});

router.get("/users", users)




module.exports = router;