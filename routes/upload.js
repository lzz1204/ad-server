const express = require("express");
const multer = require("multer");

const upload = express.Router();

const uploadMid = multer({dest: "public/images"})

upload.post("/", uploadMid.single("upload"), function(req, res, next) {
	const funcNum = req.query.CKEditorFuncNum;
	console.log("File :",req.file);
	// 为了兼容windows
	// req.file.path.replace(/\\/g, "/");
	const filePath = req.file.path.replace(/\\/g, "/");
	console.log("FilePath: ", filePath);
	const start = filePath.indexOf("/");
	// 生成前端可以访问到的路径；
	const path = filePath.substr(start);
	console.log("pathhh::",path);
	res.send(`<script>window.parent.CKEDITOR.tools.callFunction(${funcNum}, '${path}')</script>`);
});
module.exports = upload;