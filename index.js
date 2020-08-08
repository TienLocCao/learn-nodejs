require('dotenv').config();
var express = require('express');
var csrf = require('csurf');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoute =  require('./routers/users.route');
const productRoute =  require('./routers/products.route');
const cartRoute =  require('./routers/cart.route');
const transferRoute =  require('./routers/transfer.route');
const authRoute =  require('./routers/auth.route');
const cookieParser = require('cookie-parser');
const authMiddleware =  require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');
var app = express();
var port =3000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json())
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
app.use(sessionMiddleware);
// app.use(csrf({cookie:true}));
var csrfProtection = csrf({ cookie: true })

app.set('view engine', 'pug');
app.set('views', './views');

// var users = [
//     {id:1,name:'A'},
//     {id:2,name:'B'}
// ]

app.get('/', authMiddleware.requiredAuth, function(req, res) {
    // res.send('<h1>Hello world!</h1>');
    // res.render('index');
    res.render('index',{
        name: 'Hello world'
    });
});

app.listen(port ,function(){
    console.log(`server listening on port ${port}`)
})

app.use('/auth', authRoute);
app.use('/users', authMiddleware.requiredAuth, userRoute);
app.use('/products', authMiddleware.requiredAuth, productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requiredAuth,csrfProtection, transferRoute);
