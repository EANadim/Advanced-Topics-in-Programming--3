var db = require('./db');

module.exports={

	get: function(user, callback){
		var sql = "select * from employer where userName=?";
		db.getResult(sql, [user], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},

	getAll: function(callback){
		var sql = "SELECT * FROM employer";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO employer values(?,?, ?,?,?)";
		db.execute(sql, [user.employerName, user.companyName, user.contactNo,user.userName,user.password], function(success){
			callback(success);
		});
	},
	validate: function(user, callback){
		var sql = "select * from employer where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "UPDATE employer set employerName=?, companyName=?, contactNo=?, password=? where userName=?";
		db.execute(sql, [user.employerName, user.companyName, user.contactNo, user.password,user.userName], function(status){
			console.log(user);
			callback(status);
		});
    },
	delete: function(user, callback){
		var sql = "DELETE FROM employer where userName=?";
		db.getResult(sql, [user], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},    
}