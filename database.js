const mysql = require("mysql");

class Database {
	constructor() {
		this.db = mysql.createConnection({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		});
		this.err = null;
	}

	connect() {
		this.db.connect(err => {
			if(err)
				this.err = err;
		});
	}

	request(request) {
		return new Promise((resolve, reject) => {
			this.db.query(request, (err, res, fields) => {
				if(err)
					reject(err);
				else
					resolve(res);
			});
		});
	}

	disconnect(callback) {
		this.db.end(callback);
	}
}

module.exports = Database;