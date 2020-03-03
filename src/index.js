const expand = (element) => { 
	// remove active class from any element.
	options.forEach(el => {
		el.classList.remove('how_it_works__grid__option-active');
	})

	// add active class to the element that is clicked
	let abc = element.target;
	let isOption = Array.from(abc.classList).indexOf('how_it_works__grid__option');
	if(isOption === -1){
 		abc = abc.parentElement
 		abc.classList.add('how_it_works__grid__option-active');
	} else {
		abc.classList.add('how_it_works__grid__option-active');
	}

	// remove expand class from any element.
	option_desc.forEach(el => {
		el.classList.remove('how_it_works__grid__option__desc-expand');
	});

	// apply expand class to the appropriate element.
	abc.nextElementSibling.classList.add('how_it_works__grid__option__desc-expand');

	// Below will execute only when the screen size is mobile.
	

	
}

let options = Array.from(document.querySelectorAll('.how_it_works__grid__option'));
let option_desc = Array.from(document.querySelectorAll('.how_it_works__grid__option__desc'));

options.forEach(el => {
			el.addEventListener('click', expand);
});


let autoComplete = new google.maps.places.Autocomplete(document.getElementById('auto-complete'), {
	types: ['geocode']
});

google.maps.event.addListener(autoComplete, 'place-changed', () => {
	let nearPlace = autoComplete.getPlace();
});


let menu_burger = document.querySelector('.navbar__burger');
let cross_button = document.querySelector('.cross');

const expand_menu = (el) => {
	let side_menu = document.querySelector('.navbar__side_menu');
	side_menu.style.display = 'inline';
}

const collapse_menu = (el) => {
	let side_menu = document.querySelector('.navbar__side_menu');
	side_menu.style.display = 'none';
}
cross_button.addEventListener('click', collapse_menu);
menu_burger.addEventListener('click', expand_menu);


