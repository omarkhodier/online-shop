const mongoose = require('mongoose');

const db= 'mongodb://localhost:27017/online-shop';

const cartSchema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    userId:String,
    productId:String,
    timeStamp:Number
});

const cartItem = mongoose.model('cart',cartSchema);

exports.addNewItem = data=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db).then(()=>{
            let item =new cartItem(data);
            return item.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}
exports.getItemByUser = userId =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db).then(()=>{
            return cartItem.find({userId:userId},{},{sort:{timeStamp:1}})
        }).then(items=>{
            mongoose.disconnect();
            resolve(items);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.editItem = (id,newData) =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db).then(()=>
           cartItem.updateOne( {_id:id} , newData))
           .then(items=>{
            mongoose.disconnect();
            resolve(items);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
};


exports.deleteItem = id =>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db).then(()=>
           cartItem.findByIdAndDelete(id))
           .then( ()=>{
            mongoose.disconnect()
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
};
