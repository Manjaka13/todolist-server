const Express = require("express");
const database = require("./database");

const route = Express.Router();
const path = "/api/v1/";
const Database = new database();
Database.connect();

//READ todo table
route.post("/", (req, res) => {
	const date = req.body.date ? req.body.date : null;
	const mysql_req = "SELECT * from todo" + (date ? (" WHERE _date=\"" + date + "\"") : "");
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

//ADD todo table
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

//DELETE todo table
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