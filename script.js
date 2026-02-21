// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
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

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to animated elements
const animatedElements = document.querySelectorAll(
    '.service-card, .why-card, .project-card, .skill-item, .about-card'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Form Submission Handler with Server + LocalStorage Backup
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !message) {
            alert('Please fill out all fields');
            return;
        }

        // Create form data object
        const formData = {
            name: name,
            email: email,
            message: message
        };

        // Button feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send to server (saves to JSON file)
        fetch('http://localhost:3000/api/submit-contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Also save to localStorage as backup
                    saveFormDataToLocalStorage(data.data);

                    // Show success message
                    showFormSuccess('Message sent successfully! ✅');
                } else {
                    showFormSuccess('Error: ' + data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Fallback: Save to localStorage if server is not available
                console.log('Server not available, saving to localStorage...');
                saveFormDataToLocalStorage(formData);
                showFormSuccess('Message saved locally (Server not connected)', 'warning');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            });
    });
}

// Function to save form data to localStorage
function saveFormDataToLocalStorage(data) {
    try {
        // Get existing submissions or create new array
        let submissions = JSON.parse(localStorage.getItem('aawebcreations_submissions')) || [];

        // Add new submission
        submissions.push(data);

        // Save back to localStorage
        localStorage.setItem('aawebcreations_submissions', JSON.stringify(submissions));

        console.log('Form data saved to localStorage:', submissions);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Function to retrieve all submissions
function getAllSubmissions() {
    try {
        const submissions = JSON.parse(localStorage.getItem('aawebcreations_submissions')) || [];
        console.log('Retrieved submissions:', submissions);
        return submissions;
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        return [];
    }
}

// Function to export submissions as JSON file
function exportSubmissionsAsJSON() {
    try {
        const submissions = getAllSubmissions();
        const jsonData = JSON.stringify(submissions, null, 2);

        // Create blob from JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `aa_web_creations_submissions_${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('Submissions exported as JSON');
    } catch (error) {
        console.error('Error exporting JSON:', error);
    }
}

function showFormSuccess(message, type = 'success') {
    const successMessage = document.createElement('div');

    // Set colors based on message type
    let bgGradient = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    let bgColor = 'rgba(0, 212, 255, 0.9)';

    if (type === 'error') {
        bgGradient = 'linear-gradient(135deg, #ff6b6b, #ee5a6f)';
        bgColor = 'rgba(255, 107, 107, 0.9)';
    } else if (type === 'warning') {
        bgGradient = 'linear-gradient(135deg, #ffa502, #ffb81d)';
        bgColor = 'rgba(255, 165, 2, 0.9)';
    }

    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgGradient};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInDown 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 300px;
    `;

    successMessage.textContent = message || 'Message sent successfully! We\'ll get back to you soon.';
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.style.animation = 'slideOutUp 0.5s ease';
        setTimeout(() => successMessage.remove(), 500);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.getElementById('skills');

if (skillsSection && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease';
                        bar.style.width = width;
                    }, 100);
                });
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
}

// Parallax effect on hero section (subtle)
const hero = document.querySelector('.hero');
const heroGradient = document.querySelector('.hero-gradient');

window.addEventListener('scroll', function () {
    if (window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        if (heroGradient) {
            heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Add active state to nav links based on current scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                }
            });
        } else {
            const link = document.querySelector(`a[href="#${sectionId}"]`);
            if (link) {
                link.style.color = 'var(--text-primary)';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Counter animation for skills (optional enhancement)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Enhance button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Service cards interactive effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Scroll animation for gradient background
let scrollDirection = 'down';
let lastScrollY = 0;

window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;

    // Add subtle effects based on scroll direction
    const navbar = document.querySelector('.navbar');
    if (scrollDirection === 'down' && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
}, false);

// Re-enable navbar visibility on scroll up
let ticking = false;
let lastY = 0;

window.addEventListener('scroll', function () {
    lastY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            const navbar = document.querySelector('.navbar');
            if (lastY > 100) {
                navbar.style.transition = 'transform 0.3s ease';
            }
            ticking = false;
        });

        ticking = true;
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const nav = document.querySelector('.nav-container');
    if (navMenu.classList.contains('active') &&
        !nav.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

console.log('AA Web Creations - Script loaded successfully!');
console.log('%c📝 Contact Form Data Management', 'color: #00d4ff; font-weight: bold; font-size: 14px;');
console.log('');
console.log('✅ Form data is now saved in TWO places:');
console.log('   1️⃣  Browser Storage (localStorage) - Automatic backup');
console.log('   2️⃣  Server JSON File (submissions.json) - Primary storage');
console.log('');
console.log('%c🚀 SERVER SETUP REQUIRED:', 'color: #7c3aed; font-weight: bold;');
console.log('   1. Run: npm install');
console.log('   2. Run: npm start');
console.log('   3. Visit: http://localhost:3000');
console.log('');
console.log('%c📊 Available Commands (Console):', 'color: #00d4ff; font-weight: bold;');
console.log('   getAllSubmissions()        → View all local submissions');
console.log('   exportSubmissionsAsJSON()  → Download local submissions as JSON');
console.log('');
