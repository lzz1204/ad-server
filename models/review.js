const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	author:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	article:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "article",
	},
	review: String,
	status: Boolean, // true: 正常， false: 禁用
	createAt: {
		type: Date,
		default: Date.now
	}
});

const ReviewModel = mongoose.model("review", UserSchema, "review");

module.exports = ReviewModel;