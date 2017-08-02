const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      config = require('./config/database');
      mongoose.Promise = global.Promise; 

//Connect to Database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
    console.log('connected to DATABASE ' + config.database)
});    

//On error
mongoose.connection.on('error', (err) => {
    console.log('Database error:' + err)
});

const app = express();
const users = require('./routes/users');

//Port number
const port = 8000;

//CORS
app.use(cors());

//set static file
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use('/users', users);
//Index route
app.get('/', (req, res) => {
    res.send("not ready yet!")
});

//Start Server
app.listen(port, () => {
    console.log("SERVER starts on port " + port)
});