// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Remove will-change after animation to improve performance
            setTimeout(() => {
                entry.target.style.willChange = 'auto';
            }, 800);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.outcome-card, .performance-card, .quote-card, .pricing-card, .pillar-item, .integration-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });
});

// Dashboard chart animation
function animateChart() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.opacity = '0';
            bar.style.transform = 'scaleY(0)';
            bar.style.transformOrigin = 'bottom';
            bar.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                bar.style.opacity = '1';
                bar.style.transform = 'scaleY(1)';
            }, 100);
        }, index * 100);
    });
}

// Trigger chart animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    heroObserver.observe(heroVisual);
}

// Add hover effect to dashboard tabs
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Form handling for demo buttons (placeholder)
document.querySelectorAll('a[href="#demo"]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real implementation, this would open a modal or redirect to a form
        alert('Demo booking form would open here. In production, this would connect to your CRM or booking system.');
    });
});

// Add parallax effect to hero section (removed to prevent overlap issues)
// Parallax can cause content overlap, so we'll use a simpler fade effect instead
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        // Only fade, no transform to prevent overlap
        hero.style.opacity = Math.max(0.7, 1 - (scrolled / window.innerHeight) * 0.3);
    }
});

// Counter animation for metrics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target) + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start) + '%';
        }
    }, 16);
}

// Health meter animation
const healthMeterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const meterFill = entry.target.querySelector('.meter-fill');
            if (meterFill) {
                meterFill.style.width = '0%';
                setTimeout(() => {
                    meterFill.style.transition = 'width 1.5s ease';
                    meterFill.style.width = '87%';
                }, 100);
            }
            healthMeterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const healthScoreVisual = document.querySelector('.health-score-visual');
if (healthScoreVisual) {
    healthMeterObserver.observe(healthScoreVisual);
}

