module.exports = (sequelize, Sequelize) => {
	const Recipes = sequelize.define('recipes', {
	  title: {
		  type: Sequelize.STRING
	  },
	  text: {
		  type: Sequelize.TEXT
	  },
	  picture: {
		  type: Sequelize.STRING
		}
	})

	return Recipes;
}