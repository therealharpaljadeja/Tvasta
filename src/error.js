const error = document.querySelector('.error_container');
const cross = document.querySelector('.col--3');
const hideError = () => {
	error.style.display = 'none';
	console.log('error1');
}

if(error){
	setTimeout(() => {
		console.log('error');
		error.style.display = 'none'
	},5000);	
} 
cross.addEventListener('click', hideError);
