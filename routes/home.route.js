const express = require('express');
const router= express.Router();
const homeController = require('../controllers/home.con');
const authGuard = require('../routes/guards/auth.guard');

router.get('/',homeController.getHome);


module.exports=router;