const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
	start: String,
	end: String,
	interval: Number,
	day: {
		type: String, 
		enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	},
	doctor: {
		type: mongoose.ObjectId,
		ref: 'Doctor',
	},
	updatedAt: Date
});


const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;