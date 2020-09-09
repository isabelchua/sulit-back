const mongooese = require("mongoose");

const ShopSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	description: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("shop", ShopSchema);
