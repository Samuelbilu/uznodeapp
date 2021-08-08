const express = require('express');
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

        return res.render('login.ejs');
    }catch(err){
        return res.send(err);
        console.log('o erro é: ' + err);
    };
});

router.post('/login', async (req, res) => {
    const { username,password } = req.body;

    const user = await User.findOne({ username }).select('+password')

    if(!user){
        return res.send('User not found');

    }else{
        res.render('index.ejs');
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.send('Invalid password');

    }else{
        res.render('index.ejs');
    }
})

module.exports = app => app.use('/auth', router)