const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/controller.js');
 
	app.post('/signup', verifySignUp.checkDuplicateUserEmail, controller.signup);
	
	app.post('/signin', controller.signin);
	
	app.get('/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}