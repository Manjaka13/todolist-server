const Express = require("express");
const app = Express();
const cors = require("cors");
const port = process.env.PORT || 3300;

//Middlewares
app.use(cors());

//Listen
app.listen(port, () => {
	console.log("Todolist server running on port " + port);
});