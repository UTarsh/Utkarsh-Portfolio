// ============================================
// Smooth Scroll Function
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// Animated Particles
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 40;
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${4 + Math.random() * 8}px`;
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 8}s`;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// Scroll Reveal Animation
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply reveal animation to various elements
const revealElements = document.querySelectorAll(`
    .about-paragraph,
    .stat-item,
    .passion-card,
    .work-card,
    .highlight-item,
    .connect-card
`);

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(element);
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Passions Card Interaction
// ============================================
const passionCards = document.querySelectorAll('.passion-card');

passionCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add a subtle pulse animation on click
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
});

// ============================================
// Parallax Effect for Hero Section
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const particles = document.getElementById('particles');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
    
    if (particles && scrolled < window.innerHeight) {
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// Cursor Trail Effect
// ============================================
let cursorTrailEnabled = true;
let lastTrailTime = 0;
const trailInterval = 50; // milliseconds between trail dots

document.addEventListener('mousemove', (e) => {
    if (!cursorTrailEnabled) return;
    
    const now = Date.now();
    if (now - lastTrailTime < trailInterval) return;
    lastTrailTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: fadeOut 0.8s forwards;
        z-index: 9999;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 800);
});

// Disable cursor trail on mobile
if (window.innerWidth < 768) {
    cursorTrailEnabled = false;
}

// ============================================
// Typing Effect for Tagline
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Add typing effect to hero description
window.addEventListener('load', () => {
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const text = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, text, 15);
        }, 1000);
    }
});

// ============================================
// Social Icons Hover Effect
// ============================================
const socialIcons = document.querySelectorAll('.social-icon, .footer-social a');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// ============================================
// Connect Cards Stagger Animation
// ============================================
const connectCards = document.querySelectorAll('.connect-card');

const connectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            connectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

connectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    connectObserver.observe(card);
});

// ============================================
// Stats Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target === Infinity ? '∞' : Math.floor(target) + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                if (text === '∞') {
                    setTimeout(() => {
                        stat.textContent = '∞';
                    }, index * 300);
                } else {
                    const number = parseInt(text.replace('+', ''));
                    setTimeout(() => {
                        animateCounter(stat, number, 2000);
                    }, index * 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// Passion Cards Random Color Glow
// ============================================
const glowPassionCards = document.querySelectorAll('.passion-card');

glowPassionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const colors = ['255, 107, 107', '78, 205, 196', '255, 230, 109', '102, 126, 234'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.style.boxShadow = `0 20px 60px rgba(${randomColor}, 0.4)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
    });
});

// ============================================
// Add fadeOut animation to CSS dynamically
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0) translateY(20px);
        }
    }
    
    .cursor-trail {
        animation: fadeOut 0.8s forwards;
    }
`;
document.head.appendChild(style);

// ============================================
// Lazy Load Images (when you add real photos)
// ============================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ============================================
// Smooth Page Load
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Easter Egg: Konami Code
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        
        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(easterEggStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        console.log('🎉 Easter egg activated! Enjoy the rainbow!');
    }
});

// ============================================
// Console Message
// ============================================
console.log(`
%c┌─────────────────────────────────────┐
│  Portfolio loaded successfully! 🚀   │
│                                       │
│  Built with ♥ by Utkarsh Kumar Jha  │
│  Engineer • Cinephile • Athlete      │
└─────────────────────────────────────┘
`, 'color: #FF6B6B; font-family: monospace; font-size: 12px; font-weight: bold;');

console.log('%cInterested in the code? Check out my GitHub!', 'color: #4ECDC4; font-size: 14px;');
console.log('%chttps://github.com/UTarsh', 'color: #FFE66D; font-size: 12px;');

// ============================================
// Performance Monitoring
// ============================================
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #4ECDC4; font-weight: bold;');
        }, 0);
    });
}
