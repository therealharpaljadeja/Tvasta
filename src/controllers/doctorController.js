const Doctor = require('./../models/doctorModel');


// const getAllDoctors = async (req, res, next) => {
// 	const doctors = await Doctor.find(req.query);
// 	console.log(req.query);
// 	console.log('getAllDoctors');
// 	res.locals.doctors = doctors;
// 	next();
// }

const getAllDoctors = async (req, res, next) => {
	let experience = req.query.experience;
    if(experience && experience instanceof Array) {
        experience = experience.map(e => Number(e));
        experience = Math.min(...experience);
    }
    console.log({ role : "doctor", ...req.query, experience: { $gte : experience || 0 }});
    
    const doctors = await Doctor.find({...req.query, experience: { $gte : experience || 0 }});       
    res.locals.doctors = doctors;
    next();
}

const filterDoctor = async (req, res, next) => {
	const doctors = await Doctor.find(req.query);
	res.locals.doctors = doctors;
	next();
}

module.exports = {
	getAllDoctors: getAllDoctors,
}