const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registed!'});
        }
    });
});



//Authentication
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw error;
        if(!user){
            return res.json({success: ture, msg: 'User not found!'});
        }
        //comparePassword is model function
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if(isMatch){
                //jwt.sign() returns a jsonWebToken as string
                const token = jwt.sign(user, config.secret, {expiresIn: "2 days"});
                res.json({
                    success: true,
                    token : "JWT " + token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg:"wrong password!"});
            }
        });
    });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

//Validate
router.get('/register', (req, res, next) => {
    res.send('register')
});

module.exports = router;