const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username } = req.body;

    try{
        if(await User.findOne({ username })){
            return res.send('User already exists');
            
        }
        const user = await User.create(req.body);

        user.password = undefined;

        return res.render('redirectLogin.ejs');
    }catch(err){
        return res.send(err);
        console.log('o erro é: ' + err);
    };
});

router.post('/login', async (req, res) => {
    const { username,password } = req.body;



    const user = await User.findOne({ username }).select('+password')

    if(!user){
        req.session.userName = ''

        res.send(`
            Invalid login
            <a href='/'>retry</a>
        `);
    }

    if(!await bcrypt.compare(password, user.password)){
        req.session.userName = ''

        res.send(`
            Invalid login
            <a href='/'>retry</a>
        `);
    }

    req.session.userName = username

    console.log(req.session.userName)

    res.send(`
        <script>location.assign('/')</script>
    `);
})

module.exports = app => app.use('/auth', router)