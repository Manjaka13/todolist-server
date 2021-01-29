const Express = require("express");
const database = require("./database");

const route = Express.Router();
const path = "/api/v1/";
const Database = new database();
Database.connect();

//READ user table
route.get("/", (req, res) => {
	const id = req.body.id && req.body.id >= 0 ? req.body.id : null;
	const mysql_req = "SELECT * from todo" + (id ? (" WHERE id=" + id) : "");
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
route.put("/", (req, res) => {
	const task = req.body.task || null;
	if(task) {
		const date = req.body.date || null
		let mysql_req = "INSERT INTO todo(task) VALUES (\"" + task + "\")";
		if(date)
			mysql_req = "INSERT INTO todo(task, _date) VALUES (\"" + task + "\", \"" + date + "\")";
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
			response: "Missing body parameter: task."
		});
	}
});

//DELETE user table
route.delete("/", (req, res) => {
	const id = req.body.id ? req.body.id : null;
	if(id) {
		let mysql_req = "DELETE FROM todo WHERE id=" + id;
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
			response: "Missing body parameter: id"
		});
	}
});

module.exports = {path, route};