const Appointment = require('./../models/appointmentModel');
const Doctor = require('./../models/doctorModel').Doctor;


const loadingDataOnAppointmentPage = async (req, res, next) => {
	const doctor = await Doctor.findOne({ _id: req.params.id });
	console.log(doctor);
	const slot = {
		hour: req.query.hour,
		min: req.query.min,
		mode: req.query.mode,
		date: req.query.date
	};
	console.log(slot);
	res.render('views/appointment.ejs', { session: req.session, doctor: doctor, slot: slot });
}

const createAppointment = (req, res, next) => {
	// if(req.body.)
}

module.exports = {
	loadingDataOnAppointmentPage: loadingDataOnAppointmentPage,
	createAppointment: createAppointment
}