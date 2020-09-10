const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");

// Get All Shops
const Shop = require("../models/Shop");

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

// @route	POST api/contacts
// @desc		Add new contact
// @access	Private
//require name when editing
router.post(
	"/",
	[check("name", "Name is required").not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, address, description, short, phone } = req.body;

		try {
			const newShop = new Shop({
				name,
				address,
				description,
				short,
				phone
			});
			const shop = await newShop.save();

			res.json(shop);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
