var express = require('express');
const multer = require("multer");
const { UserModel,UserModel1 } = require("../models");
var users = express.Router();
const dest = "public/upload/";
const uploadMid = multer({dest: dest});

/* GET users listing. */
users.get("/", function(req, res, next) {
	if (req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
}, function(req, res, next) {
	console.log("req::",req.session);
	const id = req.session.userId;
	const username = req.session.username;
	UserModel.findById(id,(err,doc) => {
		if (err) {
			next(err);
		}
		if (doc.avatar) {
			req.session.username = doc.username;
			const imgPath = doc.avatar;
			UserModel1.find({author:req.session.userId}).then((articles) =>{
				console.log("articles::",articles);
				res.render("usercenter", {user:articles,imgPath:imgPath,username:username});
			});
		}else {
			const imgPath1 = "/static/img/yu.jpg";
			req.session.username = doc.username;
			res.render("usercenter", {imgPath1:imgPath1,username:username});
		}
	})
	
})

users.get("/logout", function(req, res, next) {
	req.session.destroy();
	res.redirect("/");
})

users.post("/",uploadMid.single("image1"), function(req,res,next){
	// uploadMid.single("image1")：：指的是将html文件中的name为image1的input框设置为上传文件的所在地方
	console.log("form :", req.session);
	console.log("file: ", req.file);
	const start = req.file.path.indexOf("\\");
	const path = req.file.path.substr(start);
	const id = req.session.userId;
	console.log("pathhh::",path);
	UserModel.findById(id,(err,doc) =>{
		if (err) {
			return next(err);
		}
		doc.avatar = path;
		doc.save((err,doc) => {
			req.session.userId = doc._id;
			req.session.username = doc.username;
			res.render("usercenter", { imgPath: doc.avatar, username:req.session.username})
		});
	});
});

module.exports = users;
