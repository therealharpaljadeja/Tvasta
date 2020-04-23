const Slot = require('./../models/slotModel.js');

const addSlot = async (req, res, next) => {
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
		hospital: hospital[0]
	});
	res.redirect('/schedule-appointment');	
}

module.exports = {
	addSlot: addSlot
}