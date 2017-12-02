var express = require('express');
var login = express.Router();
const { UserModel } = require("../models");
const hmac = require("../utils/hash");

/* GET home page. */
login.get("/", function(req, res,next) {
	res.render("login");
});
login.post("/", function(req, res, next) {
	const form = req.body;
	console.log("Post :", form);
	UserModel.findOne({username: form.user})
	.then((doc) => {
		if (!doc) {
			console.log("Emputy Doc");	
			return res.render("login", {
				errMessage: "登录失败 用户不存在 User: " + form.user
			});
		}
		console.log("passs::",doc.password)
		if (doc.password === hmac(form.password)) {
			req.session.userId = doc._id;
			req.session.username = doc.username;
			res.redirect("/");
		} else {
			return res.render("login", {
				errMessage: "登录失败 密码错误 User: " + form.user
			});
		}
	})
	.catch((err) => {
		console.log("Error :", err);	
		next(err);
	});
});

module.exports = login;