// Custom Smooth Scroll Implementation
class SmoothScroll {
    constructor() {
        this.currentScroll = 0;
        this.targetScroll = 0;
        this.ease = 0.1;
        this.init();
    }

    init() {
        this.targetScroll = window.pageYOffset;
        this.currentScroll = window.pageYOffset;
        this.addEvents();
        this.update();
    }

    addEvents() {
        window.addEventListener('scroll', () => {
            this.targetScroll = window.pageYOffset;
        });
    }

    update() {
        this.currentScroll += (this.targetScroll - this.currentScroll) * this.ease;
        
        if (Math.abs(this.targetScroll - this.currentScroll) < 0.5) {
            this.currentScroll = this.targetScroll;
        }

        requestAnimationFrame(() => this.update());
    }
}

// Initialize smooth scroll
const smoothScroll = new SmoothScroll();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
const animatableElements = document.querySelectorAll(
    '.section-title, .about-text, .stat-card, .skill-card, .project-card, ' +
    '.contact-link, .about-description, .hero-title, .hero-subtitle, .hero-cta, .scroll-indicator'
);

animatableElements.forEach(el => {
    observer.observe(el);
});

// Hero animations on load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('animate-in');
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.hero-subtitle').classList.add('animate-in');
    }, 400);
    
    setTimeout(() => {
        document.querySelector('.hero-cta').classList.add('animate-in');
    }, 700);
    
    setTimeout(() => {
        document.querySelector('.scroll-indicator').classList.add('animate-in');
    }, 1000);
});

// Parallax effect on scroll
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translateY(-3px) translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
});

// Card tilt effect
document.querySelectorAll('.skill-card, .project-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Navigation background on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Custom cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.2;
    
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = 'var(--accent)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--accent)';
    });
});

// Add stagger animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add stagger animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Stat counter animation
function animateCount(element) {
    const target = element.textContent;
    const number = parseInt(target);
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = number / steps;
    const stepDuration = duration / steps;
    let current = 0;
    
    const counter = setInterval(() => {
        current += stepValue;
        if (current >= number) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
        }
    }, stepDuration);
}

// Observe stat numbers for counting animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCount(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// Add floating animation to skill icons
document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Project image parallax on hover
document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image');
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;
        
        image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    });
    
    card.addEventListener('mouseleave', function() {
        image.style.transform = 'translate(0, 0) scale(1)';
    });
});

console.log('🚀 Custom animations and smooth scroll initialized');
