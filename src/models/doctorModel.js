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
	display_picture: String,
	description: String,
	email: { type: String },
	mobile: { type: Number },
	specializations: { type: [String] },
	qualifications: { type: [String] },
	awards: { type: [String] },
	avg_fees: { type: Number },
	hospitalList: { type: [mongoose.Schema.ObjectId] }
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;