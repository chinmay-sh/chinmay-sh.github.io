// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero animations
gsap.from('.hero-title .line', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out',
    delay: 0.5,
});

gsap.from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    delay: 1.2,
});

gsap.from('.hero-cta', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    delay: 1.5,
});

gsap.from('.scroll-indicator', {
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    delay: 2,
});

// Section Title Animations
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
    });
});

// About Section Animations
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
});

gsap.utils.toArray('.stat-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power4.out',
    });
});

// Skills Section Animations
gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power4.out',
    });
});

// Projects Section Animations
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power4.out',
    });
    
    // Parallax effect on project images
    gsap.to(card.querySelector('.project-image'), {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        },
        y: -50,
        ease: 'none',
    });
});

// Contact Section Animations
gsap.from('.contact-description', {
    scrollTrigger: {
        trigger: '.contact-description',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
});

gsap.utils.toArray('.contact-link').forEach((link, index) => {
    gsap.from(link, {
        scrollTrigger: {
            trigger: link,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power4.out',
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 2,
            });
        }
    });
});

// Add hover effects with GSAP
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
});

// Magnetic effect for buttons
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    });
});

// Parallax effect for hero section
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: 200,
    opacity: 0.5,
    ease: 'none',
});

// Navigation background on scroll
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'nav-scrolled', targets: '.nav' },
});

// Cursor follow effect (optional enhancement)
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    }
    
    @media (min-width: 1024px) {
        .cursor {
            display: block;
        }
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3,
        ease: 'power2.out',
    });
});

document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .stat-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    });
});

// Add stagger animation for about descriptions
gsap.utils.toArray('.about-description').forEach((desc, index) => {
    gsap.from(desc, {
        scrollTrigger: {
            trigger: desc,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power4.out',
    });
});

// Rotate skill icons on scroll
gsap.utils.toArray('.skill-icon').forEach((icon) => {
    gsap.from(icon, {
        scrollTrigger: {
            trigger: icon,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        rotation: -180,
        scale: 0,
        duration: 1,
        ease: 'back.out(1.7)',
    });
});

// Animate project tags
gsap.utils.toArray('.project-tags').forEach((tagContainer) => {
    const tags = tagContainer.querySelectorAll('.tag');
    gsap.from(tags, {
        scrollTrigger: {
            trigger: tagContainer,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
    });
});

console.log('🚀 Animations initialized with Lenis and GSAP');
