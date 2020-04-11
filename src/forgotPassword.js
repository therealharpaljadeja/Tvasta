const forgotPasswordBtn = document.querySelector('#forgotPassword');

const forgotPassword = async () => {
	const emailAddress = document.querySelector('input[name="email"]').value;
	console.log(emailAddress);
	const response = await fetch('/forgot-password', {
		method: 'post',
		headers:{ 
			"Content-Type": "application/json" 
		},
		body: JSON.stringify({ email: emailAddress }),
	});
	console.log(response);
	window.location.replace(response.url);
}

forgotPasswordBtn.addEventListener('click', forgotPassword);