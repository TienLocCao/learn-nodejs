var express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoute =  require('./routers/users.route');
const authRoute =  require('./routers/auth.route');
const cookieParser = require('cookie-parser');
const authMiddleware =  require('./middlewares/auth.middleware');

var app = express();
var port =3000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static('public'));

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

app.use('/users', authMiddleware.requiredAuth, userRoute);

app.use('/auth', authRoute);