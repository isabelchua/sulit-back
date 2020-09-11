const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");

// @route		GET api/user
// @desc			Get logged in User
// @access		Private
router.get("/", auth, async (req, res) => {
	//res.send("get logged in user");
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route		POST api/user
// @desc			Auth user login
// @access		Public
router.post(
	"/",
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password is required").exists()
	],
	async (req, res) => {
		//res.send("log in user");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "Invalid Email" });
			}
			// Check if password matches from password DB
			const comparePass = await bcrypt.compare(password, user.password);

			if (!comparePass) {
				return res.status(400).json({ msg: "Invalid Password" });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 100000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send(
				"There was an error communicating with the server"
			);
		}
	}
);

module.exports = router;
