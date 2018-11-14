//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
var expressSession 	= require('express-session');
var cookieParser 	= require('cookie-parser');
var adminHome 		= require('./controllers/adminHome');
var employerHome 	= require('./controllers/employerHome');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var expressValidator = require('express-validator');
var app 			= express();

//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'hhdhdhdhd', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use('/assets', express.static('ext'));
app.use(expressValidator());

//ROUTING
app.use('/login', login);
app.use('/logout', logout);
app.use('/adminHome', adminHome);
app.use('/employerHome', employerHome);


app.get('/', function(request, response){
	request.session.un = "null";
	request.session.type = "null";
	response.redirect('login');
});


//SERVER STARTUP
app.listen(3000, function(){
	console.log("Server startead at 3000...");
});
