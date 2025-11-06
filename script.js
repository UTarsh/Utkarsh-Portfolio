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
    if (window.scrollY > 50) {
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
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// Animated Particles
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${3 + Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// Skill Bar Animation on Scroll
// ============================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ============================================
// Scroll Reveal Animation
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply to all cards including new education and experience sections
document.querySelectorAll('.skill-card, .project-card, .education-card, .experience-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(card);
});

// ============================================
// Contact Form Submission with EmailJS
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // EmailJS configuration
    const serviceID = 'service_53t97zq'; // Your EmailJS Service ID
    const templateID = 'template_pfwgxmu'; // Your EmailJS Template ID
    const publicKey = 'xzRY6-y8JBmkOYqKn'; // Your EmailJS Public Key
    
    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'utkkumar11@gmail.com' // Your email address
    };
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(() => {
            // Success
            alert('✅ Message sent successfully! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            // Error
            console.error('EmailJS Error:', error);
            alert('❌ Failed to send message. Please try again or email me directly at utkkumar11@gmail.com');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
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
// Typing Effect for Hero (Optional Enhancement)
// ============================================
const typingText = document.querySelector('.hero-subtitle');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }, 1000);
}

// ============================================
// Cursor Trail Effect (Optional)
// ============================================
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: fadeOut 0.5s forwards;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
});

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio loaded successfully! 🚀');