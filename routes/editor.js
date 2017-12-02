const express = require("express");
const { UserModel1 } = require("../models");
const editor = express.Router();
editor.get("/",(req,res,next) =>{
	let username = "";
	if (req.session.username) {
		username = req.session.username;
	}
	res.render("editor",{username:username});
})
editor.post("/",(req,res,next) =>{
	const form1 = req.body;
	console.log("form1::",form1);
	console.log("session11:",req.session);
	const article = new UserModel1({
		title:form1.title,
		content: form1.content,
		author:req.session.userId,
	});
	article.save((err,doc,num) =>{
		if (err) {
			next(err);
		}
		 res.redirect("/users");
		 // res.render("usercenter",{username: req.session.username});
	})
})

module.exports = editor;