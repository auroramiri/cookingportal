const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/controller.js');
 
	app.post('/signup', verifySignUp.checkDuplicateUserNameOrEmail, controller.signup);
	
	app.post('/signin', controller.signin);
	
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}