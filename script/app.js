let itemsContainer = document.getElementById('nav-items-container');
let closeMenu = document.querySelector('.close-menu');
let hamburgerMenu = document.querySelector('.hamburger-image');

let isOpen = false
hamburgerMenu.addEventListener('click', () => {

    if (itemsContainer.style.display === "none") {

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