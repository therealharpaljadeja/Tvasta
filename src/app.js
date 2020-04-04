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
		maxAge: 1000 * 60 * 60 * 24 * 90,
		sameSite: true,
		secure: false
	}
}));

app.use(express.urlencoded( {extended: true} ));
app.set('views', __dirname); 
app.use(express.static(path.join(__dirname)));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.get('/', authenticationController.redirectLogin, (req, res) => {
	res.render('views/index.ejs');
});

const dev_data_string = fs.readFileSync('dev_data.json').toString();
const dev_data_json = JSON.parse(dev_data_string);


app.get('/doctors', (req, res) => {
	res.render('views/doctor.ejs', doctors = dev_data_json.doctors);
});

app.get('/hospitals', (req, res) => {
	res.render('views/hospital.ejs', hospital = dev_data_json.hospitals);
});

app.get('/about', (req, res) => {
	res.render('views/about.ejs');
});

app.get('/treatments', (req, res) => {
	res.render('views/treatments.ejs');
});

app.get('/login', authenticationController.redirectHome ,(req, res) => {
	res.render('views/login.ejs');
});

app.post('/login', authenticationController.redirectHome, authenticationController.login);


app.get('/signup', authenticationController.redirectHome, (req, res) => {
	res.render('views/signup.ejs');
});


app.post('/signup', authenticationController.redirectHome, authenticationController.signUp);

app.get('/otp', (req, res) => {
	res.render('views/otp.ejs');
})

app.post('/otp', (req, res) => {
	res.redirect('/');
})

app.get('/contact-us', (req, res) => {
	res.render('views/contactus.ejs');
});


app.get('/hospital-details', (req, res) => {
	res.render('views/hospital_details.ejs');
});


app.get('/doctor-details', (req, res) => {
	res.render('views/doctor_details.ejs');
});

app.get('/faq', (req, res) => {
	res.render('views/faq.ejs');
});

app.get('/tvastra-plus', (req, res) => {
	res.render('views/tvastra-plus.ejs');
});

app.get('/submit-your-query', (req, res) => {
	res.render('views/submit_your_query.ejs');
});

app.get('/book-an-appointment', (req, res) => {
	res.render('views/bookappointment.ejs');
});

module.exports = app;


