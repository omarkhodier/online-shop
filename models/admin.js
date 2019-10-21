const mongoose = require('mongoose');
const db= 'mongodb://localhost:27017/online-shop';

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    image:String
});

const productItem = mongoose.model('admin',productSchema);

exports.addNewProduct = data =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db).then(()=>{
            let prod =new productItem(data);
            return prod.save();
        }).then(products =>{
            mongoose.disconnect();
            resolve(products);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}