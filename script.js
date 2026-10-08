const menuButton = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const menuIcon = menuButton.querySelector('i');

// Opens or closes the mobile menu and keeps screen-reader state in sync.
function setMenu(open, returnFocus) {
    navbar.classList.toggle('active', open);
    menuIcon.classList.toggle('bx-x', open);
    menuIcon.classList.toggle('bx-menu', !open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (!open && returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => setMenu(!navbar.classList.contains('active')));

// Escape closes the menu and returns focus to the menu button.
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) setMenu(false, true);
});

// Close the menu after choosing a link, and when the screen becomes wide.
navbar.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 1286px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
