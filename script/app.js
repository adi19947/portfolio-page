let itemsContainer = document.getElementById('nav-items-container');
let closeMenu = document.querySelector('.close-menu');
let hamburgerMenu = document.querySelector('.hamburger-image');
let navItems = document.querySelectorAll('.nav-item');

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', () => { itemsContainer.style.display = "none", changeSrc("./images/menu.png") })
}


let isOpen = false
hamburgerMenu.addEventListener('click', () => {
    console.log(itemsContainer.style.display);
    if (itemsContainer.style.display !== "block") {

        itemsContainer.style.display = "block";

        changeSrc("./images/close.png");
    } else {
        itemsContainer.style.display = "none";
        changeSrc("./images/menu.png")

    }
})

function changeSrc(src) {
    hamburgerMenu.src = src;
}


// Select the form element
const formBtn = document.querySelector('.contact-btn');

// Select the input elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
// Select the error message elements
const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const phoneError = document.getElementById('phone-error');


// Add a submit event listener to the form
formBtn.addEventListener('click', () => {

    // Validate the name field
    if (nameInput.value === '') {

        nameError.textContent = '*Please enter your name';
    } else { nameError.textContent = '', emailError.textContent = '', phoneError.textContent = '' }

    // Validate the email field
    if (emailInput.value === '') {
        emailError.textContent = '*Please enter your email';
    } else if (!emailInput.value.includes('@')) {
        emailError.textContent = 'Please enter a valid email';
    } else { emailError.textContent = '' }


    // validate the phone field
    if (phoneInput.value === '') {
        phoneError.textContent = "*Please enter your phone number"
    } else if (isNaN(phoneInput.value)) { phoneError.textContent = '*This field must contain only numbers' } else { phoneError.textContent = '' }


    // If all fields are valid, submit the form
    // if (nameInput.value !== '' && emailInput.value !== '' && emailInput.value.includes('@')) {
    //     formBtn.submit();
    // }
});

