const fs = require('fs');
const dev_data_string = fs.readFileSync('dev_data.json').toString();
const dev_data_json = JSON.parse(dev_data_string);
const Doctor = require('./models/doctorModel.js');
const Hospital = require('./models/hospitalModel.js');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoose = require('mongoose');

console.log(process.env);


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
// const DB = 'mongodb://localhost:27017/myapp';

mongoose
.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
.then(() => {console.log('DB Connection Established')});



// console.log(dev_data_json);
const importData = async () => {
	console.log(dev_data_json.hospitals);
	await Hospital.create(dev_data_json.hospitals);
	console.log('Data Loaded');
}

importData();

const deleteData = async () => {
	await Hospital.deleteMany();
	console.log('Doctors deleted');
}

// deleteData();