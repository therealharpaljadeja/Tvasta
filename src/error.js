const error = document.querySelector('.error_container');
const cross = document.querySelector('.col--3');
const hideError = () => {
	error.style.display = 'none';
}
console.log('hi');
cross.addEventListener('click', hideError);