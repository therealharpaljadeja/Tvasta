const error = document.querySelector('.error_container');
const cross = document.querySelector('.col--3');
const hideError = () => {
	error.style.display = 'none';
	fetch('/disable-error', {
		method: 'put'
	});
	console.log(error);
}

if(error){
	setTimeout(() => {
		error.style.display = 'none';
		fetch('/disable-error', {
			method: 'put'
		});
	},5000);	
} 
cross.addEventListener('click', hideError);
