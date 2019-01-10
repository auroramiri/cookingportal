const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	User.findOne({where:{ username: req.body.username }})
    .then(function (user) {
      if(!user){
        User.create({ 
          username: req.body.username, 
          password: bcrypt.hashSync(req.body.password, 8),
		  email: req.body.email,
		  role: 'user'
        })
        .then(function(user){
              var myToken = jwt.sign({ user: user.id },
                                      'secret',
                                     { expiresIn: 24 * 60 * 60 });
              res.send(200, {'token': myToken,
                             'userId':    user.id,
                             'username': user.username });
        });
      } else {
        res.status(404).json('Username already exist!');
      }
    })
    .catch(function (err) {
      res.send('Error creating user: ', err.message);
	});
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['username', 'email'],
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
	User.findOne({
		where: {id: req.userId},
		attributes: ['username', 'email', 'role'],
	}).then(user => {
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	})
}