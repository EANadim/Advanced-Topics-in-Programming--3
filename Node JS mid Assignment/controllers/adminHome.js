var express = require('express');
var userModel = require.main.require('./models/employer-model');
var mysql = require('mysql');
var router = express.Router();


router.get('*', function(request, response, next){
	
	if(request.session.un != "null" && request.session.type=='admin'){
		//request.session.errorsReg = '';
		next();
	}else{
		response.redirect('/login');
	}
});

router.get('/', function(request, response){
	
	userModel.getAll(function(result){
		response.render('adminHome/index');
	});
});


router.get('/employerList', function(request, response){
	userModel.getAll(function(result){
		response.render('adminHome/employerList', {userList: result});
	});

});

router.get('/update/:userName', function(request, response){
	
		var userName = request.params.userName;

		userModel.get(userName, function(result){
			console.log(result);
			response.render('adminHome/update', {user: result});
		});

});

router.post('/update/:userName', function(request, response){
	
		var user = {
            employerName: request.body.employerName,
            companyName: request.body.companyName,
            contactNo: request.body.contactNo,
			userName: request.body.userName,
			password: request.body.password
		};

		console.log(user);
		userModel.update(user, function(status){

			if(status){		
				response.redirect('/adminHome/employerList');
				//response.redirect(request.body.userName);
			}else{
				response.send('Error');
			}
			
		});

});

router.get('/addEmployer', function(request, response){

	response.render('adminHome/addEmployer',{errorsReg: request.session.errorsReg});
});

router.post('/addEmployer', function(request, response){

	var user={
        employerName: request.body.employerName,
        companyName: request.body.companyName,
        contactNo: request.body.contactNo,
		userName: request.body.userName,
		password: request.body.password
	};
	request.check('employerName', 'employer name can not be empty').isLength({min: 1});
	request.check('companyName', 'company name can not be empty').isLength({min: 1});
	request.check('contactNo', 'contact number must be at least 11 character').isLength({min: 11,max: 11});
	request.check('userName', 'user name can not be empty').isLength({min: 1});
	request.check('password', 'Password must be at least 3 characters').isLength({min: 3});

	var errorsReg = request.validationErrors();
	console.log(errorsReg);

	if (errorsReg) {
		request.session.errorsReg = errorsReg;
		response.redirect('/adminHome/addEmployer');
	}
	else
	{
		userModel.insert(user, function(status){
			
			if(status == true){
				request.session.errorsReg = '';
				response.redirect('/adminHome/employerList');
			}else{
				response.send('Error in adding user');
			}
			
		});
	}	
});
router.get('/delete/:userName', function(request, response){
	
	var userName = request.params.userName;

    userModel.delete(userName, function(result){
        response.redirect('/adminHome/employerList');
    });

});

module.exports = router;