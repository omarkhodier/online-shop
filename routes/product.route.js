const express = require('express');
const router= express.Router();
const productController= require('../controllers/product.con')

router.get('/',productController.getProduct)

router.get('/:id', productController.getProductById)

module.exports=router;