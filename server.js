require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const v1 = require("./api-v1");

const app = Express();
const port = process.env.PORT || 3300;

//Middlewares
app.use(cors());
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(v1.path, v1.route);
app.get("/", (req, res) => {
	res.json("Todolist server side.");
});

//Listen
app.listen(port, () => {
	console.log("Todolist server running on port " + port);
});