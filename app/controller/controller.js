const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	User.findOne({ 
		where: {
			email: req.body.email
		} 
	}).then(user => {
		if(user){
			res.json("Fail -> Email is already in use!");
			return;
		}
		else{	
		User.findOne({where:{ username: req.body.username }})
    .then(user =>{
      if(!user){
        User.create({ 
        	username: req.body.username, 
        	password: bcrypt.hashSync(req.body.password, 8),
			email: req.body.email,
			roleId: req.body.roleId
		}),
		res.send("User registered successfully!");
        }else {
			res.json('Username already exist!');
			return;
				} 
}
	)
	}}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
		return;
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}
		else{
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({  accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		let isAdmin
		if(user.roleId == 1){
			isAdmin = true
		}else{
			isAdmin = false
		}

		res.status(200).send( {accessToken: token, isAdmin });
	}
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "User Content Page",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access User Page",
			"error": err
		});
	})
}

exports.adminBoard = (req, res) => {
	User.findAll({ attributes: ['username', 'email']}).then(users =>{
		res.status(200).json({
			"description":"Admin board",
			"users":users
		 });
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	});
}
