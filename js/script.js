document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TYPING ANIMATION =====
    const typingText = document.querySelector('.typing-text');
    const texts = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'Full Stack Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 100 : 200;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    if (typingText) {
        typeWriter();
    }
    
    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active Navigation - Combined with scroll event for better performance
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.removeItem('theme');
        }
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== SCROLL INDICATOR =====
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ===== COUNTER ANIMATION =====
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const originalText = counter.textContent;
            const target = parseInt(originalText);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (originalText.includes('+')) {
                        counter.textContent = Math.ceil(current) + '+';
                    } else if (originalText.includes('/')) {
                        counter.textContent = Math.ceil(current) + '/7';
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = originalText;
                }
            };
            
            updateCounter();
        });
    }
    
    // ===== SKILLS ANIMATION =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    // ===== SKILLS TOGGLE FUNCTION =====
    window.toggleSkill = function(skillType) {
        const skillList = document.getElementById(skillType + '-skills');
        const icon = document.getElementById(skillType + '-icon');
        
        if (!skillList || !icon) return;
        
        if (skillList.classList.contains('show')) {
            // Close
            skillList.classList.remove('show');
            skillList.classList.add('hide');
            icon.classList.remove('fa-chevron-up', 'rotated');
            icon.classList.add('fa-chevron-down');
        } else {
            // Open
            skillList.classList.remove('hide');
            skillList.classList.add('show');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up', 'rotated');
            
            // Animate skill bars when opened
            setTimeout(() => {
                const skillBars = skillList.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }, 300);
        }
    };
    
    // ===== INTERSECTION OBSERVERS =====
    
    // About Section Observer
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
    
    // Skills Section Observer
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Auto open frontend skills when section is visible
                    setTimeout(() => {
                        const frontendSkills = document.getElementById('frontend-skills');
                        const frontendIcon = document.getElementById('frontend-icon');
                        
                        if (frontendSkills && frontendIcon && !frontendSkills.classList.contains('show')) {
                            frontendSkills.classList.add('show');
                            frontendIcon.classList.remove('fa-chevron-down');
                            frontendIcon.classList.add('fa-chevron-up', 'rotated');
                            
                            setTimeout(() => {
                                animateSkillBars();
                            }, 300);
                        }
                    }, 500);
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // ===== LOADING ANIMATIONS =====
    const elementsToAnimate = document.querySelectorAll('.intro-text, .profile-container, .about-content, .about-image-container');
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 200);
    });
    
    // Skills elements loading animation
    const skillElements = document.querySelectorAll('.skill-category');
    skillElements.forEach((element, index) => {
        element.classList.add('fade-in');
        setTimeout(() => {
            element.classList.add('loaded');
        }, (index * 300) + 1000);
    });
    
    // ===== SOCIAL ICONS TOOLTIP =====
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                const tooltipElement = document.createElement('div');
                tooltipElement.textContent = tooltip;
                tooltipElement.classList.add('tooltip');
                tooltipElement.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    left: 60px;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                this.appendChild(tooltipElement);
                setTimeout(() => {
                    tooltipElement.style.opacity = '1';
                }, 10);
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // ===== CONTACT BUTTON RIPPLE EFFECT =====
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // ===== MOBILE MENU HANDLER =====
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // ===== ADD RIPPLE ANIMATION CSS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .contact-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // ===== INITIALIZATION COMPLETE =====
    console.log('Portfolio website loaded successfully!');
    
});

// ===== SERVICE MODAL FUNCTIONS =====
window.openModal = function(serviceType) {
    const modal = document.getElementById(serviceType + '-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation delay for better UX
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 50);
    }
};

window.closeModal = function(serviceType) {
    const modal = document.getElementById(serviceType + '-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// Close modal when clicking outside or pressing ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.service-modal.active');
        if (activeModal) {
            const modalId = activeModal.id.replace('-modal', '');
            closeModal(modalId);
        }
    }
});

// Prevent modal content click from closing modal
document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// ===== SERVICES SECTION ANIMATION =====
const servicesSection = document.querySelector('#services');
if (servicesSection) {
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    servicesObserver.observe(servicesSection);
}

// Initialize service cards animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
});

// ===== PORTFOLIO FUNCTIONALITY =====
let currentSlide = 0;
let isAnimating = false;
let totalSlides = 0;

// Initialize Portfolio
function initPortfolio() {
    const track = document.getElementById('portfolioTrack');
    const items = document.querySelectorAll('.portfolio-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || items.length === 0) return;
    
    // Calculate slides based on screen size
    const itemsPerSlide = window.innerWidth >= 769 ? 2 : 1;
    totalSlides = Math.ceil(items.length / itemsPerSlide);
    
    // Update indicators
    updateIndicators(totalSlides);
    
    // Set initial position
    currentSlide = 0;
    updateCarouselPosition();
    
    // Navigation event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating) {
                previousSlide();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating) {
                nextSlide();
            }
        });
    }
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while swiping
    }, { passive: false });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50;
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > threshold && diffY < 100) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
    
    // Auto-play with pause on hover
    let autoPlay = setInterval(() => {
        if (!isAnimating && !document.querySelector('.portfolio-carousel:hover')) {
            nextSlide();
        }
    }, 4000);
    
    // Pause auto-play on hover
    const carousel = document.querySelector('.portfolio-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                if (!isAnimating) {
                    nextSlide();
                }
            }, 4000);
        });
    }
}

function updateIndicators(slidesCount) {
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < slidesCount; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.setAttribute('data-slide', i);
        
        indicator.addEventListener('click', () => {
            if (!isAnimating && i !== currentSlide) {
                goToSlide(i);
            }
        });
        
        indicatorsContainer.appendChild(indicator);
    }
}

function updateCarouselPosition() {
    const track = document.getElementById('portfolioTrack');
    if (!track) return;
    
    const translateX = -(currentSlide * 100);
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(slideIndex) {
    if (isAnimating || slideIndex === currentSlide) return;
    
    isAnimating = true;
    
    // Ensure slideIndex is within bounds
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    
    currentSlide = slideIndex;
    updateCarouselPosition();
    
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function nextSlide() {
    const nextIndex = currentSlide + 1 >= totalSlides ? 0 : currentSlide + 1;
    goToSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1;
    goToSlide(prevIndex);
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            let visibleItems = 0;
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Recalculate slides and reset carousel
            const itemsPerSlide = window.innerWidth >= 769 ? 2 : 1;
            totalSlides = Math.ceil(visibleItems / itemsPerSlide);
            currentSlide = 0;
            
            updateIndicators(totalSlides);
            updateCarouselPosition();
        });
    });
}

// Portfolio Modals
window.openPortfolioModal = function(portfolioId) {
    const modal = document.getElementById(portfolioId + '-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closePortfolioModal = function(portfolioId) {
    const modal = document.getElementById(portfolioId + '-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.portfolio-modal.active');
        if (activeModal) {
            const modalId = activeModal.id.replace('-modal', '');
            closePortfolioModal(modalId);
        }
    }
});

// Portfolio Section Observer
const portfolioSection = document.querySelector('#portfolio');
if (portfolioSection) {
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const portfolioCards = entry.target.querySelectorAll('.portfolio-card');
                portfolioCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    portfolioObserver.observe(portfolioSection);
}

// Initialize portfolio cards animation
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
});

// Window resize handler
window.addEventListener('resize', () => {
    if (!isAnimating) {
        const items = document.querySelectorAll('.portfolio-item:not([style*="display: none"])');
        const itemsPerSlide = window.innerWidth >= 769 ? 2 : 1;
        totalSlides = Math.ceil(items.length / itemsPerSlide);
        
        updateIndicators(totalSlides);
        
        // Reset to first slide if current slide is out of bounds
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        updateCarouselPosition();
    }
});

// ===== UPDATE DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TYPING ANIMATION =====
    const typingText = document.querySelector('.typing-text');
    const texts = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'Full Stack Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 100 : 200;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    if (typingText) {
        typeWriter();
    }
    
    // ===== Initialize Portfolio =====
    setTimeout(() => {
        initPortfolio();
        initPortfolioFilter();
    }, 100);
});

// ===== CONTACT FORM FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            submitForm(name, email, subject, message);
        });
    }
    
    function submitForm(name, email, subject, message) {
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon i');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            if (successMessage) {
                successMessage.classList.add('show');
            }
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('show');
                }
            }, 5000);
            
            showNotification('Message sent successfully!', 'success');
        }, 2000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact section animation
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate contact items
                    const contactItems = entry.target.querySelectorAll('.contact-item');
                    contactItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 150);
                    });
                    
                    // Animate form
                    const formContainer = entry.target.querySelector('.contact-form-container');
                    if (formContainer) {
                        setTimeout(() => {
                            formContainer.style.opacity = '1';
                            formContainer.style.transform = 'translateY(0)';
                        }, 300);
                    }
                    
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        contactObserver.observe(contactSection);
    }
    
    // Initialize contact animations
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(30px)';
        formContainer.style.transition = 'all 0.8s ease';
    }
    
    // Add notification animations to document
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
});

function openModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.service-modal');
    
    modals.forEach(modal => {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.service-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});