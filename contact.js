// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initMap();
    initContactForm();
    initFAQ();
    initScrollAnimations();
    initSuccessModal();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarContent = document.getElementById('sidebarContent');
    const closeSidebar = document.getElementById('closeSidebar');

    function openSidebar() {
        mobileSidebar.classList.remove('pointer-events-none');
        mobileSidebar.classList.remove('opacity-0');
        sidebarContent.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebarFn() {
        mobileSidebar.classList.add('opacity-0');
        sidebarContent.classList.add('-translate-x-full');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            mobileSidebar.classList.add('pointer-events-none');
        }, 300);
    }

    mobileMenuBtn.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFn);
    
    // Close sidebar when clicking outside
    mobileSidebar.addEventListener('click', function(e) {
        if (e.target === mobileSidebar) {
            closeSidebarFn();
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileSidebar.classList.contains('pointer-events-none')) {
            closeSidebarFn();
        }
    });
}

// Initialize Map
function initMap() {
    // Nairobi coordinates
    const nairobiCoords = [-1.2921, 36.8219];
    
    // Initialize map
    const map = L.map('map').setView(nairobiCoords, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add custom marker
    const customIcon = L.divIcon({
        html: '<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"><span class="material-icons text-white text-sm">location_on</span></div>',
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
    
    L.marker(nairobiCoords, { icon: customIcon })
        .addTo(map)
        .bindPopup('<div class="text-center"><strong>EdgeTech</strong><br>Nairobi, Kenya</div>')
        .openPopup();
        
    // Handle map resize
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<span class="opacity-0">Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success modal
            showSuccessModal();
        }, 2000);
    });

    // Form validation enhancements
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validate required fields
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        field.classList.add('border-red-500', 'focus:ring-red-500');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('show');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.classList.remove('show');
            } else {
                item.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
}

// Success Modal Functionality
function initSuccessModal() {
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    function hideModal() {
        successModal.classList.add('opacity-0', 'pointer-events-none');
        successModal.querySelector('.transform').classList.add('scale-95');
        document.body.style.overflow = '';
    }
    
    closeModal.addEventListener('click', hideModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !successModal.classList.contains('pointer-events-none')) {
            hideModal();
        }
    });
}

function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('opacity-0', 'pointer-events-none');
    successModal.querySelector('.transform').classList.remove('scale-95');
    document.body.style.overflow = 'hidden';
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.contact-card, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
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

// Phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.startsWith('254')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = '+254' + value.substring(1);
        } else if (!value.startsWith('+')) {
            value = '+254' + value;
        }
    }
    
    e.target.value = value;
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize ripple effect
addRippleEffect();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('backdrop-blur-lg');
        nav.classList.remove('backdrop-blur-md');
    } else {
        nav.classList.remove('backdrop-blur-lg');
        nav.classList.add('backdrop-blur-md');
    }
});

// Service selection auto-complete
const serviceSelect = document.getElementById('service');
const messageTextarea = document.getElementById('message');

serviceSelect.addEventListener('change', function() {
    const selectedService = this.value;
    const serviceMessages = {
        'os-installation': 'I am interested in OS installation and setup services. Please provide more information about your process and pricing.',
        'it-support': 'I need ongoing IT support and maintenance services. Could you tell me more about your support packages?',
        'troubleshooting': 'I am experiencing system issues that need troubleshooting. Please help me resolve these problems.',
        'security': 'I need security solutions for my systems. What security services do you offer?',
        'cloud': 'I am interested in cloud services and migration. Can you help with cloud solutions?',
        'network': 'I need network solutions and setup. What networking services do you provide?'
    };
    
    if (selectedService && serviceMessages[selectedService]) {
        messageTextarea.value = serviceMessages[selectedService];
        messageTextarea.focus();
    }
});

// Add loading states to contact cards
document.querySelectorAll('.contact-card a').forEach(link => {
    link.addEventListener('click', function() {
        const icon = this.parentElement.querySelector('.material-icons');
        icon.style.animation = 'spin 0.5s ease-in-out';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
});

// Error handling for map
window.addEventListener('error', function(e) {
    if (e.message.includes('Leaflet')) {
        const mapContainer = document.getElementById('map');
        mapContainer.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500"><span class="material-icons mr-2">location_off</span>Map temporarily unavailable</div>';
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content
    if (e.key === 'Tab' && e.target.tagName === 'BODY') {
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// Performance optimization - lazy load map
const mapObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Map is already initialized, but we can add additional optimizations here
            mapObserver.unobserve(entry.target);
        }
    });
});

const mapContainer = document.getElementById('map');
if (mapContainer) {
    mapObserver.observe(mapContainer);
}