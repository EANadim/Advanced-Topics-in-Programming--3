var express = require('express');
var userModel = require.main.require('./models/job-model');
var router = express.Router();


router.get('*', function(request, response, next){
	
	if(request.session.un != "null" && request.session.type=='employer'){
		next();
	}else{
		response.redirect('/login');
	}
});

router.get('/', function(request, response){
	
	userModel.getAll(function(result){
		response.render('employerHome/index');
	});
});


router.get('/jobList', function(request, response){
	userModel.getAll(function(result){
		response.render('employerHome/jobList', {userList: result});
	});

});

router.get('/myPostedJob', function(request, response){
	var userName = request.session.un;
		userModel.get(userName, function(result){
		response.render('employerHome/myPostedJob', {userList: result});
	});

});

router.get('/update/:id', function(request, response){
	
		var id = request.params.id;

		userModel.getId(id, function(result){
			response.render('employerHome/update', {user: result});
		});

});

router.post('/update/:id', function(request, response){
	
		var user = {
			id 		: request.body.id,
			userName: request.session.un,
			companyName: request.body.companyName,
			jobTitle	: request.body.jobTitle,
			location	: request.body.location,
			salary	: request.body.salary

		};

		console.log(user);

		userModel.update(user, function(status){

			if(status){
				response.redirect('/employerHome/myPostedJob');
				//response.redirect(request.body.id);
			}else{
				response.send('Error');
			}
			
		});

});

router.get('/addJob', function(request, response){

	response.render('employerHome/addJob');
});

router.post('/addJob', function(request, response){

	var user={
		userName: request.session.un,
		companyName: request.body.companyName,
		jobTitle: request.body.jobTitle,
		location: request.body.location,
		salary: request.body.salary
	};

	userModel.insert(user, function(status){
		
		if(status == true){
			response.redirect('/employerHome/jobList');
		}else{
			response.send('Error in adding job');
		}
		
	});
});
router.get('/delete/:id', function(request, response){
	
	var id = request.params.id;

    userModel.delete(id, function(result){
        response.redirect('/employerHome/myPostedJob');
    });

});

module.exports = router;