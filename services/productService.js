const Product = require('../models/Product');
const User = require('../models/User');

async function create(data, userid) {
   
      if(data.title == '' || data.description == '' || data.imageUrl == ''){
         throw new Error('You can not have empty fields!')
      }

      if(data.isPublic){
         data.isPublic = true;
      }
   
      let product = await new Product({ ...data, created: Date(), creator: userid });
   
      return product.save();

  
}

function getOne(id){
   return Product.findById(id).lean();
}

async function getAll() {
   
   let products = await Product.find({}).lean();
   products = products.filter(x => x.isPublic == true);

   return products
}

// function getOneWithAccessory(id){
//    return Cube.findById(id).populate('accessories').lean()
// }

function updateOne(productId, productData){
   return Product.updateOne({_id: productId}, productData)
}

function deleteOne(productId) {
   return Product.deleteOne({ _id: productId })
}

async function like(productid, userid) {

   let product = await Product.findById(productid);
   let user = await User.findById(userid);


   product.usersLiked.push(user);
   user.likedPlays.push(product);

   return product.save(), user.save();

}

async function getSortedByDate(){
   let products = await Product.find({}).lean();

   products = products.sort((a,b) => new Date(b.created) - new Date(a.created));
   return products;
}

async function getSortedByLikes(userid){

   let products = await Product.find({}).lean();
   products = products.sort((a,b) => b.usersLiked.length - a.usersLiked.length)

   if(!userid){
      products = products.slice(0,3)
   }

   return products;
}

module.exports = {
   create,
   getOne,
   getAll,
   // getOneWithAccessory,
   updateOne,
   deleteOne,
   like,
   getSortedByDate,
   getSortedByLikes
}