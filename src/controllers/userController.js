const User = require('./../models/userModel');
const multer = require('multer');
const path = require('path');


// File Storage
const fileStorage = multer.diskStorage({
	destination: 'public/uploads/',
	filename: function(req, file, callback){
		callback(null, `${req.session.user.name}'s Profile Picture${path.extname(file.originalname)}`);
	}
})

// Init Upload
const upload = multer({
	storage: fileStorage,
	limits: {fileSize: 1000000},
}).single('display_picture');


const editProfile = (req, res, next) => {
	upload(req, res, async (err) => {
		if(err) {
			req.session.error = err;
			req.session.errorType = 'Failure';
			res.redirect('/edit-profile');
		} else {
			console.log(req.body);
			const user = await User.findOne({ email: req.session.user.email });
			user.display_picture = req.file === undefined ? req.session.user.display_picture : req.file.path;
			user.name = req.body.name;
			user.phoneNumber = req.body.phoneNumber;
			user.email = req.body.email;
			user.gender = req.body.gender;
			user.dob = req.body.dob;
			user.bloodGroup = req.body.bloodGroup;
			user.timeZone = req.body.timeZone;
			user.city = req.body.city;
			user.state = req.body.state;
			user.country = req.body.country;
			user.editMode
			console.log(req.file);
			console.log(user.password);
			await user.save();
			req.session.user = user;
			req.session.error = 'Profile Updated';
			req.session.errorType = 'Success';
			res.redirect('/edit-profile');
		}
	})
}

module.exports = {
	editProfile: editProfile
}