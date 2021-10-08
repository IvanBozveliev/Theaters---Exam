const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

function setUpExpress (app){

    app.use(express.static('public'));
    app.use(express.urlencoded({
        extended: true
    }));
    
    app.engine('hbs', handlebars({
        extname: "hbs"
    }));
    app.set('view engine', 'hbs');

    app.use(cookieParser());
    app.use(auth());
}

module.exports = setUpExpress