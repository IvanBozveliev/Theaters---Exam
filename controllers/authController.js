const { Router } = require('express');
const { COOKIE_NAME } = require('../config/config')
const router = Router();

const processError = require('../middlewares/errorHandler');
const authService = require('../services/authService');

let isGuest = require('../middlewares/isGuest');
let isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: "Login Page" })
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;
    
    try {
        
        if(password == '' || username == ''){
            throw new Error('Invalid inputs!')
        }


        let token = await authService.login({ username, password })
        res.cookie(COOKIE_NAME, token)
        res.redirect('/products')
    }  catch (error) {
        if(error.name == 'ValidationError'){
            let err = processError(error);

            res.render('login', {error: err})
        }else{
            res.render('login', { error: error.message })
        }
        
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: "Register Page" })
});

router.post('/register', isGuest,
    async (req, res) => {
        const { username, password, repeatPassword } = req.body;

        try {
            
            if(!/[a-zA-Z0-9]{3,}/.test(password)){
                throw new Error('Password must be at least 3 characters long and consist only latin letters and digits')
            }
            
            if(password == '' || username == '' || repeatPassword == ''){
                throw new Error('Invalid inputs!')
            }
            
            if (password !== repeatPassword) {
                throw new Error('Password missmatch!')
            }

            await authService.register({ username, password })
            res.redirect('/auth/login');

        } catch (error) {
            if(error.name == 'ValidationError'){
                let err = processError(error);

                res.render('register', {error: err})
            }else{
                res.render('register', { error: error.message })
            }
            
        }
    });

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/products')
});

module.exports = router;