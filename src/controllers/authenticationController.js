const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const Nexmo = require('nexmo');
require('dotenv').config( { path: __dirname + '/../config.env' } );


// Nexmo used for OTP.
const nexmo = new Nexmo({
	apiKey: process.env.NEXMO_API_KEY,
	apiSecret: process.env.NEXMO_API_SECRET
});

// Check if user is logged in if he is not then redirect to login page. 
const redirectLogin = (req, res, next) => {
	if(!req.session.userId){
		res.redirect('/phone-login');
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

const emailLogin = async (req, res, next) => {
	if(req.body.email && req.body.password){
		const user = await User.findOne({ email: req.body.email });
		const passwordCorrect = await user.comparePassword(req.body.password, user.password);
		if(user){
			if(passwordCorrect){
				req.session.userId = user.id;
				req.user = user;
				res.redirect('/');
			}
		} else {
			res.redirect('/email-login');
		}
	}
}

const phoneLogin = async (req, res, next) => {
	
	if(req.body.phoneNumber){
		const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
		// const passwordCorrect = await user.comparePassword(req.body.password, user.password); 
		const nexmoRequestOTPCallback = (err, result) => {
			if(err) console.log(err);
			else{
				req.session.request_id = result.request_id;
				console.log(req.session);
				req.session.user = user;
				res.redirect('/otp');	
			}
		}
		if(user){
				nexmo.verify.request({
					number: '91' + req.body.phoneNumber,
					brand: 'Tvastra',
					code_length: '4',
					workflow_id: '6',
					pin_expiry: '60'
				}, nexmoRequestOTPCallback);
				// console.log('91' + req.body.phoneNumber);
		} else {
			res.redirect('/phone-login');
		}
	} else res.redirect('/phone-login');
}

// This function requests OTP for the user number from nexmo.
const checkOTP = async (req, res, next) => {
	const nexmoVerifyCallback = (err, result) => {
		if(err) console.log(err);
		else {
			req.session.userId = req.session.user._id;
			req.session.request_id = null;
			req.session.save();
			console.log(req.session);
			next();
		}

	}

	if(req.body.otp.length === 4){
		nexmo.verify.check({
			request_id: req.session.request_id,
			code: req.body.otp
		}, nexmoVerifyCallback);	
	} else {
		res.redirect('/otp');
	}
}


const checkCancel = (req, res, next) => {
	if(req.session.request_id) res.redirect('/otp');
	next();
}

module.exports = {
	redirectLogin: redirectLogin,
	signUp: signUp,
	redirectHome: redirectHome,
	phoneLogin: phoneLogin,
	emailLogin: emailLogin,
	checkOTP: checkOTP,
	checkCancel: checkCancel
}