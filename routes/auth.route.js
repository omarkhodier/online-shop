const express = require('express');
const router= express.Router();
const bodyParser= require('body-parser');
const check = require('express-validator').check;
const authGuard = require('./guards/auth.guard');

const authController = require ('../controllers/auth.con');

router.get('/signup',authGuard.noAuth,authController.getSignup);

router.post('/signup',authGuard.noAuth,
    bodyParser.urlencoded({extended:true}),
    check('username').not().isEmpty(),
    check('email').not().isEmpty().withMessage('email is required').
    isEmail().withMessage('invalid email  format'),
    check('password')
    .not().isEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage('password must be at least 6 charachters'),
    check('confirmpass').custom((value,{req})=>{
        if( value === req.body.password) return true 
        else throw " passwords is not equal";
    }),
    authController.postSignup
);

router.get('/login',authGuard.noAuth,authController.getLogin);


router.post('/login',authGuard.noAuth,
bodyParser.urlencoded({ extended: true }),
check('email').not().isEmpty().withMessage('email is required').
    isEmail().withMessage('invalid email  format'),
    check('password')
    .not().isEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage('password must be at least 6 charachters'),
authController.postLogin
)
router.all('/logout',authGuard.isAuth,authController.logout);

module.exports=router;