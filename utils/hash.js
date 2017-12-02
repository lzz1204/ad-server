const crypto = require("crypto");
const secret = "asklfwe23pfldmlsvvio34";
const hmac  = function(str){
	const hamc1 = crypto.createHmac("sha256",secret);
	hamc1.update(str);
	return hamc1.digest("hex");	
}
module.exports = hmac;