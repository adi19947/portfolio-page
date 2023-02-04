let itemsContainer = document.getElementById('nav-items-container');
let closeMenu = document.querySelector('.close-menu');
let hamburgerMenu = document.querySelector('.hamburger-image');

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