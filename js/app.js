/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

const nodes = document.querySelectorAll('section');
const ulist = document.querySelector('#navbar__list');
const navFragment = document.createDocumentFragment();
const heading = document.querySelector('.page__header');

// Initially populate the navigation bar
function createNav() {
	for (let i = 0; i < nodes.length; i++) {
		const listItem = document.createElement('li')
		listItem.className = "menu__link";
		listItem.innerText = nodes[i].dataset.nav;
		navFragment.appendChild(listItem);
	}
	ulist.appendChild(navFragment);
};
createNav();

//which section is being viewed
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// smoothly scroll to the required section
ulist.addEventListener('click', function (evt) {
	let listy = document.querySelectorAll('li');
	const test = evt.target.innerText.replace(/ /g, '').toLowerCase();
	const testItem = document.getElementById(test);
	testItem.scrollIntoView({
		behavior: 'smooth'
	});
	//add active status to selected section and highlight section in nav bar
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].classList.remove('your-active-class');
		listy[i].classList.remove('selected');
	}
	evt.target.classList.add('selected');

	testItem.classList.add('your-active-class');
})

// change functionalities while scrolling
window.addEventListener('scroll', function (event) {
	//select section in viewport 
	let listy = document.querySelectorAll('li');
	for (let i=0; i<nodes.length; i++) {
		nodes[i].classList.remove('your-active-class');
		listy[i].classList.remove('selected');
		if (isInViewport(nodes[i])) {
			listy[i].classList.add('selected');
			nodes[i].classList.add('your-active-class');
		}
	}

	//show navigation bar while scrolling
	heading.classList.remove('visuallyhidden');
	heading.addEventListener('transitioned', function (e) {
		heading.classList.remove('hidden');
	})
	setTimeout(function () {
		heading.classList.add('visuallyhidden');
	}, 2000);
}, false);


mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction()
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}