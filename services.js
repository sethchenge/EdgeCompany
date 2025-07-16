// Services Page JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// Service modal data
const serviceData = {
    os: {
        title: "OS Installation & Setup",
        icon: "computer",
        description: "Complete operating system installation and configuration services for all major platforms.",
        features: [
            "Windows 10/11 Installation",
            "macOS Installation & Setup",
            "Linux Distribution Installation",
            "Driver Installation & Updates",
            "System Optimization",
            "Software Configuration",
            "Data Migration",
            "Performance Tuning"
        ],
        pricing: {
            basic: "$99 - Single OS Installation",
            standard: "$149 - OS + Driver Setup",
            premium: "$199 - Complete System Setup"
        },
        timeline: "2-4 hours",
        warranty: "30-day warranty on installation"
    },
    support: {
        title: "IT Support & Maintenance",
        icon: "support_agent",
        description: "24/7 comprehensive IT support and proactive maintenance services.",
        features: [
            "24/7 Remote Support",
            "Regular System Maintenance",
            "Performance Monitoring",
            "Security Updates",
            "Backup Management",
            "User Training",
            "Priority Support",
            "Monthly Reports"
        ],
        pricing: {
            basic: "$149/month - Basic Support",
            standard: "$249/month - Standard Support",
            premium: "$399/month - Enterprise Support"
        },
        timeline: "Ongoing service",
        warranty: "Service level agreements included"
    },
    troubleshoot: {
        title: "System Troubleshooting",
        icon: "troubleshoot",
        description: "Expert diagnosis and resolution of hardware and software issues.",
        features: [
            "Hardware Diagnostics",
            "Software Debugging",
            "Performance Issues",
            "System Crashes",
            "Network Problems",
            "Data Recovery",
            "Virus Removal",
            "System Restoration"
        ],
        pricing: {
            basic: "$79 - Basic Troubleshooting",
            standard: "$129 - Advanced Diagnostics",
            premium: "$199 - Complete System Repair"
        },
        timeline: "1-6 hours",
        warranty: "14-day warranty on fixes"
    },
    security: {
        title: "Security Solutions",
        icon: "security",
        description: "Comprehensive security services to protect your digital assets.",
        features: [
            "Antivirus Installation",
            "Firewall Configuration",
            "Security Audits",
            "Data Encryption",
            "Password Management",
            "Threat Detection",
            "Security Training",
            "Compliance Assessment"
        ],
        pricing: {
            basic: "$129 - Basic Security Setup",
            standard: "$229 - Advanced Security",
            premium: "$329 - Enterprise Security"
        },
        timeline: "2-8 hours",
        warranty: "60-day security guarantee"
    },
    cloud: {
        title: "Cloud Services",
        icon: "cloud",
        description: "Cloud migration, setup, and management for scalable solutions.",
        features: [
            "Cloud Migration",
            "Backup Solutions",
            "Cloud Storage Setup",
            "Data Synchronization",
            "Cloud Security",
            "Scalability Planning",
            "Cost Optimization",
            "24/7 Monitoring"
        ],
        pricing: {
            basic: "$199 - Basic Cloud Setup",
            standard: "$399 - Advanced Migration",
            premium: "$599 - Enterprise Cloud"
        },
        timeline: "1-3 days",
        warranty: "90-day migration guarantee"
    },
    network: {
        title: "Network Solutions",
        icon: "network_check",
        description: "Complete network design, setup, and optimization services.",
        features: [
            "Network Design",
            "WiFi Optimization",
            "Router Configuration",
            "Network Security",
            "Cable Management",
            "Performance Testing",
            "Troubleshooting",
            "Ongoing Monitoring"
        ],
        pricing: {
            basic: "$159 - Basic Network Setup",
            standard: "$299 - Advanced Configuration",
            premium: "$499 - Enterprise Network"
        },
        timeline: "4-8 hours",
        warranty: "45-day performance guarantee"
    }
};

// Open service modal
function openServiceModal(serviceKey) {
    const service = serviceData[serviceKey];
    if (!service) return;
    
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.innerHTML = `
        <span class="material-icons me-2">${service.icon}</span>
        ${service.title}
    `;
    
    modalBody.innerHTML = `
        <div class="service-modal-content">
            <div class="row">
                <div class="col-md-8">
                    <h5>Service Description</h5>
                    <p class="mb-4">${service.description}</p>
                    
                    <h5>What's Included</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="feature-list">
                                ${service.features.slice(0, Math.ceil(service.features.length / 2)).map(feature => `
                                    <li><span class="material-icons">check_circle</span> ${feature}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="feature-list">
                                ${service.features.slice(Math.ceil(service.features.length / 2)).map(feature => `
                                    <li><span class="material-icons">check_circle</span> ${feature}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="service-info-card">
                        <h5>Pricing Options</h5>
                        <div class="pricing-options">
                            ${Object.entries(service.pricing).map(([tier, price]) => `
                                <div class="pricing-tier">
                                    <strong>${price}</strong>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="service-details mt-4">
                            <div class="detail-item">
                                <span class="material-icons">schedule</span>
                                <div>
                                    <strong>Timeline</strong>
                                    <p>${service.timeline}</p>
                                </div>
                            </div>
                            <div class="detail-item">
                                <span class="material-icons">verified</span>
                                <div>
                                    <strong>Warranty</strong>
                                    <p>${service.warranty}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
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

// Orbit animation interaction
document.addEventListener('DOMContentLoaded', function() {
    const orbitItems = document.querySelectorAll('.orbit-item');
    
    orbitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isFraction = target.includes('/');
        
        let finalValue;
        if (isPercentage) {
            finalValue = parseFloat(target);
        } else if (isPlus) {
            finalValue = parseInt(target);
        } else if (isFraction) {
            return; // Skip 24/7 as it's not a number to animate
        } else {
            finalValue = parseInt(target);
        }
        
        if (isNaN(finalValue)) return;
        
        let currentValue = 0;
        const increment = finalValue / 100;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.ceil(currentValue);
            if (isPercentage) {
                counter.textContent = displayValue + '%';
            } else if (isPlus) {
                counter.textContent = displayValue + '+';
            } else {
                counter.textContent = displayValue;
            }
        }, 20);
    });
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
});

// Process steps animation
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add custom CSS for modal
const modalStyles = `
    .service-modal-content {
        font-family: 'Inter', sans-serif;
    }
    
    .feature-list {
        list-style: none;
        padding: 0;
    }
    
    .feature-list li {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        color: #555;
    }
    
    .feature-list li .material-icons {
        color: #667eea;
        font-size: 1.2rem;
        margin-right: 0.5rem;
    }
    
    .service-info-card {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 1.5rem;
        height: fit-content;
    }
    
    .pricing-options {
        margin-bottom: 1rem;
    }
    
    .pricing-tier {
        padding: 0.75rem 0;
        border-bottom: 1px solid #e9ecef;
        color: #667eea;
        font-weight: 600;
    }
    
    .pricing-tier:last-child {
        border-bottom: none;
    }
    
    .service-details {
        border-top: 1px solid #e9ecef;
        padding-top: 1rem;
    }
    
    .detail-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    
    .detail-item .material-icons {
        color: #667eea;
        margin-right: 0.75rem;
        margin-top: 0.25rem;
    }
    
    .detail-item p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);