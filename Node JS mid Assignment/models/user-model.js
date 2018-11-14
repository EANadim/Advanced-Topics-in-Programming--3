var db = require('./db');

module.exports={	
	get: function(userId, callback){
		var sql = "select * from admin where userName=?";
		db.getResult(sql, [useruserName], function(result){
			//console.log(result);
			callback(result[0]);
		});
	},
	getAll: function(callback){
		var sql = "SELECT * FROM admin";
		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	/*insert: function(user, callback){
		var sql = "INSERT INTO user values(null, ?, ?,?)";
		db.execute(sql, [user.username, user.password, user.type], function(success){
			callback(success);
		});
	},*/
	validate: function(user, callback){
		var sql = "select * from admin where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	/*update: function(user, callback){
		var sql = "UPDATE user set username=?, password=?, type=? where id=?";
	
		db.execute(sql, [user.username, user.password, user.type, user.id], function(status){
			callback(status);
		});
	},*/
}