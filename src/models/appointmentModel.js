const mongoose = require('mongoose');
const Slot = require('./slotModel');

const appointmentSchema = new mongoose.Schema({
  	// slot: {
  	// 	type: mongoose.ObjectId,
  	// 	ref: 'Slot',
  	// 	required: true
  	// },
  	createdAt: {
  		type: Date,
  		default: Date.now()
  	},
  	user: {
  		type: mongoose.ObjectId,
  		ref: 'User',
  		required: true
  	},
  	patientName: String,
  	patientNumber: String,
  	patientEmail: String,
  	date: Date,
  	start: String,
  	end: String
});

// appointmentSchema.pre('save', function(next){
// 	const start = new Date();
// 	start.setHours(this.start.split(':')[0]);
// 	start.setMinutes(this.start.split(':')[1]);
// 	start.getTime() + this.inte

// })

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;