const { Router } = require('express');
const router = Router();
const productService = require('../services/productService')

router.get("/" , (req, res) =>{
    res.redirect('/products')
});

router.get("/about" ,(req, res) =>{
    res.render('about', {title: 'About page'})
});

module.exports = router;