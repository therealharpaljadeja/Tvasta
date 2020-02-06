const expand = (element) => {
	// remove active class from any element.
	options.forEach(el => {
		el.classList.remove('option-active');
	})

	// add active class to the element that is clicked
	let abc = element.target;
	let isOption = Array.from(abc.classList).indexOf('option');
	if(isOption === -1){
 		abc = abc.parentElement
 		abc.classList.add('option-active');
	} else {
		abc.classList.add('option-active');
	}

	// remove expand class from any element.
	option_desc.forEach(el => {
		el.classList.remove('option-desc-expand');
	});

	// apply expand class to the appropriate element.
	abc.nextElementSibling.classList.add('option-desc-expand');

	// Below will execute only when the screen size is mobile.
	if(screen.width <= 375){
		// Get grid row and grid column
		let grid_row_start = window.getComputedStyle(abc)['grid-row-end'];	
		let grid_column_start = window.getComputedStyle(abc)['grid-column-end'];

		// apply grid row and grid column to the expanding element.
		window.getComputedStyle(abc.nextElementSibling)['grid-row-start'] = grid_row_start;
		window.getComputedStyle(abc.nextElementSibling)['grid-row-end'] = grid_row_start + 1;
		window.getComputedStyle(abc.nextElementSibling)['grid-column-start'] = grid_column_start;
		window.getComputedStyle(abc.nextElementSibling)['grid-column-end'] = grid_column_start + 1;


	 
	}

	
}

let options = Array.from(document.querySelectorAll('.option'));
let option_desc = Array.from(document.querySelectorAll('.option-desc'));

console.log(option_desc);
options.forEach(el => {
			el.addEventListener('click', expand);
});


