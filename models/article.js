const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	title: {
		type:String,
		require: true,
	},
	content:String,
	author:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	status: Boolean, // true: 正常， false: 禁用
	createAt: {
		type: Date,
		default: Date.now
	}
});

const UserModel1 = mongoose.model("article", UserSchema, "article");

module.exports = UserModel1;