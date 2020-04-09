const cross = document.querySelector('.cross-sidebar');
const burger = document.querySelector('.navbar__burger');
const sidebar = document.querySelector('.admin_sidebar');

if(window.matchMedia('(min-width: 1024px)').matches){
	sidebar.style.display = 'flex';
	burger.style.display = 'none';
	cross.style.display = 'none';
}

const hideSidebar = () => {
	sidebar.style.display = 'none';
}

const showSidebar = () => {
	console.log('hiiii')
	sidebar.style.display = 'flex';
}


cross.addEventListener('click', hideSidebar);
burger.addEventListener('click', showSidebar);