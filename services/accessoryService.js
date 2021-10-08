const Accessory = require('../models/Accessory');

function create(data){
   let accessory = new Accessory(data);
   return accessory.save();
}

function getAllUnattached(ids){
   return Accessory.find({_id: {$nin: ids}}).lean()
}

module.exports = {
    create,
    getAllUnattached
}