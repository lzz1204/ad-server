const mongoose = require("mongoose");
const UserModel = require("./user");
const UserModel1 = require("./article");
const ReviewModel = require("./review");

const url = "mongodb://localhost:27017/blog";

mongoose.Promise = global.Promise;

mongoose.connect(url, {
	useMongoClient: true
});

// 检查数据库 user 表是不是为空，如果为空，插入测试数据
// UserModel.count()
// .then((num) => {
// 	if (num === 0) {
// 		const admin = new UserModel({
// 			username: "laownag",
// 			password: 123456,
// 		});
// 		// const user1 = new UserModel({
// 		// 	username: username,
// 		// 	password: password,
// 		// });
// 		admin.save();
// 		// user1.save();
// 	}
// })
// .catch((err) => {
// 	throw(err);
// });

exports.UserModel = UserModel;
exports.UserModel1 = UserModel1;
exports.ReviewModel = ReviewModel;