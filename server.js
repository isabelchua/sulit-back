const express = require("express");

const app = express();
const mongoose = require("mongoose");

require("dotenv/config");

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(3000);
