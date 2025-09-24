// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Typing Animation
const typingTexts = [
    'Tech Student 👩‍💻',
    'Frontend Developer 🎨',
    'Problem Solver 🧩',
    'Code Enthusiast 🚀',
    'UI/UX Explorer 💫'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeWriter() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Mobile Navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth Scrolling for Navigation Links
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            closeMobileNav();
        }
    }
}

// Intersection Observer for Scroll Animations
function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animatedElements = [
        // About section
        ...document.querySelectorAll('.about-content'),
        ...document.querySelectorAll('.stat'),
        
        // Projects section
        ...document.querySelectorAll('.project-card'),
        
        // Skills section
        ...document.querySelectorAll('.skill-category'),
        
        // Contact section
        ...document.querySelectorAll('.contact-item'),
        ...document.querySelectorAll('.social-links')
    ];
    
    animatedElements.forEach((element, index) => {
        // Add different animation classes based on element type
        if (element.classList.contains('about-content')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('project-card')) {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.2}s`;
        } else {
            element.classList.add('fade-in');
        }
        
        observer.observe(element);
    });
}

// Parallax Effect for Hero Shapes
function handleParallax() {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${rate * speed}px)`;
    });
}

// Skill Items Hover Effect with Stagger
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transitionDelay = '0s';
        });
    });
}

// Project Cards 3D Tilt Effect
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;
                const suffix = target.textContent.includes('+') ? '+' : '';
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + suffix;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + suffix;
                    }
                }, 30);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Scroll to Top Functionality
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.classList.add('scroll-to-top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
}

// Loading Animation
function showLoadingAnimation() {
    // Create loading overlay
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    // Add loader styles
    const loaderStyles = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        .loader-content p {
            font-size: 1.2rem;
            font-weight: 500;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    // Add styles to head
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                style.remove();
            }, 500);
        }, 1000);
    });
}

// Contact Form Enhancement (if form exists)
function enhanceContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            successMsg.style.cssText = `
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 10px;
                margin-top: 1rem;
                text-align: center;
                animation: fadeInUp 0.5s ease;
            `;
            
            form.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
                form.reset();
            }, 3000);
        });
    }
}

// Theme Toggle (Dark/Light Mode)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 2rem;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    showLoadingAnimation();
    
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Event listeners
    hamburger.addEventListener('click', toggleMobileNav);
    navLinks.forEach(link => link.addEventListener('click', handleSmoothScroll));
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', handleParallax);
    
    // Initialize animations and effects
    createObserver();
    initSkillAnimations();
    init3DTilt();
    animateStats();
    createScrollToTop();
    enhanceContactForm();
    createThemeToggle();
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
});

// Add some extra interactive features
document.addEventListener('mousemove', (e) => {
    // Create trailing cursor effect
    const cursor = document.querySelector('.cursor-trail') || createCursorTrail();
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

function createCursorTrail() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trail');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        transition: all 0.1s ease;
        z-index: 9999;
    `;
    document.body.appendChild(cursor);
    return cursor;
}

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Activate party mode!
        document.body.style.animation = 'rainbow 2s infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);
        
        konamiCode = [];
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll handlers
const debouncedScroll = debounce(() => {
    handleNavbarScroll();
    handleParallax();
}, 10);

window.addEventListener('scroll', debouncedScroll);