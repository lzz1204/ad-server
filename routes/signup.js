const express = require("express");
const signup = express.Router();
const { UserModel } = require("../models");
const hmac = require("../utils/hash");
const getCcap = require("../utils/getCaptcha");
signup.get("/", function(req,res,next){
	getCcap(function(cap){
		// console.log("Cap text: ", cap.text);
		req.session.captcha = cap.text;
		res.render("signup", {captcha: cap.buffer});
	})
});
signup.post("/",function(req,res,next){
	const form = req.body;
	var check = {};
	 console.log("Post :", form);
	const hashPass = hmac(form.password);
	// console.log("hashPass::",hashPass);
	if (req.session.captcha !== form.captcha) {
			return getCcap((cap) => {
				// console.log("Cap text: ", cap.text);
				req.session.captcha = cap.text;
				res.render("signup", {
					captcha: cap.buffer,
					message: "验证码错误，请重新输入"			
				});
				console.log("cap::",cap.buffer)
			})
		}
	const user = new UserModel({
		username:form.user,
		password:hashPass,
		phone:form.phone,
		email:form.email,
	});
	if (form.password !== form.password1) {
					check.passError = "密码未确定,请再次输入并确定密码";
					return res.render("signup",{ check:check});
				} 
	user.save((err,doc) =>{
		if (!err) {
			req.session.userId = doc._id;
			req.session.username = doc.username;
			return res.redirect("/");
		}
		console.log("err::",err);
		if (err.message.indexOf('duplicate key error') !== -1) {
			check.userError = "用户名已存在";
		}
		else if (err.message.indexOf('用户名必须是') !== -1) {
			check.userError = "用户名必须是字母开头，可包含数字、字母、-、_，长度为4~20位";
		}
		else if (err.message.indexOf('手机号错误') !== -1) {
			check.phoneError = "手机号错误";
		}
		else if (err.message.indexOf('邮箱格式不正确') !== -1) {
			check.emailError = "邮箱格式不正确";
		}
		res.render("signup",{check,check})
	});

				 
})
module.exports = signup;