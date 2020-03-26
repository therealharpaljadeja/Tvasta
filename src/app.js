const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
app = express();
app.set('views', __dirname);
app.use(express.static(path.join(__dirname)));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('views/index.html');
});

const dev_data_string = fs.readFileSync('dev_data.json').toString();
const dev_data_json = JSON.parse(dev_data_string);


app.get('/doctors', (req, res) => {
	res.render('views/doctor.ejs', doctors = dev_data_json.doctors);
})

app.get('/hospitals', (req, res) => {
	res.render('views/hospital.ejs', hospital = dev_data_json.hospitals);
})

module.exports = app;


