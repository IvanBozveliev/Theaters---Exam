const { Router } = require('express');
const router = Router();

const productService = require('../services/productService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isLiked = require('../middlewares/isLiked');
const processError = require('../middlewares/errorHandler');


router.get("/", async (req, res) => {

    if(req.user){
        let products = await productService.getAll()
        res.render('home', { title: 'Home page', products })
    }else{
        let products = await productService.getSortedByLikes()
        res.render('home', { title: 'Home page', products })
    }

});

router.get("/create", (req, res) => {
    res.render('create', { title: 'Create page' })
});

router.post('/create', isAuthenticated, (req, res) => {

    productService.create(req.body, req.user._id)

        .then(() => res.redirect('/products'))
        
        .catch((error) =>{
            if(error.name == 'ValidationError'){
                let err = processError(error);

                res.render('create', {error: err})
            }else{
                res.render('create', { error: error.message })
            }
        })
});

router.get('/details/:productId', isLiked, async (req, res) => {

    let product = await productService.getOne(req.params.productId);
    let isCreator = product.creator.toString() == req.user._id;

    res.render('details', { title: 'Details page', product, isCreator })
});

router.get('/edit/:productId', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => res.render('edit', { title: 'Edit page', product }))
});

router.post('/edit/:productId/', isAuthenticated, (req, res) => {
    productService.updateOne(req.params.productId, req.body)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
});


router.get('/delete/:productId', isAuthenticated, (req, res) => {

    // if (req.user._id !== product.creator.toString()) {
    //     res.redirect('/products')
    // } else {
        productService.deleteOne(req.params.productId)
        .then(() => res.redirect('/'))
    // }

});

router.get('/like/:productId', (req, res) => {
    productService.like(req.params.productId, req.user._id)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
})

router.get('/sortedbydate' , async(req, res) =>{
    let products = await productService.getSortedByDate();
    res.render('home', {products});
})

router.get('/sortedbylikes', async (req, res) =>{
    let products = await productService.getSortedByLikes(req.user._id);
    res.render('home', {products})
})

module.exports = router;