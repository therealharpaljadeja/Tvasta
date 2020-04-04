const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');


// Check if user is logged in if he is not then redirect to login page. 
const redirectLogin = (req, res, next) => {
	if(!req.session.userId){
		res.redirect('/login');
	} else {
		next();
	}
}


// Check if user is logged in if he is then redirect to home page.
const redirectHome = (req, res, next) => {
	if(req.session.userId){
		res.redirect('/')
	} else {
		next();
	}
}

const signUp = async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		gender: req.body.gender,
		dob: req.body.dob,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		password: req.body.password,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,	
	});
	req.session.userId = newUser.id;
	res.redirect('/');
}


const login = async (req, res, next) => {
	
	if(req.body.phoneNumber && req.body.password){
		const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
		const passwordCorrect = await user.comparePassword(req.body.password, user.password); 
		if(user){
			if(passwordCorrect){
				console.log(passwordCorrect);
				req.session.userId = user.id;
				res.redirect('/otp');	
			} 
			else {
				res.redirect('/login');
			}
		}
		else res.redirect('/login');
	} 
}

module.exports = {
	redirectLogin: redirectLogin,
	signUp: signUp,
	redirectHome: redirectHome,
	login: login
}