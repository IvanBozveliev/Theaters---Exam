const Product = require('../models/Product');

const isLiked = async function (req, res, next){

    let product = await Product.findById(req.params.productId)
    
    let isExistLike = product.usersLiked.includes(req.user._id)
    
    if(isExistLike){
        res.locals.isLiked = true;
    }
    next()
}


module.exports = isLiked;