const mongoose = require('mongoose');
const subSlotSchema = require('./subSlotModel.js').subSlotSchema;
const subSlot = require('./subSlotModel.js').subSlot;

const slotSchema = new mongoose.Schema({
	startTime: String,
	endTime: String,
	interval: Number,
	day: {
		type: String, 
		enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
	},
	doctor: {
		type: mongoose.ObjectId,
		ref: 'Doctor',
	},
	hospital: String,
	subSlots: [subSlotSchema]
},{ timestamps: true });


slotSchema.pre('save',async function(next){
	const start = new Date();
	start.setHours(parseInt(this.startTime.split(':')[0]));
	start.setMinutes(parseInt(this.startTime.split(':')[1]));
	const end = new Date();
	end.setHours(parseInt(this.endTime.split(':')[0]));
	end.setMinutes(parseInt(this.endTime.split(':')[1]));
	
	const slots = [];
	const slotsWithDate = [];
	async function generateSlots(start, end, interval){
		let startTime = start.getTime();
		let endTime = end.getTime();
		let duration = parseInt(interval) * 60 * 1000;
		let slotEndTime = start.getTime();
		console.log(start);
		console.log(end);
		console.log(startTime);
		console.log(endTime);
		console.log(duration);
		while(startTime < endTime){
			slotEndTime += duration;
			let startDate = new Date(startTime);
			let endDate = new Date(slotEndTime);
			slot = [`${startDate.toLocaleString().split(', ')[1].split(':')[0]}:${startDate.toLocaleString().split(', ')[1].split(':')[1]} ${startDate.toLocaleString().split(', ')[1].split(':')[2].split(' ')[1]}`,`${endDate.toLocaleString().split(', ')[1].split(':')[0]}:${endDate.toLocaleString().split(', ')[1].split(':')[1]} ${endDate.toLocaleString().split(', ')[1].split(':')[2].split(' ')[1]}`]
			slots.push(slot);
			startTime = slotEndTime;
			// console.log(slot.toLocaleString().split(', ')[1].split(' ')[0].split(':'));
		}
		// console.log(slotsWithDate);
	}	

	await generateSlots(start, end, '15');
	this.subSlots = [];
	slots.forEach(async el => {
		let slot = await subSlot.create({
			startTime: el[0],
			endTime: el[1]
		});
		console.log(slot._id);
		this.subSlots.push(slot);
	})
})


const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;