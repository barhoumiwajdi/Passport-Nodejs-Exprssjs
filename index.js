const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

// require midlleware
require('./Midlleware/Passport')
// connect to database
require('./Connect/Db');


// Create express App
const app = express();
const port = 4000;
// Common Configurations
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'Secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Home Route
app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to my REST API.' });
});


app.use('/api/v1', require('./Routes/UserRoutes'))


app.listen(process.env.port || port, function () {
    console.log(`Backend server start on port ${port}`);
});