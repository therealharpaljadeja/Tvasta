const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  	date : {type: Date},
    details : {type: String},
    doctor : {type : mongoose.Schema.ObjectId},
    status : {type: String}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;