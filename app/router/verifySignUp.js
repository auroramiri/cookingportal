const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs; 
const User = db.user;
const Role = db.role;

checkDuplicateUserEmail = (req, res, next) => {
	
		// -> Check Email is already in use
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).json("Fail -> Email is already in use!");
				return;
			}
				
			next();
		});
	}
const signUpVerify = {};
signUpVerify.checkDuplicateUserEmail = checkDuplicateUserEmail;

module.exports = signUpVerify;