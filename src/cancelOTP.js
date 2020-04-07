const axios = require('axios');

const cancelLoginDOM = document.getElementById('cancelLogin');

const cancelOTPPOST = () => {
	axios.post('/cancel-otp',{

	})
	.then(res => window.location = res.request.responseURL);
}

cancelLoginDOM.addEventListener('click', cancelOTPPOST);