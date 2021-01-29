const Express = require("express");
const database = require("./database");

const route = Express.Router();
const path = "/api/v1/";
const Database = new database();
Database.connect();

route.get("/", (req, res) => {
	res.json({
		title: "Todolist API v1",
		GET: [
			"/user => gets list of all users in database.",
			"/user with body 'mail' => gets specific user."
		],
		PUT: [
			"/user => creates new user (mail, name, avatar)"
		]
	});
});

//READ user table
route.get("/user", (req, res) => {
	const mail = req.body.mail ? req.body.mail : null;
	const mysql_req = "SELECT * from user" + (mail ? " WHERE mail=\"" + mail + "\"" : "");
	Database.request(mysql_req)
	.then(result => {
		res.json({
			status: 1,
			response: result
		});
	})
	.catch(err => {
		res.json({
			status: 0,
			response: err
		});
	});
});

//ADD user table
route.put("/user", (req, res) => {
	const mail = req.body.mail ? req.body.mail : null;
	const name = req.body.name ? req.body.name : null;
	if(mail && name) {
		const avatar = req.body.avatar ? req.body.avatar : null;
		let mysql_req = "INSERT INTO user(mail, name, avatar) VALUES (\"" + mail + "\", \"" + name + "\"";
		if(avatar)
			mysql_req += ", \"" + avatar + "\")";
		else
			mysql_req += ", null)";
		Database.request(mysql_req)
		.then(result => {
			res.json({
				status: 1,
				response: result
			});
		})
		.catch(err => {
			res.json({
				status: 0,
				response: err
			});
		});
	}
	else {
		res.json({
			status: 0,
			response: "Missing body parameter name or mail."
		});
	}
});

//DELETE user table
route.delete("/user", (req, res) => {
	const mail = req.body.mail ? req.body.mail : null;
	const name = req.body.name ? req.body.name : null;
	if(mail) {
		let mysql_req = "DELETE FROM user WHERE mail=\"" + mail + "\"";
		Database.request(mysql_req)
		.then(result => {
			res.json({
				status: 1,
				response: result
			});
		})
		.catch(err => {
			res.json({
				status: 0,
				response: err
			});
		});
	}
	else {
		res.json({
			status: 0,
			response: "Missing body parameter mail."
		});
	}
});

module.exports = {path, route};