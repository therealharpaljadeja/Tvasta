const Appointment = require('./../models/appointmentModel');
const Doctor = require('./../models/doctorModel').Doctor;
const User = require('./../models/userModel.js');
const Slot = require('./../models/slotModel.js');
const Mongoose = require('mongoose')
// const Appointment = require('./../models/appointmentModel.js');


const loadingDataOnAppointmentPage = async (req, res, next) => {
	// const slots = await Slot.find({ doctor : req.params.id });
	const doctor = await User.findOne({ _id: req.params.id });

	let slot = await Slot.aggregate([
		{
			$match : {
				doctor: Mongoose.Types.ObjectId(req.params.id)
			},	
		},
		{
			$unwind: '$subSlots' 
		},
		{
			$match: {
				'subSlots._id': Mongoose.Types.ObjectId(req.query.slot)
			}
		},
		{
			$limit: 1
		}

	]);
	slot = slot[0];
	console.log(doctor);
	console.log(slot);
	// console.log(subSlot);
	res.render('views/appointment.ejs', { session: req.session, doctor: doctor, slot: slot, date: req.query.date });
}

const createAppointment = async (req, res, next) => {
	await Slot.findOneAndUpdate({
		subSlots: { $elemMatch: { _id: Mongoose.Types.ObjectId(req.params.id) } }
	},{ 'subSlots.$.isBooked': true });
	// subslot.isBooked = true;
	const newAppointment = await Appointment.create({
		slot: req.params.id,
		user: req.session.user._id,
		appointmentDate: new Date(req.query.date)
	});
	// subslot.save();
	req.session.error = 'Appointment Successfully Booked!';
	req.session.errorType = 'Success';
	res.redirect('/');
}

const getUserAppointments = async (req, res, next) => {
	const appointments = await Appointment.find({ user: req.session.user._id });
	var slots = [];
	var doctors = [];
	for await(let appointment of appointments){
		// slots = await Slot.findOne({ subSlots: { $elemMatch: { _id: Mongoose.Types.ObjectId(appointment.slot) } } }); 
		subslot = await Slot.aggregate([
			{
				$unwind: '$subSlots'
			},
			{
				$match: { 'subSlots._id': Mongoose.Types.ObjectId(appointment.slot) }
			}
		]);
		slots.push(subslot[0]);
	}
	for await(let subslot of slots){
		doctor = await User.findOne({ _id: Mongoose.Types.ObjectId(subslot.doctor) });
		doctors.push(doctor);
	}
	console.log('getUserAppointments');
	console.log(slots);
	console.log(appointments);
	console.log(doctors);
	res.locals.appointments = appointments;
	res.locals.slots = slots;
	res.locals.doctors = doctors;
	next();
}

const getAppointmentToDoctorDashboard = async (req, res, next) => {
	// console.log(req.session.user);
	// const doctor = await User.findOne({ _id: req.session.user.id });
	// await doctor.populate('slots').execPopulate();
	// console.log(doctor);
	const subslots = await User.aggregate([
		{
			$match: { _id: Mongoose.Types.ObjectId(req.session.user.id) }
		},
		
		{
			$lookup: {
				from: 'slots',
				localField: '_id',
				foreignField: 'doctor',
				as: 'slots'

			}
		},
		{
			$unwind: '$slots'
		},
		{
			$unwind: '$slots.subSlots'
		},
		{
			$match: { 'slots.subSlots.isBooked' : true }
		}
	]);
	console.log(subslots);
	const bookedAppointments = [];
	const patients = [];
	for (let i = 0; i < subslots.length; i++){
		console.log(subslots[i]);
		let appointment = await Appointment.findOne({ slot: Mongoose.Types.ObjectId(subslots[i].slots.subSlots._id) });
		bookedAppointments.push(appointment);
	}
	console.log(bookedAppointments);
	for(let i = 0; i < bookedAppointments.length; i++){
		let user = await User.findOne({ _id: Mongoose.Types.ObjectId(bookedAppointments[i].user) });
		patients.push(user);
	}
	console.log(patients);
	res.locals.appointments = bookedAppointments;
	res.locals.bookedSlots = subslots;
	res.locals.patients = patients;
	next();
}

const getAppointmentToAdminDashboard = async (req, res, next) => {
	const appointments = await Appointment.find();
	// const doctors = [];
	const patients = [];
	const doctors = [];
	for (let i = 0; i < appointments.length; i++){
		let user = await User.findOne({ _id: appointments[i].user });
		patients.push(user);
		let doctor = await User.aggregate([
			{
				$lookup: {
					from: 'slots',
					localField: '_id',
					foreignField: 'doctor',
					as: 'slots'
				}
			},
			{
				$unwind: '$slots'
			},
			{
				$unwind: '$slots.subSlots'
			},
			{
				$match: { 'slots.subSlots._id': appointments[i].slot }
			}
		]);
		doctor = doctor[0];
		doctors.push(doctor);
	}
	console.log(patients);
	console.log(doctors);
	console.log(appointments);

	res.locals.subslots = doctors;
	res.locals.patients = patients;
	res.locals.appointments = appointments;
	next();
}

module.exports = {
	loadingDataOnAppointmentPage: loadingDataOnAppointmentPage,
	createAppointment: createAppointment,
	getUserAppointments: getUserAppointments,
	getAppointmentToDoctorDashboard: getAppointmentToDoctorDashboard,
	getAppointmentToAdminDashboard: getAppointmentToAdminDashboard
}