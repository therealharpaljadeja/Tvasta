const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
	name: { type: String, required: true },
	listOfTreatment: { type: [String] },
	location: { type: String, required: true },
	beds: { type: Number },
	display_picture: { type: String },
	address: { type: String }

});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;