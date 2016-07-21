const express = require('express'),
 path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
env          = process.env,
debug = require('debug')('testnode:server'),
http = require('http');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// Create our Express router
// get an instance of router
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');         // here is code to spesify the html page directory
app.engine('html', require('ejs').renderFile);  //render html using ejs module

// apply the routes to our application
app.use('/',router);
//Use route middleware to process requests
// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log('Log each request : ');
    console.log('Method : '+req.method,'Url : '+ req.url);

    // continue doing what we were doing and go to the route
    next();
});



let server = http.createServer(app);


app.use('/users', users);
router.get('/',function(req, res){
//        console.log('session  exit');
    res.render('index.html');
});



server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
