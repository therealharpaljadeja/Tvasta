const start = new Date();
start.setHours(11);
start.setMinutes(0);
const end = new Date();
end.setHours(14);
end.setMinutes(0);
slots = [];
console.log(start);
console.log(end);
// d.setTimezoneOffset(+530);
// console.log(d.getTimezoneOffset());
function generateSlots(start, end, interval){
	let minutes = parseInt(interval);
	let startTime = start;
	let endTime = end;
	while(startTime < endTime){
		startTime.setMinutes(minutes);
		slot = startTime;
		console.log(minutes);
		console.log(slot.toLocaleString().split(', ')[1].split(' ')[0].split(':'));
		minutes += parseInt(interval);
	}
	console.log(slots);
}

generateSlots(start, end, '30');