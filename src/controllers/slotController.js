const Slot = require('./../models/slotModel.js');

const addSlot = async (req, res, next) => {
	const allSlots = await Slot.find({ 
		$and: [
			{
				doctor: req.session.user._id
			},
			{
				holiday: false
			},
			{
				isDisabled: false
			}
		]
	});
	if(allSlots.length){
		const valid = await isValidateSlot(allSlots, req.body);
		console.log(valid);
		if(valid){
			let intervalString = req.body.interval.slice(1,req.body.interval.length - 1).split(',');
			let interval = [];
			let hospitals = req.body.hospital.slice(1,req.body.hospital.length - 1).split(',');
			let hospital = [];
			for(let i = 0; i < hospitals.length; i++){
		        value = JSON.parse(hospitals[i]).value;
		        hospital.push(value);
		    }
			for(let i = 0; i < intervalString.length; i++){
		        value = JSON.parse(intervalString[i]).value;
		        interval.push(value);
		    }
			console.log(req.body);
			const slot = await Slot.create({
				startTime: req.body.startTime,
				endTime: req.body.endTime,
				day: req.body.day,
				interval: parseInt(interval[0]),
				hospital: hospital[0],
				holiday: req.body.holiday ? true : false,
				doctor: req.session.user._id
			});
			req.session.error = 'Slot Succesfully Added';
			req.session.errorType = 'Success';
			res.redirect('/schedule-appointment');		
		} else {
			req.session.error = "Time Overlap";
			req.session.errorType = 'Failure';
			res.redirect('/schedule-appointment');
		}
	} else {
		let intervalString = req.body.interval.slice(1,req.body.interval.length - 1).split(',');
		let interval = [];
		let hospitals = req.body.hospital.slice(1,req.body.hospital.length - 1).split(',');
		let hospital = [];
		for(let i = 0; i < hospitals.length; i++){
	        value = JSON.parse(hospitals[i]).value;
	        hospital.push(value);
	    }
		for(let i = 0; i < intervalString.length; i++){
	        value = JSON.parse(intervalString[i]).value;
	        interval.push(value);
	    }
		console.log(req.body);
		const slot = await Slot.create({
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			day: req.body.day,
			interval: parseInt(interval[0]),
			hospital: hospital[0],
			holiday: req.body.holiday ? true : false,
			doctor: req.session.user._id
		});
		req.session.error = 'Slot Succesfully Added';
		req.session.errorType = 'Success';
		res.redirect('/schedule-appointment');
	}
	
	
		
}

const isValidateSlot = async (slots, slot) => {
	for(let i = 0; i < slots.length; i++){
		console.log(slots[i].day.toLowerCase(),slot.day)
		if(slots[i].day.toLowerCase() === slot.day){
			console.log(slots[i].startTime > slot.startTime, slots[i].startTime > slot.startTime);
			if(slots[i].startTime > slot.startTime && slots[i].endTime < slot.endTime){
				return false;
			} else {
				if(slots[i].startTime > slot.startTime && slots[i].endTime > slot.endTime && slots[i].startTime < slot.endTime){
					return false;
				} else {
					if(slots[i].startTime < slot.startTime && slots[i].endTime > slot.startTime && slots[i].endTime < slot.endTime){
						return false;
					} else {
						return true;
					}
				}
			}
		} else {
			return true;
		}
	}
}

const getSlotsBasedOnDoctor = async (req, res, next) => {
	res.locals.slots = await Slot.find({ 
		$and: [
			{
				doctor: req.session.user._id
			},
			{
				holiday: false
			}
		]
		 
	});
	next();
}

module.exports = {
	addSlot: addSlot,
	getSlotsBasedOnDoctor: getSlotsBasedOnDoctor
}