const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	name: {
		type: String
	},
	review: {
		type: String,
		required: true
	},
	rating: {
		type: String,
		required: true
	},
	shopid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "shop"
	},
	date: {
		type: Date,
		default: Date.now
	},
	image: {
		type: String
	}
});

module.exports = mongoose.model("post", PostSchema);
