const express = require('express');
const authenticationController = require('./../controllers/authenticationController');

const router = express.Router();

router
	.route('/')
	.get(authenticationController.redirectLogin, authenticationController.checkAdmin, (req, res) => {
		res.render('views/dashboard.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
	});

router
	.route('/doctors')
	.get(authenticationController.redirectLogin, authenticationController.checkAdmin, (req, res) => {
		res.render('views/dashboard_doctors.ejs', {session: req.session});
	});

module.exports = router;