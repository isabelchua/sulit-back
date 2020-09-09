const express = require("express");
const router = express.Router();

// Get All Shops
const Shop = require("../models/Shop");

router.get("/", async (req, res) => {
	try {
		const shops = await Shop.find().sort({ date: -1 });
		res.json(shops);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error: Error Getting Contacts");
	}
});

module.exports = router;
