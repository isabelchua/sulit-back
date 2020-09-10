const express = require("express");
const router = express.Router();

// @route		GET api/:shopid/posts
// @desc			Get all posts from shop
// @access		Public
router.get("/", (req, res) => {
	res.send("Get all Posts from shop");
});

// @route		POST api/post
// @desc			Add a review
// @access		Private
router.post("/", (req, res) => {
	res.send("Add post");
});

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
