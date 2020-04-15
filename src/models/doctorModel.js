const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: ['true', 'Every Doctor must have a name']
	},
	gender: {
		type: String,
		// required: ['true', 'Every Doctor must have a gender'];
	},
	achievements: [String],
	experience: Number,
	hospital: String,
	location: String,
	display_picture: String
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;