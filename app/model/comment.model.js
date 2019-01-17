module.exports = (sequelize, Sequelize) => {
	const Comments = sequelize.define('comments', {
	  text: {
		  type: Sequelize.TEXT
	  }
	})

	return Comments;
}