const sideMenuTreatments = document.getElementById('side_menu_treatments');
const sideMenutreatmentChevron = document.querySelector('#treatments_sideMenu');

if(sideMenutreatmentChevron){
	sideMenutreatmentChevron.addEventListener('click', () => {
		sideMenuTreatments.classList.toggle('display_none')
	});
	
}



const profileChevron = document.querySelector('.navbar__profile');
const profile_menu = document.querySelector('.profile_menu_container');

profileChevron.addEventListener('click', () => {profile_menu.classList.toggle('display_none')});

const treatmentChevron = document.querySelector('#treatments');
const treatment_menu = document.querySelector('#treatment_menu_container');
if(treatmentChevron) {
	treatmentChevron.addEventListener('mouseover', () => {
		treatment_menu.classList.toggle('display_none')
	});


	treatmentChevron.addEventListener('mouseout', () => {
		treatment_menu.classList.toggle('display_none')
	});

}



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

// const autoCompleteFunc = () => {
// 	let autoComplete = new google.maps.places.Autocomplete(document.getElementById('auto-complete'));
// 	google.maps.event.addListener(autoComplete, 'place-changed', () => {
// 		let nearPlace = autoComplete.getPlacePredictions();
// 	});

// }


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

// autoCompleteFunc();

const activeDot = (el) => {
	for(let i = 0; i < dots.length; i++){
		dots[i].classList.remove('dot_active');
		el.target.classList.add('dot_active');
	}
	return el.target.classList[1].split('-')[1];
}

const orderingCards = (start) => {
	let cardsToAppend = '';
	for(let i = 0; i < cards.length; i++){
		cards[i].style.display = 'none';
	}
	let formula = (4 * start);
	console.log(formula);
	cards[formula].style.display = 'grid';
	cards[formula + 1].style.display = 'grid';
	cards[formula + 2].style.display = 'grid';
	cards[formula + 3].style.display = 'grid';
}


let cards = Array.from(document.querySelectorAll('.carousel_item'));
cards[1].style.display = 'grid';
cards[0].style.display = 'grid';
cards[2].style.display = 'grid';
cards[3].style.display = 'grid';
let cards_container = document.querySelector('.carousel_container');
let dots = Array.from(document.querySelectorAll('.carousel_dot'));
for(let i = 0; i < dots.length; i++){
	dots[i].addEventListener('click', el => {
		activeDot(el);
		let dot_number = parseInt(dots[i].dataset.number);
		orderingCards(dot_number);
	});
}






const toggleAccordian = element => {
	const item = element.target;
	const chevron = item.children[0].children[1];
	const content = item.children[1];
	content.classList.toggle('expandCollapse');
	chevron.classList.toggle('rotate_arrow');
}


const accordianItem = Array.from(document.querySelectorAll('.about_doctor__container__col--1__more_details__accordian__item'));
accordianItem.forEach(el => {
	el.addEventListener('click', toggleAccordian);
})





const toggleHospitals = (el) => {
	invisible_image_containers.forEach(el => {
		el.classList.toggle('more_hospital_display');
	})
	if(hospitals.children[0].children[0].textContent !== '- Less Hospitals')
	hospitals.children[0].children[0].textContent  = '- Less Hospitals';
	else
	hospitals.children[0].children[0].textContent = '+ More Hospitals';	
	// = '- Less Hospitals';
	if(window.matchMedia('(max-width: 767px)').matches){

	}
	else{
		if(row_1.style.height !== '60rem')
		row_1.style.height = '60rem';
		else
		row_1.style.height = '35rem';	
	}
}


const row_1 = document.querySelector('.row--1');
const hospitals = document.querySelector('.more_hospitals');
hospitals.addEventListener('click', toggleHospitals);
const invisible_image_containers = Array.from(document.querySelectorAll('.more_hospital_hidden'));



