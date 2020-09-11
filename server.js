const express = require("express");

const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

require("dotenv/config");

connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

app.use("/api/", require("./routes/home"));
app.use("/api/shops", require("./routes/shops"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
	res.json({ msg: "Welcome to Food Review APP" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
