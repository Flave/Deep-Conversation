const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// set up our express application
app.use(require('morgan')('combined'));
app.use(require ('cookie-parser')()); // read cookies (needed for auth)
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: true})); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// load api routes
app.use(require('./routes'));


app.listen(port);
console.log('The magic happens on port ' + port);