var express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoute =  require('./routers/users.route');

var app = express();
var port =3000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
    
app.use(bodyParser.json())

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

// var users = [
//     {id:1,name:'A'},
//     {id:2,name:'B'}
// ]

app.get('/', function(req, res) {
    // res.send('<h1>Hello world!</h1>');
    // res.render('index');
    res.render('index',{
        name: 'Hello world'
    });
});

app.listen(port ,function(){
    console.log(`server listening on port ${port}`)
})

app.use('/users',userRoute);