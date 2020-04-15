const Hospital = require('./../models/hospitalModel.js');


// const getAllDoctors = async (req, res, next) => {
// 	const doctors = await Doctor.find(req.query);
// 	console.log(req.query);
// 	console.log('getAllDoctors');
// 	res.locals.doctors = doctors;
// 	next();
// }

const getAllHospitals = async (req, res, next) => {
	let beds = req.query.beds;
    let treatments = req.query.treatment;
    if(beds && beds instanceof Array) {
        beds = beds.map(e => Number(e));
        beds = Math.min(...beds);
    }
    // console.log({ role : "doctor", ...req.query, beds: { $gte : beds || 0 }});
    console.log(req.query);
    if(treatments) {
        if(typeof(treatments) == 'string'){
            treatments  = [];
            treatments.push(req.query.treatment);
            console.log(treatments);
            const hospitals = await Hospital.find({...req.query, beds: { $gte : beds || 0 },  listOfTreatment: { $in: treatments } });
            res.locals.hospitals = hospitals;
            console.log(hospitals); 
        } else {
            const hospitals = await Hospital.find({...req.query, beds: { $gte : beds || 0 }, listOfTreatment: { $in: treatments }});
            res.locals.hospitals = hospitals;
        }  
    } else {
        const hospitals = await Hospital.find({...req.query, beds: { $gte : beds || 0 }});
        res.locals.hospitals = hospitals; 
    }
    next();
}



module.exports = {
	getAllHospitals: getAllHospitals,
}