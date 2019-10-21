const mongoose = require('mongoose');
const db= 'mongodb://localhost:27017/online-shop';


const productScehma = mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    description:String,
    category:String
});
const Product = mongoose.model('products',productScehma); 


exports.getAllProducts = () => {

   return new Promise((resolve, reject) => {
    mongoose.connect(db).then( () => {
       return Product.find({})
    }).then(products => {
            mongoose.disconnect();
            resolve(products)
    }).catch( err => reject(err) )
   });

}

exports.getProductsByCategory = (category) => {

    return new Promise((resolve, reject) => {
     mongoose.connect(db).then( () => {
        return Product.find({category:category})
     }).then(products => {
             mongoose.disconnect();
             resolve(products)
     }).catch( err => reject(err) )
    });
 
 }

   exports.getProductById = id =>{
   return new Promise((resolve, reject) => {
      mongoose.connect(db).then( () => {
         return Product.findById(id)
      }).then(products => {
              mongoose.disconnect();
              resolve(products)
      }).catch( err => reject(err) )
     });
   }

   exports.getFirstProduct =()=>{
      return new Promise((resolve, reject) => {
         mongoose.connect(db).then( () => {
            return Product.findOne({});
         }).then(product => {
                 mongoose.disconnect();
                 resolve(product)
         }).catch( err =>{
            mongoose.disconnect();
            reject(err) 
        });
   });
}