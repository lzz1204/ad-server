const express = require("express");
const getCcap = require("../utils/getCaptcha");

const captcha = express.Router();

captcha.get("/", function(req, res, next) {
	const cap = getCcap(function(cap){
		req.session.captcha = cap.text;
		res.send(cap.buffer.toString("base64"));
	});
});

module.exports = captcha;