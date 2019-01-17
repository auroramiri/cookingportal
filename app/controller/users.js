const db = require('../config/db.config.js')
const User = db.user;
const Recipe = db.recipe;
const Comments = db.comment

exports.findById = (req, res) => {	
	User.findById(req.params.userId,
		{ attributes: ['username', 'email']}).then(user => {
		res.send(user);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	})
};


exports.deleteUser = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(()=>{
	Recipe.destroy({
		where: { userId: id }
		})
	}).then(()=>{
		Comments.destroy({
			where: { userId: id }
			})
		})
	.then(() => {
		res.status(200).send('User has been deleted!');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};