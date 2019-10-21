const express = require('express');
const app= express();
const ejs = require('ejs');
const path =require('path');
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const authRouter =require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route');

// get template engine 
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'images')));
app.set('view engine', 'ejs');
app.set('views' ,'views');

//session
const Store = new sessionStore({
    uri:'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
})

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: false,
  store : Store
}));

//flash 
app.use(flash())
//get route pages
app.use('/',homeRouter);
app.use('/',authRouter);
app.use('/cart',cartRouter);
app.use('/product',productRouter);
app.use('/admin',adminRouter);

app.get('/error',(req,res,next)=>{
    res.status(500);
    res.render('errors.ejs',{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTitle:'errors'
    })
})

app.get('/not-admin',(req,res,next)=>{
    res.status(403);
    res.render('not-admin',{
        isUser:req.session.userId,
        isAdmin:false,
        pageTitle:'not-admin'
    })
})

app.use((req,res,next)=>{
    res.status(404);
    res.render('404',{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTitle:'not-found'
    })
})

//listen port 
const port= process.env.PORT || 3000;
app.listen( port, ()=>{
    console.log('server listen on port ' + port)
});