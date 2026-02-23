// 1. Navigation background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// 2. Typewriter Effect for Hero Section
const textArray = ["Insights.", "Decisions.", "Solutions."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.querySelector('.text-type');

// 3. Mobile Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Initialize typewriter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if(typeTarget) setTimeout(type, 1000);
});