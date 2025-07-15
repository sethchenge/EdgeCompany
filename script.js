// EdgeTech Company JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeNavbarEffects();
    initializeFloatingCards();
});

// Typing Animation
function initializeTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Welcome to EdgeTech',
        'Your IT Solutions Partner',
        'Innovative Technology Services',
        'Expert OS Installation',
        'Reliable IT Support'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deletingSpeed = 75;
    let pauseTime = 2000;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
                return;
            }
            
            setTimeout(typeText, deletingSpeed);
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, pauseTime);
                return;
            }
            
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
}

// GSAP Animations
function initializeAnimations() {
    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero section animations
    gsap.from('.hero-content > *', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Floating cards animation
    gsap.from('.floating-card', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        delay: 1.2
    });
    
    // Mission and Vision cards
    gsap.from('.mission-card, .vision-card', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.mission-vision',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Feature cards
    gsap.from('.feature-card', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.why-choose-us',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Leader card
    gsap.from('.leader-card', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
            trigger: '.leadership',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Footer animation
    gsap.from('.footer .col-lg-4, .footer .col-lg-2, .footer .col-lg-3', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect to child elements
                const children = entry.target.querySelectorAll('.feature-card, .mission-card, .vision-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Navbar Effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add background blur effect on scroll
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Floating Cards Animation
function initializeFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
        
        // Continuous floating animation
        gsap.to(card, {
            y: -20,
            duration: 2 + index * 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        });
    });
}

// Button Hover Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Card Hover Effects
document.querySelectorAll('.feature-card, .mission-card, .vision-card, .leader-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Social Links Animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.2,
            rotation: 360,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    });
    
    link.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loading');
    
    // Preload animations
    gsap.from('body', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-section::before');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Validation (for future contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Mobile Menu Toggle
document.addEventListener('click', function(e) {
    const offcanvas = document.getElementById('offcanvasNavbar');
    const toggleButton = document.querySelector('.navbar-toggler');
    
    if (e.target.closest('.nav-link') && offcanvas.classList.contains('show')) {
        // Close offcanvas when nav link is clicked
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) {
            bsOffcanvas.hide();
        }
    }
});

// Smooth Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations
    revealOnScroll();
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Show special message
        const message = document.createElement('div');
        message.innerHTML = '🎉 Easter Egg Activated! Welcome to EdgeTech! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Console Message
console.log(`
%c
███████╗██████╗  ██████╗ ███████╗████████╗███████╗ ██████╗██╗  ██╗
██╔════╝██╔══██╗██╔════╝ ██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║
█████╗  ██║  ██║██║  ███╗█████╗     ██║   █████╗  ██║     ███████║
██╔══╝  ██║  ██║██║   ██║██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║
███████╗██████╔╝╚██████╔╝███████╗   ██║   ███████╗╚██████╗██║  ██║
╚══════╝╚═════╝  ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝

Welcome to EdgeTech! 🚀
Your IT Solutions Partner
Built with ❤️ by SethChenge
`, 'color: #2563eb; font-weight: bold;');

console.log('%cInterested in our services? Contact us at https://edgetech.com/contact', 'color: #10b981; font-size: 14px;');