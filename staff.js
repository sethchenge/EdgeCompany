// Staff Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Hero section animations
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');

        if (heroTitle && heroSubtitle) {
            gsap.timeline()
                .from(heroTitle, {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: "power3.out"
                })
                .from(heroSubtitle, {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    ease: "power3.out"
                }, "-=0.5");
        }
    }

    // CEO card animation
    function initCEOAnimations() {
        const ceoCard = document.getElementById('ceoCard');
        const ceoProfileBorder = document.getElementById('ceoProfileBorder');
        
        if (ceoCard) {
            gsap.fromTo(ceoCard, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ceoCard,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    onEnter: () => {
                        // Start typing animation when CEO card enters viewport
                        initTypingAnimation();
                    }
                }
            });
        }

        // Animate profile border rotation on hover
        if (ceoProfileBorder) {
            ceoProfileBorder.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    rotation: 360,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }
    }

    // Typing animation for CEO name
    function initTypingAnimation() {
        const ceoNameElements = document.querySelectorAll('.ceo-title h3, .staff-info h4');
        
        ceoNameElements.forEach(nameElement => {
            if (nameElement.textContent.trim() === 'Seth Chenge') {
                const originalText = nameElement.textContent;
                nameElement.textContent = '';
                nameElement.style.borderRight = '2px solid #667eea';
                
                // Type each character
                for (let i = 0; i < originalText.length; i++) {
                    gsap.to(nameElement, {
                        duration: 0.05,
                        delay: i * 0.1,
                        onComplete: function() {
                            nameElement.textContent = originalText.substring(0, i + 1);
                        }
                    });
                }
                
                // Remove cursor after typing is complete
                gsap.to(nameElement, {
                    duration: 0,
                    delay: originalText.length * 0.1 + 0.5,
                    onComplete: function() {
                        nameElement.style.borderRight = 'none';
                    }
                });
            }
        });
    }

    // Staff tree animations
    function initStaffTreeAnimations() {
        const staffNodes = document.querySelectorAll('.staff-node');
        const connectionLines = document.querySelectorAll('.connection-line');
        
        // Animate connection lines
        connectionLines.forEach((line, index) => {
            gsap.fromTo(line, {
                scaleY: 0,
                transformOrigin: "top center"
            }, {
                scaleY: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: line,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate staff nodes
        staffNodes.forEach((node, index) => {
            gsap.fromTo(node, {
                y: 50,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)",
                delay: index * 0.3,
                scrollTrigger: {
                    trigger: node,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Profile container hover effects
        const profileContainers = document.querySelectorAll('.profile-container');
        profileContainers.forEach(container => {
            container.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -10,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            container.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // Animated borders for profile images
    function initAnimatedBorders() {
        const animatedBorders = document.querySelectorAll('.animated-border');
        
        animatedBorders.forEach((border, index) => {
            // Create a timeline that rotates once, then pauses for a minute, then repeats
            const tl = gsap.timeline({ repeat: -1 });
            
            tl.to(border, {
                rotation: 360,
                duration: 2, // 2 seconds to complete one rotation
                ease: "power2.out",
                delay: index * 0.5 // Stagger start times
            })
            .to(border, {
                duration: 60, // 60 second pause
                ease: "none"
            });

            // Add hover effect
            border.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            border.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // Team stats counter animation
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            
            gsap.fromTo(stat, {
                textContent: 0
            }, {
                textContent: target,
                duration: 2,
                ease: "power3.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: function() {
                    stat.textContent = Math.ceil(stat.textContent);
                }
            });
        });

        // Animate stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            gsap.fromTo(card, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // Skill tags animation
    function initSkillTagsAnimation() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            gsap.fromTo(tag, {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: tag.closest('.staff-node'),
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            // Add hover effect
            tag.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            tag.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    // Achievement badges animation
    function initAchievementAnimations() {
        const achievements = document.querySelectorAll('.achievement');
        
        achievements.forEach((achievement, index) => {
            gsap.fromTo(achievement, {
                x: -50,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: achievement,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Achievement badge animation
        const achievementBadge = document.querySelector('.achievement-badge');
        if (achievementBadge) {
            gsap.fromTo(achievementBadge, {
                scale: 0,
                rotation: -10
            }, {
                scale: 1,
                rotation: 0,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: achievementBadge,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }

    // Parallax effect for hero section
    function initParallaxEffects() {
        const heroSection = document.querySelector('.staff-hero');
        
        if (heroSection) {
            gsap.to(heroSection, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 80
                        },
                        ease: "power3.out"
                    });
                }
            });
        });
    }

    // Loading animation
    function initLoadingAnimation() {
        const body = document.body;
        body.style.overflow = 'hidden';
        
        gsap.timeline()
            .to('.loading-screen', {
                duration: 0.5,
                opacity: 0,
                ease: "power3.out",
                onComplete: function() {
                    body.style.overflow = 'auto';
                    const loadingScreen = document.querySelector('.loading-screen');
                    if (loadingScreen) {
                        loadingScreen.remove();
                    }
                }
            });
    }

    // Section visibility animations
    function initSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            gsap.fromTo(section, {
                opacity: 0.8
            }, {
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // Mobile menu animations
    function initMobileMenuAnimations() {
        const mobileMenuToggle = document.querySelector('.navbar-toggler');
        const mobileMenu = document.querySelector('#offcanvasNavbar');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                const icon = this.querySelector('.material-icons');
                if (icon) {
                    gsap.to(icon, {
                        rotation: 180,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    }

    // Resize handler for responsive animations
    function handleResize() {
        ScrollTrigger.refresh();
    }

    // Initialize all functions
    function init() {
        initNavbar();
        initHeroAnimations();
        initCEOAnimations();
        initStaffTreeAnimations();
        initAnimatedBorders();
        initStatsCounter();
        initSkillTagsAnimation();
        initAchievementAnimations();
        initParallaxEffects();
        initSmoothScrolling();
        initSectionAnimations();
        initMobileMenuAnimations();
        
        // Add resize listener
        window.addEventListener('resize', handleResize);
    }

    // Start the show
    init();

    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});

// Additional utility functions
function animateOnHover(element, scale = 1.05, duration = 0.3) {
    element.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: scale,
            duration: duration,
            ease: "power2.out"
        });
    });

    element.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: duration,
            ease: "power2.out"
        });
    });
}

// Custom cursor effect (optional)
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', function(e) {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power3.out"
            });
        });
    }
}

// Performance optimization
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set("*", {duration: 0});
    }
}

// Call optimization on load
document.addEventListener('DOMContentLoaded', optimizeAnimations);