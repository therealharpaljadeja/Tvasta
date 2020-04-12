const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const authenticationController = require('./controllers/authenticationController');
const User = require('./models/userModel');


// Middlewares
app = express();
app.use(express.json());

app.use(session({
	secret: 'TvastraApp',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: true,
		secure: false
	}
}));

app.use(express.urlencoded( {extended: true} ));
app.set('views', __dirname); 
app.use(express.static(path.join(__dirname)));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.get('/admin', authenticationController.redirectLogin, authenticationController.checkAdmin, (req, res) => {
	res.render('views/dashboard.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
});

app.get('/admin-doctors', authenticationController.redirectLogin, authenticationController.checkAdmin, (req, res) => {
	res.render('views/dashboard_doctors.ejs', {session: req.session, doctors: dev_data_json.doctors});
});

app.get('/', authenticationController.redirectLogin2, authenticationController.redirectAdmin, (req, res) => {
	res.render('views/index.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
});

const dev_data_string = fs.readFileSync('dev_data.json').toString();
const dev_data_json = JSON.parse(dev_data_string);

app.put('/disable-error', authenticationController.clearError);

app.get('/doctors', authenticationController.redirectLogin, (req, res) => {
	res.render('views/doctor.ejs', {doctors : dev_data_json.doctors, session: req.session});
});

app.get('/hospitals', authenticationController.redirectLogin, (req, res) => {
	res.render('views/hospital.ejs', {hospital : dev_data_json.hospitals, session: req.session});
});

app.get('/about', authenticationController.redirectLogin, (req, res) => {
	res.render('views/about.ejs', {session: req.session});
});

app.get('/treatments', authenticationController.redirectLogin, (req, res) => {
	res.render('views/treatments.ejs', {session: req.session});
});

app.get('/email-login', authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('views/email-login.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType });
});

app.post('/email-login', authenticationController.redirectToRespectiveHome, authenticationController.emailLogin);


app.get('/phone-login', authenticationController.checkCancel, authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('views/phone-login.ejs', {error: req.session.error || '', session: req.session, errorType: req.session.errorType});
	req.session.error = "";
});

app.post('/phone-login', authenticationController.redirectToRespectiveHome, authenticationController.phoneLogin);


app.get('/signup', authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('views/signup.ejs', {session: req.session});
});


app.post('/signup', authenticationController.redirectToRespectiveHome, authenticationController.signUp);
 
app.get('/otp', (req, res) => {
	res.render('views/otp.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType});
})

app.post('/otp', authenticationController.checkOTP, authenticationController.redirectToRespectiveHome);

app.put('/resend-otp', authenticationController.cancelOldOTP);


app.post('/forgot-password', authenticationController.checkIfUserExists, authenticationController.phoneLogin)

app.get('/create-new-password', authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('views/create_new_password.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType});
})

app.post('/create-new-password', authenticationController.changePassword);

app.get('/contact-us', authenticationController.redirectLogin, (req, res) => {
	res.render('views/contactus.ejs', {session: req.session});
});


app.get('/hospital-details', (req, res) => {
	res.render('views/hospital_details.ejs', {session: req.session});
});


app.get('/doctor-details', (req, res) => {
	res.render('views/doctor_details.ejs', {session: req.session});
});

app.get('/faq', (req, res) => {
	res.render('views/faq.ejs', {session: req.session});
});

app.get('/tvastra-plus', authenticationController.redirectAdmin ,(req, res) => {
	res.render('views/tvastra-plus.ejs', {session: req.session});
});

app.get('/submit-your-query', (req, res) => {
	res.render('views/submit_your_query.ejs', {session: req.session});
});

app.get('/book-an-appointment', (req, res) => {
	res.render('views/bookappointment.ejs', {session: req.session});
});

app.get('/get-a-quote', authenticationController.redirectLogin, (req, res) => {
	res.render('views/get-a-quote.ejs', {session: req.session});
})

app.get('/edit-profile', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('views/user_dashboard.ejs', {session: req.session});
})

app.get('/user-dashboard-appointments', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('views/user_dashboard_appointments.ejs', {session: req.session});
})

app.get('/user-dashboard-lab-tests', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('views/user_dashboard_lab_tests.ejs', {session: req.session});
})

app.get('/logout', authenticationController.logout);

module.exports = app;


