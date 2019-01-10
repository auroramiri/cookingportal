module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
	  username: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  password: {
		  type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING
		},
		//status: {
			//type: Sequelize.ENUM('active', 'inactive'),
			//defaultValue: 'active'
	//}
	});
	
	return User;
}