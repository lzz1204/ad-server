const express = require("express");
const { UserModel1 } = require("../models");
const { ReviewModel } = require("../models");
const article = express.Router();
article.get("/:id",(req,res,next) =>{
	const author = req.session.userId;
	const id = req.params.id;
	console.log("req：：",req.session);
	// const req.session.articleId = id;
	UserModel1.find({_id:id},(err,doc) => {
		if (err) {
			next(err)
		}
		console.log("docsss::",doc);
		ReviewModel.find({article:id},(err,docs) =>{
			// console.log("docsss::",docs);
			res.render("article",{article:doc,reviews:docs,username:req.session.username});
		});
	});
});
article.post("/",(req,res,next) =>{
	const form3 = req.body;
	console.log("gorm333::",form3);
	console.log("reqssssion：：",req.session);
	const author = req.session.userId;
	const referer = req.get("Referer");
	const lastPath = referer.lastIndexOf("/");	
	const id = referer.substr(lastPath+1);
	console.log("ID: ", id);
	const review = new ReviewModel({
		author: req.session.userId,
		article: id,
		review:form3.review,
	});
	review.save();
	res.redirect("back");
})
module.exports = article;