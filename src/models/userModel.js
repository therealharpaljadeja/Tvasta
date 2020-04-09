const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Every user must have a name.']
	},
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Other'],
		required: [true, 'Every user must have a gender.']
	},
	dob: {
		type: Date,
		required: [true, 'Every user must have a DOB']
	},
	phoneNumber: {
		type: Number,
		required: [true, 'Every user must have a phone number'],
		unique: true
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Every user must have a email address']
	},
	password: {
		type: String,
		required: [true, 'Every user must have a password.']
	},
	city: {
		type: String,
		// required: [true, 'Every user must provide a city name']
	},
	state: {
		type: String,
		// required: [true, 'Every user must provide a state name']
	},
	country: {
		type: String,
		// required: [true, 'Every user must provide a country name']
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user'
	}
});


userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.comparePassword = async function(hashedPassword, enteredPassword) {
	return await bcrypt.compare(hashedPassword, enteredPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;