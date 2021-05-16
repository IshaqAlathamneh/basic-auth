'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic')
const UserModel = require('./models/users-model')
const bcrypt = require('bcrypt');
// add my RESTFUL APIs declarations

router.post('/signup', register);
router.post('/signin', basicAuth, login);
// router.get('/oauth', createClothes);




async function login(req, res) {
    // use create Method from the class
    
    res.status(201).json(`You Are Kafu ya ${req.user}`);
};

async function register (req, res) {
    // create a new user
    // read from the request body
    // user object : req.body -> {username: user, password: password}
    // 1- hash the password 
    // 2- save to db 
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel(req.body);
        const record = await user.save();
        res.status(200).json(user);
    } catch(e) {
        console.log(e);
        res.status(403).send('Error Happened!');
    }
   
};



module.exports = router;