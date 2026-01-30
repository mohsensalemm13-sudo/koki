/* ===================================
   Mohamed Yusri Portfolio - Main JavaScript
   =================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavbar();
    initThemeSwitcher();
    initLanguageSwitcher();
    initParticles();
    initTypedText();
    initCounterAnimation();
    initPortfolioFilter();
    initTestimonialsSlider();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
    initLightbox();
    initAOS();
    initAboutTypewriter();
    initOrbitAnimation(); // Initialize 3D orbit animation
    
    // Initialize i18n
    window.i18n.init();
});

// ===== Loader =====
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Update loader logo based on saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const loaderLogo = document.getElementById('loaderLogo');
    if (loaderLogo) {
        if (savedTheme === 'navy') {
            loaderLogo.src = 'images/logo-navy.png';
        } else {
            loaderLogo.src = 'images/logo-gold.png';
        }
    }
    
    // Hide loader after page loads or after timeout (whichever comes first)
    function hideLoader() {
        setTimeout(function() {
            if (loader) {
                loader.classList.add('hidden');
                // Also set display none after animation
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
    
    // Fallback: Force hide loader after 4 seconds maximum
    setTimeout(function() {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }, 4000);
}

// ===== Navbar =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ===== Theme Switcher =====
function initThemeSwitcher() {
    const themeBtn = document.getElementById('theme-btn');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Toggle dropdown
    themeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        themeDropdown.classList.toggle('active');
        // Close language dropdown
        document.getElementById('lang-dropdown').classList.remove('active');
    });
    
    // Theme options
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            setTheme(theme);
            themeDropdown.classList.remove('active');
        });
    });
    
    // Close dropdown on outside click
    document.addEventListener('click', function() {
        themeDropdown.classList.remove('active');
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update particles color if initialized
        if (window.pJSDom && window.pJSDom.length > 0) {
            updateParticlesColor();
        }
        
        // Update loader logo based on theme
        updateLoaderLogo(theme);
        
        // Update active state
        themeOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === theme);
        });
    }
    
    function updateLoaderLogo(theme) {
        const loaderLogo = document.getElementById('loaderLogo');
        if (loaderLogo) {
            if (theme === 'navy') {
                loaderLogo.src = 'images/logo-navy.png';
            } else {
                loaderLogo.src = 'images/logo-gold.png';
            }
        }
    }
}

// ===== Language Switcher =====
function initLanguageSwitcher() {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Toggle dropdown
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
        // Close theme dropdown
        document.getElementById('theme-dropdown').classList.remove('active');
    });
    
    // Language options
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.dataset.lang;
            window.i18n.setLanguage(lang);
            langDropdown.classList.remove('active');
        });
    });
    
    // Close dropdown on outside click
    document.addEventListener('click', function() {
        langDropdown.classList.remove('active');
    });
}

// ===== Particles Background =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const particleColor = getParticleColor(currentTheme);
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particleColor,
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

function getParticleColor(theme) {
    const colors = {
        dark: '#d4af37',
        light: '#b8860b',
        navy: '#00b4d8'
    };
    return colors[theme] || colors.dark;
}

function updateParticlesColor() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const color = getParticleColor(currentTheme);
        
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// ===== Typed Text Effect =====
window.initTypedText = function() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const words = window.i18n.getTypedWords();
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }
        
        window.typedInstance = setTimeout(type, typingSpeed);
    }
    
    // Clear previous instance
    if (window.typedInstance) {
        clearTimeout(window.typedInstance);
    }
    
    type();
};

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== Portfolio Filter =====
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Testimonials Slider =====
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    
    function showTestimonial(index) {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) index = cards.length - 1;
            showTestimonial(index);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= cards.length) index = 0;
            showTestimonial(index);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto slide
    setInterval(() => {
        let index = currentIndex + 1;
        if (index >= cards.length) index = 0;
        showTestimonial(index);
    }, 5000);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// ===== Back to Top =====
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Lightbox =====
function initLightbox() {
    // Simple lightbox implementation
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const portfolioItem = this.closest('.portfolio-item');
            const img = portfolioItem.querySelector('img');
            const title = portfolioItem.querySelector('h4').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img ? img.src : ''}" alt="${title}">
                    <h3>${title}</h3>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
}

// ===== AOS Animation =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
}

// ===== About Typewriter Effect =====
window.initAboutTypewriter = function() {
    const aboutTexts = document.querySelectorAll('.typewriter-text');
    if (aboutTexts.length === 0) return;

    // Clear any existing timeouts
    if (window.aboutTypewriterTimeouts) {
        window.aboutTypewriterTimeouts.forEach(t => clearTimeout(t));
    }
    window.aboutTypewriterTimeouts = [];

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the current translated text
                const currentText = entry.target.textContent.trim();
                if (currentText) {
                    startTypewriterEffect(entry.target, currentText);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    aboutTexts.forEach(text => {
        // We don't clear it here because i18n might not have run yet
        // Instead, we'll clear it inside the observer right before starting
        observer.observe(text);
    });
};

function startTypewriterEffect(element, text) {
    let index = 0;
    const speed = 15; // Even faster for better UX

    element.textContent = '';
    element.style.opacity = '1';
    element.classList.add('typing');

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            const timeout = setTimeout(type, speed);
            window.aboutTypewriterTimeouts.push(timeout);
        } else {
            element.classList.remove('typing');
        }
    }

    type();
}

// ===== 3D Orbit Animation - Icons orbit around the image going behind and in front =====
function initOrbitAnimation() {
    const orbitItems = document.querySelectorAll('.orbit-item');
    const heroImage = document.querySelector('.hero-image');
    const orbitContainer = document.querySelector('.orbit-container');
    
    if (orbitItems.length === 0 || !heroImage || !orbitContainer) return;
    
    // Configuration
    const animationDuration = 10000; // 10 seconds for full rotation
    const orbitRadius = getOrbitRadius(); // Get radius based on screen size
    const startTime = performance.now();
    
    // Starting angles for each icon (in degrees) - evenly distributed
    const startAngles = [0, 120, 240];
    
    function getOrbitRadius() {
        const width = window.innerWidth;
        if (width <= 480) return 130;
        if (width <= 768) return 160;
        if (width <= 992) return 190;
        return 220;
    }
    
    function updateOrbit() {
        const elapsed = (performance.now() - startTime) % animationDuration;
        const progress = elapsed / animationDuration;
        const currentRotation = progress * 360; // Current rotation in degrees
        
        const radius = getOrbitRadius();
        
        orbitItems.forEach((item, index) => {
            // Calculate the current angle of this icon
            const iconAngle = (startAngles[index] + currentRotation) % 360;
            const angleRad = (iconAngle * Math.PI) / 180;
            
            // Calculate X position (horizontal movement)
            // cos(0) = 1 (right), cos(90) = 0 (center), cos(180) = -1 (left), cos(270) = 0 (center)
            const x = Math.cos(angleRad) * radius;
            
            // Calculate Y position (small vertical movement for perspective effect)
            // This creates a slight elliptical path for more natural look
            const y = Math.sin(angleRad) * (radius * 0.15);
            
            // Determine if the icon is behind the image (90-270 degrees = back half of circle)
            // sin > 0 means the icon is in the back half
            const isBehind = Math.sin(angleRad) > 0;
            
            // Calculate scale based on position (smaller when behind)
            const depthScale = isBehind ? 0.75 : 1;
            
            // Position the orbit item
            item.style.transform = `translate(${x}px, ${y}px)`;
            
            // Position the float element inside
            const floatElement = item.querySelector('.float-element');
            if (floatElement) {
                floatElement.style.transform = `translate(-50%, -50%) scale(${depthScale})`;
            }
            
            // Toggle classes for behind/front styling
            if (isBehind) {
                item.classList.add('behind');
                item.classList.remove('front');
                item.style.zIndex = '5'; // Behind the image (image is z-index 10)
            } else {
                item.classList.remove('behind');
                item.classList.add('front');
                item.style.zIndex = '15'; // In front of the image
            }
        });
        
        requestAnimationFrame(updateOrbit);
    }
    
    // Start the animation loop
    requestAnimationFrame(updateOrbit);
    
    // Update radius on window resize
    window.addEventListener('resize', () => {
        // Radius is recalculated on each frame, so no additional action needed
    });
}
