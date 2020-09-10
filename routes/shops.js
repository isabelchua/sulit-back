const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");

const Shop = require("../models/Shop");

// @route	POST api/shop
// @desc		Get all Shops
// @access	Private

router.get("/", async (req, res) => {
	console.log("get all shops");
	res.send("get all shops");
	// try {
	// 	const shops = await Shop.find().sort({ date: -1 });
	// 	res.json(shops);
	// } catch (err) {
	// 	console.error(err.message);
	// 	res.status(500).send("Server Error: Error Getting Contacts");
	// }
});

// @route	POST api/shop
// @desc		Add new shop
// @access	Private
//require name when editing
router.post(
	"/",
	(req, res) => {
		res.send("add a new shop");
	}
	// [check("name", "Name is required").not().isEmpty()],
	// async (req, res) => {
	// 	const errors = validationResult(req);
	// 	if (!errors.isEmpty()) {
	// 		return res.status(400).json({ errors: errors.array() });
	// 	}

	// 	const { name, address, description, short, phone } = req.body;

	// 	try {
	// 		const newShop = new Shop({
	// 			name,
	// 			address,
	// 			description,
	// 			short,
	// 			phone
	// 		});
	// 		const shop = await newShop.save();

	// 		res.json(shop);
	// 	} catch (err) {
	// 		console.error(err.message);
	// 		res.status(500).send("Server Error");
	// 	}
	// }
);

module.exports = router;
