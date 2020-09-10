const express = require("express");

const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

require("dotenv/config");

connectDB();

app.use(express.json());

app.use("/api/shops", require("./routes/shops"));

app.get("/", (req, res) => {
	res.json({ msg: "Welcome to Food Review APP" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
