const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");

// @route		GET api/user
// @desc			Register User
// @access		Public
router.post(
	"/",
	[
		check("name", "Please add name").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 5 })
	],
	(req, res) => {
		//res.send("register a user");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send("passed");
	}
);

// @route		PUT api/user
// @desc			Edit user info
// @access		Private
router.put("/", (req, res) => {
	res.send("edit user");
});

module.exports = router;
