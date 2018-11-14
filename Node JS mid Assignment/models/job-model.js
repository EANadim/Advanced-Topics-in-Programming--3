var db = require('./db');

module.exports={	
	get: function(userName, callback){
		var sql = "select * from job where userName=?";
		db.getResult(sql, [userName], function(result){
			//console.log(result);
			callback(result);
		});
	},
	getId: function(id, callback){
		var sql = "select * from job where id=?";
		db.getResult(sql, [id], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},	
	getAll: function(callback){
		var sql = "SELECT * FROM job";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO job values(?,?,?,?,?,?)";
		db.execute(sql, [null,user.companyName, user.jobTitle, user.location,user.salary,user.userName], function(success){
			callback(success);
		});
	},
	/*validate: function(user, callback){
		var sql = "select * from job where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},*/
	update: function(user, callback){
		var sql = "UPDATE job set companyName=?, jobTitle=?, location=?,salary=? where id=?";
	
		db.execute(sql, [user.companyName, user.jobTitle, user.location, user.salary,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM job where id=?";
		db.getResult(sql, [id], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},    	
}