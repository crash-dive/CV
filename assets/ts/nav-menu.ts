let navButton = document.getElementById('nav-button');
let navMenu = document.getElementById('nav-menu');
let navMenuFrame = document.getElementById('nav-menu-frame');

navButton.addEventListener('click', function() {
    navButton.classList.toggle('is-open');
    navButton.classList.toggle('is-closed');
    navMenu.classList.toggle('is-open');
    navMenuFrame.classList.toggle('is-open');
});
