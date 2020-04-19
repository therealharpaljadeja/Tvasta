const Doctor = require('./../models/doctorModel');
const Hospital = require('./../models/hospitalModel');
const multer = require('multer');
const path = require('path');
// const getAllDoctors = async (req, res, next) => {
// 	const doctors = await Doctor.find(req.query);
// 	console.log(req.query);
// 	console.log('getAllDoctors');
// 	res.locals.doctors = doctors;
// 	next();
// }
const doctorFileStorage = multer.diskStorage({
    destination: 'public/uploads/doctors',
    filename: function(req, file, callback){
        callback(null, `${req.body.phoneNumber}${path.extname(file.originalname)}`);
    }
})

const uploadDoctor = multer({
    storage: doctorFileStorage,
    limits: {fileSize: 1000000},
}).single('display_picture');


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

const addDoctor = async (req, res, next) => {
    uploadDoctor(req, res, async(err) => {
        if(err){
            req.session.error = err;
            req.session.errorType = 'Failure';
            res.redirect('/add-doctors');
        } else {
            console.log(req.file);
            let hospitals = req.body.hospitalList.slice(1,req.body.hospitalList.length - 1).split(',');
            let achievementList = req.body.achievements.slice(1,req.body.achievements.length - 1).split(',');
            let qualificationList = req.body.qualifications.slice(1,req.body.qualifications.length - 1).split(',');
            let awardsList = req.body.awards.slice(1,req.body.awards.length - 1).split(',');
            let specializationsList = req.body.specializations.slice(1,req.body.specializations.length - 1).split(',');
            let slotDurationString = req.body.slotDuration.slice(1,req.body.slotDuration.length - 1).split(',');
            let hospitalList = [];
            let achievements = [];
            let qualifications = [];
            let awards = [];
            let specializations = [];
            let slotDuration = '';
            if(req.body.hospitalList){
                for(let i = 0; i < hospitals.length; i++){
                    value = JSON.parse(hospitals[i]).value;
                    let hospital = await Hospital.findOne({ name: value }, { _id: 1 });
                    let id = hospital.id;
                    console.log(hospital);
                    console.log(id);
                    hospitalList.push(id);
                }    
            }
            for(let i = 0; i < achievementList.length; i++){
                value = JSON.parse(achievementList[i]).value;
                achievements.push(value);
            }
            if(req.body.awards){
                for(let i = 0; i < awardsList.length; i++){
                    value = JSON.parse(awardsList[i]).value;
                    awards.push(value);
                }    
            }
            for(let i = 0; i < qualificationList.length; i++){
                value = JSON.parse(qualificationList[i]).value;
                qualifications.push(value);
            }
            for(let i = 0; i < specializationsList.length; i++){
                value = JSON.parse(specializationsList[i]).value;
                specializations.push(value);
            }
            for(let i = 0; i < slotDurationString.length; i++){
                slotDuration = JSON.parse(slotDurationString[i]).value.split(' ')[0];
            }
            console.log(slotDuration);
            const newDoctor = Doctor.create({
                name: req.body.name,
                gender: req.body.gender,
                achievements: achievements,
                experience: req.body.experience,
                location: req.body.location,
                display_picture: req.file.path,
                description: req.body.description,
                email: req.body.email,
                password: req.body.password,
                mobile: req.body.phoneNumber,
                specializations: specializations,
                qualifications: qualifications,
                awards: awards,
                avg_fees: req.body.averageFees,
                hospitalList: hospitalList,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                slotDuration: slotDuration
            });
            req.session.error = 'Doctor Registered Succesfully!';
            req.session.errorType = 'Success';
            res.redirect('/add-doctors');
        }
    })
}

const deleteDoctor = async (req, res, next) => {
    await Doctor.remove({ _id: req.params.id });
    res.redirect('/admin-doctors');
}

module.exports = {
	getAllDoctors: getAllDoctors,
    addDoctor: addDoctor,
    deleteDoctor: deleteDoctor
}