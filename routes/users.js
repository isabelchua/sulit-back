const express = require("express");
const router = express.Router();

// @route		GET api/user
// @desc			Register User
// @access		Public
router.post("/", (req, res) => {
	res.send("register a user");
});

// @route		PUT api/user
// @desc			Edit user info
// @access		Private
router.put("/", (req, res) => {
	res.send("edit user");
});

module.exports = router;
