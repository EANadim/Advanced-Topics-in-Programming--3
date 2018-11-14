var express = require('express');
var mysql = require('mysql');
var userModel = require.main.require('./models/user-model');
var employerModel = require.main.require('./models/employer-model');
var router = express.Router();

router.get('/', function(request, response){
		response.render('login/index', {errorsLog: request.session.errorsLog});
});

router.post('/', function(request, response){

	var user = {
		username : request.body.username,
		password : request.body.password,
		type : request.body.type
	};
	request.check('username', 'Username can not be empty').isLength({min: 1});
	request.check('password', 'Invalid Password').isLength({min: 1});

	var errorsLog = request.validationErrors();
	console.log(errorsLog);
	if (errorsLog) {
		request.session.errorsLog = errorsLog;
		response.redirect('/login');
	}
	else
	{
		if(request.body.type=='admin')
		{
			userModel.validate(user, function(status){
				if(status){
					request.session.errorsLog = "";
					request.session.un = request.body.username;
					request.session.type = request.body.type;
					response.redirect('/adminHome');
				}else{
					response.redirect('/login');
				}
			});
		}
		else if(request.body.type=='employer')
		{
			employerModel.validate(user, function(status){
				if(status){
					request.session.errorsLog = "";
					request.session.un = request.body.username;
					request.session.type = request.body.type;
					response.redirect('/employerHome');
				}else{
					response.redirect('/login');
				}
			});
		}
	}
});

module.exports = router;