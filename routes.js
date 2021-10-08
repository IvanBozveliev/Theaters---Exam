const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/homeController');
const productController = require('./controllers/productController');
const authController = require('./controllers/authController');

router.use('/', homeController);
router.use('/products', productController);
router.use('/auth', authController);

// router.get("*" ,(req, res) =>{
//     res.render('404', {title: 'Error Page'})
// });

module.exports = router;