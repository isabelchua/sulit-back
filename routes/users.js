const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");

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
	async (req, res) => {
		//res.send("register a user");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//res.send("passed");
		const { name, email, password, address } = req.body;
		try {
			//if input email already exists in the list of registered emails
			let user = await User.findOne({ email: email });
			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}
			user = new User({
				name,
				email,
				password,
				address
			});
			// hash password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();
			//res.send("User saved");
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
			res.status(500).send("Server Error");
		}
	}
);

// @route		PUT api/user
// @desc			Edit user info
// @access		Private
router.put("/", (req, res) => {
	res.send("edit user");
});

// @route		GET api/:userid/posts
// @desc			Get all posts from USER
// @access		Private
router.get("/:id", async (req, res) => {
	try {
		const posts = await Post.find({ post: req.post.userid }).sort({
			date: -1
		});
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route		GET api/user
// @desc			GET all users (ADMIN ONLY)
// @access		Private
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
