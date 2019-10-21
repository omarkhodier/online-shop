const productsModel = require('../models/products');

exports.getHome= (req,res,next)=>{
    //get products from db
    //render index.ejs
    //get category
    let category =req.query.category;
    let validCategory=['clothes','computer','fruits','phone']
    if(category && validCategory.includes(category)){
        productsModel.getProductsByCategory(category).then( products => {
            res.render('index',{
                products : products
            })
        })
    }else{
        productsModel.getAllProducts().then( products => {
            res.render('index',{
                products : products,
                isUser: req.session.userId,
                isAdmin:req.session.isAdmin,
                validationError : req.flash('validationErrors')[0],
                pageTitle:'Home'
            })
        })
    }
}