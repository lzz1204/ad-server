const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		match: [/[a-zA-Z][0-9a-zA-Z_-]{3,20}/, "用户名必须是字母开头，可包含数字、字母、-、_，长度为4~20位"],
		required: true,
		unique: true,
	},
	password: {
		type: String,
		// match: [/^[a-z0-9\.]{6}$/i, "密码格式不正确"],
		required: true,
	},
	phone: {
		type: String,
		match:[/^1[3458][0-9]{9}$/i, "手机号错误"],
	},
	email: {
		type: String,
		match:[/^\w+@[0-9a-z-]+\.[a-z]+$/i, "邮箱格式不正确"],
	},
	avatar: {
		type: String,
	},
	status: Boolean, // true: 正常， false: 禁用
	createAt: {
		type: Date,
		default: Date.now
	}
	// image: String,
	// profile: {
	// 	sex: Boolean, // true : 男, false: 女
	// 	qq: String,
	// 	weixin: String,
	// }
});

const UserModel = mongoose.model("user", UserSchema, "user");

module.exports = UserModel;