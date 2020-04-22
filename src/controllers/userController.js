const User = require('./../models/userModel');
const multer = require('multer');
const path = require('path');
const Hospital = require('./../models/hospitalModel');
const Doctor = require('./../models/doctorModel');
// File Storage
const userFileStorage = multer.diskStorage({
	destination: 'public/uploads/users',
	filename: function(req, file, callback){
		callback(null, `${req.session.user._id}${path.extname(file.originalname)}`);
	}
})

const doctorFileStorage = multer.diskStorage({
    destination: 'public/uploads/doctors',
    filename: function(req, file, callback){
        callback(null, `${req.session.user.phoneNumber}${path.extname(file.originalname)}`);
    }
})


// Init Upload
const uploadUser = multer({
	storage: userFileStorage,
	limits: {fileSize: 1000000},
}).single('display_picture');


const uploadDoctor = multer({
    storage: doctorFileStorage,
    limits: {fileSize: 1000000},
}).single('display_picture');


const addDoctorDetails = (req, res, next) => {
	uploadDoctor(req, res, async(err) => {
		if(err){
			req.session.error = err;
			req.session.errorType = 'Failure';
			res.redirect('/');
		} else {
			console.log(req.body);
			console.log(req.file);
			// let hospitals = req.body.hospitalList.slice(1,req.body.hospitalList.length - 1).split(',');
            let achievementList = req.body.achievements.slice(1,req.body.achievements.length - 1).split(',');
            let qualificationList = req.body.qualifications.slice(1,req.body.qualifications.length - 1).split(',');
            let awardsList = req.body.awards.slice(1,req.body.awards.length - 1).split(',');
            let specializationsList = req.body.specializations.slice(1,req.body.specializations.length - 1).split(',');
            // let slotDurationString = req.body.slotDuration.slice(1,req.body.slotDuration.length - 1).split(',');
            // let hospitalList = [];
            let achievements = [];
            let qualifications = [];
            let awards = [];
            let specializations = [];
            // let slotDuration = '';
            // if(req.body.hospitalList){
            //     for(let i = 0; i < hospitals.length; i++){
            //         value = JSON.parse(hospitals[i]).value;
            //         let hospital = await Hospital.findOne({ name: value }, { _id: 1 });
            //         let id = hospital.id;
            //         console.log(hospital);
            //         console.log(id);
            //         hospitalList.push(id);
            //     }    
            // }
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
            const user = await User.findOne({ _id: req.session.user._id });
            user.display_picture = '/' + req.file.path;
            user.doctor = {
            	description: req.body.description,
            	achievements: achievements,
            	experience: req.body.experience,
            	qualifications: qualifications,
            	awards: awards,
            	specializations: specializations,
            	avg_fees: req.body.averageFees,
            	// hospitalList: hospitalList
            }
            // user.doctor.description = req.body.description;
            // user.doctor.achievements = achievements;
            // user.doctor.experience = experience;
            // user.doctor.qualifications = qualifications;
            // user.doctor.awards = awards;
            // user.doctor.specializations = specializations;
            // user.doctor.avg_fees = averageFees;
            // user.doctor.hospitalList = hospitalList;
            // user.display_picture = req.file.path;
            user.save();
            // user.doctor.hospitalList.populate({
            //     path: 'hospitalList'
            // }); 
            req.session.user = user;
            console.log(req.session);
            req.session.error = 'Doctor Successfully Registered';
            req.session.errorType = 'Success';
            res.redirect('/');
		}
	})
}


const editProfile = (req, res, next) => {
	uploadUser(req, res, async (err) => {
		if(err) {
			req.session.error = err;
			req.session.errorType = 'Failure';
			res.redirect('/edit-profile');
		} else {
			console.log(req.body);
			const user = await User.findOne({ email: req.session.user.email });
			user.display_picture = req.file === undefined ? req.session.user.display_picture : '/' + req.file.path;
			user.name = req.body.name;
			user.phoneNumber = req.body.phoneNumber;
			user.email = req.body.email;
			user.gender = req.body.gender;
			user.dob = req.body.dob;
			user.bloodGroup = req.body.bloodGroup;
			user.timeZone = req.body.timeZone;
			user.state = req.body.state;
			user.country = req.body.country;
            user.location = req.body.city;
            if(user.role === 'doctor'){
                let achievementList = req.body.achievements.slice(1,req.body.achievements.length - 1).split(',');
                let qualificationList = req.body.qualifications.slice(1,req.body.qualifications.length - 1).split(',');
                let awardsList = req.body.awards.slice(1,req.body.awards.length - 1).split(',');
                let specializationsList = req.body.specializations.slice(1,req.body.specializations.length - 1).split(',');
                
                let achievements = [];
                let qualifications = [];
                let awards = [];
                let specializations = [];

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

                user.doctor = {
                    description: req.body.description,
                    achievements: achievements,
                    experience: req.body.experience,
                    qualifications: qualifications,
                    awards: awards,
                    specializations: specializations,
                    avg_fees: req.body.averageFees,
                }
                await user.save();
                req.session.user = user;
                console.log(req.session.user);
                req.session.error = 'Profile Updated';
                req.session.errorType = 'Success';
                res.redirect('/edit-profile-doctor');
            } else {
                await user.save();
                req.session.user = user;
                console.log(req.session.user);
                req.session.error = 'Profile Updated';
                req.session.errorType = 'Success';
                res.redirect('/edit-profile');   
            }
		}
	})
}

module.exports = {
	editProfile: editProfile,
	addDoctorDetails: addDoctorDetails
}