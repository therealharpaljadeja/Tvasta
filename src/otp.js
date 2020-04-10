const otpField = document.querySelector('input[name="otp"]');
const submit = document.querySelector('.form_container__form__submit');
const timer = document.querySelector('.timer').children[0].children[0];
const resendOTPBtn = document.querySelector('.resend-otp').children[0];

resendOTPBtn.style.color = 'grey';

let timerCount = parseInt(timer.innerHTML.split(' ')[2]);

const countDown = setInterval(() => {
	if(timerCount === 25) {
		timer.innerHTML = 'Resend';
		resendOTPBtn.style.color = '#0173b2';
		resendOTPBtn.addEventListener('click', (el) => {
			console.log(el);
			fetch('/resend-otp', {
				method: 'put'
			});
			event.preventDefault();
		});
		clearInterval(countDown);
	} else {
		timerCount--;
		timer.innerHTML = `Resend in ${timerCount}`;	
	}
	
},1000);

function moveOnMax(field, nextField) {
	if(field.value.length >= field.maxLength){
    	document.querySelector(nextField).focus();
  	}
}



