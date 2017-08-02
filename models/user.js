const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      config = require('../config/database');

//User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username:username};
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    //bcrypt.compare(data, encrypted, callback)
    //callback(err, same)  same can be called anything, boolean
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}


