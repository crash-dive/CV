let navButton = document.getElementById('nav-button');
let navMenu = document.getElementById('nav-menu');
let navMenuFrame = document.getElementById('nav-menu-frame');

navButton.addEventListener('click', function() {
    if (navButton.classList.contains('is-active')) {
        navButton.classList.remove('is-active')
        navMenu.classList.remove('is-active')
        navMenuFrame.classList.remove('is-active')
    }
    else {
        navButton.classList.add('is-active');
        navMenu.classList.add('is-active');
        navMenuFrame.classList.add('is-active');
    }
});
