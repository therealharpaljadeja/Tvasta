const Appointment = require('./../models/appointmentModel');
const Doctor = require('./../models/doctorModel');


const loadingDataOnAppointmentPage = async (req, res, next) => {
	const doctor = await Doctor.findOne({ _id: req.params.id });
	console.log(doctor);
	const slot = {
		hour: req.query.hour,
		min: req.query.min,
		mode: req.query.mode
	};
	console.log(slot);
	res.render('views/appointment.ejs', { session: req.session, doctor: doctor, slot: slot });
}

module.exports = {
	loadingDataOnAppointmentPage: loadingDataOnAppointmentPage
}