const express = require("express");
const router = express.Router();

// @route		GET api/user
// @desc			Get logged in User
// @access		Private
router.get("/", (req, res) => {
	res.send("get logged in user");
});

// @route		POST api/user
// @desc			Auth user
// @access		Public
router.post("/", (req, res) => {
	res.send("log in user");
});

module.exports = router;
