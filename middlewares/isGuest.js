function isGuest(req, res, next){

    if(req.user){
        return res.redirect('/products')
    }

    next();
}

module.exports = isGuest;