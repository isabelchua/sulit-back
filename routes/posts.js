const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
const Shop = require("../models/Shop");

// @route		GET api/:shopid/posts
// @desc			Get all POSTS
// @access		Public
router.get("/all", async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route		GET api/:shopid/posts
// @desc			Get all posts from shop
// @access		Public
router.get("/", async (req, res) => {
	try {
		const posts = await Shop.find({ shop: req.shop.id }).sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route		GET api/:userid/posts
// @desc			Get all posts from USER
// @access		Private
router.get("/user/:userid", auth, async (req, res) => {
	try {
		const posts = await User.find({ user: req.user.id }).sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route		POST api/post
// @desc			Add a review
// @access		Private
router.post(
	"/:id",
	auth,
	[
		[
			check("review", "Review is required").not().isEmpty(),
			check("rating", "Rating is required").not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { review, rating, image } = req.body;
		try {
			const shop = await Shop.findById(req.params.id);

			const post = new Post({
				review: review,
				rating: rating,
				image: image,
				shopid: shop.id,
				userid: req.user.id
			});

			const nPost = await post.save();
			res.json(nPost);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route		PUT api/post
// @desc			Edit a review
// @access		Private
router.put("/:postId", (req, res) => {
	res.send("Edit post");
});

// @route		DELETE api/post
// @desc			Delete a review
// @access		Private
router.delete("/:postId", (req, res) => {
	res.send("Delete post");
});

module.exports = router;
