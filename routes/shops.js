const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");

const Shop = require("../models/Shop");

const Post = require("../models/Post");

// @route	POST api/shop
// @desc		Get all Posts from Shop
// @access	Private

router.get("/:id", async (req, res) => {
	console.log("get all posts in shop");
	res.send("get all posts in shop");

	try {
		const shop = await Shop.findById(req.params._id);
		const posts = await Post.find({ shopid: shop.id }).limit(10).exec();
		res.json({
			shop: shop,
			postsByShop: posts
		});
		
	} catch (e) {
		console.log(e);
		res.redirect("/");
	}
});

module.exports = router;
