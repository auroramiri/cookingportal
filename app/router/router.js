const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/controller.js');
	const recipes = require('../controller/recipes.js');
	const users = require('../controller/users.js')
	const comments = require('../controller/comments.js')
 
	app.post('/signup', controller.signup);
	
	app.post('/signin', controller.signin);

	app.post('/createrecipe', authJwt.verifyToken, recipes.CreateRecipe)

	app.post('/comment', authJwt.verifyToken, comments.createComment)
	
	app.get('/user', authJwt.verifyToken, controller.userContent);
	
	app.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

	app.get('/recipe/:tag', recipes.FindAllRecepies)
	
	app.get('/user/:userId', users.findById);

	app.delete('/user/:userId', [authJwt.verifyToken, authJwt.isAdmin], users.deleteUser);

	app.delete('/recipe/:id', [authJwt.verifyToken, authJwt.isAdmin], recipes.deleteRecipe);

	app.delete('/comment/:id', [authJwt.verifyToken, authJwt.isAdmin], comments.deleteComment)
}