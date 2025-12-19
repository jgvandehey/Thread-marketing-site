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
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 30px rgba(4, 89, 58, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
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

// Tabbed Interface Functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.querySelector(`.tab-panel[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
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

// Onboarding Tasks Animation - Each task animates individually when it scrolls into view
function initOnboardingTasks() {
    const onboardingTasks = document.querySelectorAll('.task-item');
    
    if (onboardingTasks.length === 0) return;
    
    function animateTask(task) {
        // Make task visible
        task.classList.add('visible');
        
        // Change status from pending to active
        setTimeout(() => {
            task.setAttribute('data-status', 'active');
            const statusBadge = task.querySelector('.status-badge');
            const statusIcon = task.querySelector('.task-status-icon');
            
            if (statusBadge) {
                statusBadge.textContent = 'Starting';
                statusBadge.className = 'status-badge status-active';
            }
            
            if (statusIcon) {
                statusIcon.textContent = '⚡';
            }
            
            // Change to completed after delay
            setTimeout(() => {
                task.setAttribute('data-status', 'completed');
                
                if (statusBadge) {
                    statusBadge.textContent = 'Done';
                    statusBadge.className = 'status-badge status-completed';
                }
                
                if (statusIcon) {
                    statusIcon.textContent = '✓';
                }
            }, 1500);
        }, 500);
    }
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Create observer for each individual task
    const taskObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const taskObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only animate if not already animated
                if (!entry.target.classList.contains('visible')) {
                    animateTask(entry.target);
                }
            }
        });
    }, taskObserverOptions);
    
    // Observe each task individually
    onboardingTasks.forEach(task => {
        taskObserver.observe(task);
        
        // Check if task is already in viewport when page loads
        if (isInViewport(task) && !task.classList.contains('visible')) {
            // Small delay to ensure styles are applied
            setTimeout(() => {
                animateTask(task);
            }, 100);
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initOnboardingTasks);

// Hero Montage Sequential Animation - Message Feed Style
function createDealCard() {
    const card = document.createElement('div');
    card.className = 'montage-card montage-message';
    card.innerHTML = `
        <div class="montage-card-header">
            <span class="montage-card-title">Deal Status Update</span>
        </div>
        <div class="montage-card-divider"></div>
        <div class="montage-card-content">
            <div class="montage-deal-block">
                <div class="montage-deal-name">Acme Corp – Enterprise Platform</div>
                <div class="montage-stage-badge montage-stage-negotiation">Negotiation</div>
                <div class="montage-deal-details">
                    <div class="montage-detail-row">
                        <span class="montage-label">ARR:</span>
                        <span class="montage-value">$120,000</span>
                    </div>
                    <div class="montage-detail-row">
                        <span class="montage-label">Owner:</span>
                        <span class="montage-value">Jordan Smith</span>
                    </div>
                    <div class="montage-detail-row">
                        <span class="montage-label">Contract:</span>
                        <span class="montage-value">12 months</span>
                    </div>
                    <div class="montage-detail-row">
                        <span class="montage-label">Start:</span>
                        <span class="montage-value">April 1, 2025</span>
                    </div>
                </div>
                <div class="montage-activity-line">Monitoring deal status...</div>
            </div>
        </div>
    `;
    return card;
}

function createContextCard() {
    const card = document.createElement('div');
    card.className = 'montage-card montage-message';
    card.innerHTML = `
        <div class="montage-card-header">
            <span class="montage-card-title">Gathering Context</span>
        </div>
        <div class="montage-card-divider"></div>
        <div class="montage-card-content">
            <div class="montage-context-sync">
                <div class="montage-context-item montage-syncing">
                    <span class="montage-sync-icon">⟳</span>
                    <span>Syncing seller notes...</span>
                </div>
                <div class="montage-context-item montage-hidden">
                    <span class="montage-checkmark">✓</span>
                    <span><strong>Seller Notes:</strong> "Goal: Launch successfully within 30 days"</span>
                </div>
                <div class="montage-context-item montage-hidden">
                    <span class="montage-sync-icon">⟳</span>
                    <span>Syncing CRM notes...</span>
                </div>
                <div class="montage-context-item montage-hidden">
                    <span class="montage-checkmark">✓</span>
                    <span><strong>Contract Highlights:</strong> "Term: 12 months · ARR: $120,000"</span>
                </div>
                <div class="montage-context-item montage-hidden">
                    <span class="montage-sync-icon">⟳</span>
                    <span>Analyzing transcripts...</span>
                </div>
                <div class="montage-context-item montage-hidden">
                    <span class="montage-checkmark">✓</span>
                    <span><strong>Transcript Insights:</strong> ""Onboarding speed is critical for adoption.""</span>
                </div>
            </div>
        </div>
    `;
    return card;
}

function createHandoffCard() {
    const card = document.createElement('div');
    card.className = 'montage-card montage-message';
    card.innerHTML = `
        <div class="montage-card-header">
            <span class="montage-card-title">Handoff Orchestrated</span>
        </div>
        <div class="montage-card-divider"></div>
        <div class="montage-card-content">
            <div class="montage-checklist">
                <div class="montage-checklist-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Sales context captured</span>
                </div>
                <div class="montage-checklist-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>CSM assigned: Alex Chen</span>
                </div>
                <div class="montage-checklist-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Kickoff scheduled: April 3, 2025</span>
                </div>
                <div class="montage-checklist-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Workspace created</span>
                </div>
                <div class="montage-checklist-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Onboarding tasks generated</span>
                </div>
            </div>
            <div class="montage-subtext">No manual work required</div>
        </div>
    `;
    return card;
}

function createPortalCard() {
    const card = document.createElement('div');
    card.className = 'montage-card montage-message';
    card.innerHTML = `
        <div class="montage-card-header">
            <span class="montage-card-title">Customer Portal Ready</span>
        </div>
        <div class="montage-card-divider"></div>
        <div class="montage-card-content">
            <div class="montage-portal-header">Welcome, Acme Corp</div>
            <div class="montage-portal-info">
                <div class="montage-info-line">
                    <span class="montage-label">CSM:</span>
                    <span class="montage-value">Alex Chen</span>
                </div>
                <div class="montage-info-line">
                    <span class="montage-label">Kickoff:</span>
                    <span class="montage-value">April 3, 2025</span>
                </div>
                <div class="montage-info-line">
                    <span class="montage-label">Primary goal:</span>
                    <span class="montage-value">Launch successfully within 30 days</span>
                </div>
            </div>
            <div class="montage-next-steps">
                <div class="montage-step-item">Attend kickoff</div>
                <div class="montage-step-item">Connect data sources</div>
                <div class="montage-step-item">Complete initial setup</div>
            </div>
        </div>
    `;
    return card;
}

function createValueCard() {
    const card = document.createElement('div');
    card.className = 'montage-card montage-message';
    card.innerHTML = `
        <div class="montage-card-header">
            <span class="montage-card-title">Reduced Time to Value</span>
        </div>
        <div class="montage-card-divider"></div>
        <div class="montage-card-content">
            <div class="montage-progress-list">
                <div class="montage-progress-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Kickoff completed</span>
                </div>
                <div class="montage-progress-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Account setup</span>
                </div>
                <div class="montage-progress-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>Data connected</span>
                </div>
                <div class="montage-progress-item montage-status-pending">
                    <span class="montage-status-dot"></span>
                    <span>First value achieved</span>
                </div>
            </div>
            <div class="montage-badge">Reduced time to value</div>
            <div class="montage-microcopy">Live in days, not weeks</div>
        </div>
    `;
    return card;
}

function animateDealCard(card) {
    const badge = card.querySelector('.montage-stage-badge');
    const activityLine = card.querySelector('.montage-activity-line');
    
    setTimeout(() => {
        badge.textContent = 'Closed Won';
        badge.className = 'montage-stage-badge';
        activityLine.textContent = 'Stage updated to Closed Won';
    }, 800);
}

function animateContextCard(card) {
    const items = card.querySelectorAll('.montage-context-item');
    let itemIndex = 0;
    
    items.forEach((item, index) => {
        if (item.classList.contains('montage-hidden')) {
            setTimeout(() => {
                item.style.maxHeight = '100px';
                item.style.marginBottom = '12px';
                item.style.padding = '0';
                item.classList.remove('montage-hidden');
                
                // If it's a syncing item, animate the sync then convert to checkmark
                if (item.classList.contains('montage-syncing')) {
                    setTimeout(() => {
                        const syncIcon = item.querySelector('.montage-sync-icon');
                        if (syncIcon) {
                            syncIcon.textContent = '✓';
                            syncIcon.style.color = '#10b981';
                            syncIcon.style.animation = 'none';
                            syncIcon.className = 'montage-checkmark';
                        }
                        item.classList.remove('montage-syncing');
                        item.classList.add('montage-synced');
                    }, 600);
                }
            }, itemIndex * 500);
            itemIndex++;
        } else if (item.classList.contains('montage-syncing')) {
            setTimeout(() => {
                const syncIcon = item.querySelector('.montage-sync-icon');
                if (syncIcon) {
                    setTimeout(() => {
                        syncIcon.textContent = '✓';
                        syncIcon.style.color = '#10b981';
                        syncIcon.style.animation = 'none';
                        syncIcon.className = 'montage-checkmark';
                    }, 600);
                }
                item.classList.remove('montage-syncing');
                item.classList.add('montage-synced');
            }, itemIndex * 500);
            itemIndex++;
        }
    });
}

function animateHandoffCard(card) {
    const items = card.querySelectorAll('.montage-checklist-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove('montage-status-pending');
            if (index < 3) {
                item.classList.add('montage-status-done');
            } else {
                item.classList.add('montage-status-progress');
            }
        }, index * 400);
    });
}

function animateValueCard(card) {
    const items = card.querySelectorAll('.montage-progress-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove('montage-status-pending');
            if (index < 2) {
                item.classList.add('montage-status-done');
            } else if (index === 2) {
                item.classList.add('montage-status-progress');
            }
        }, index * 500);
    });
}

let montageSequence = [];
let currentIndex = 0;
let isAnimating = false;
let progressInterval = null;

const cardLabels = {
    'deal': 'Deal Status Update',
    'context': 'Gathering Context',
    'handoff': 'Handoff Orchestrated',
    'portal': 'Customer Portal Ready',
    'value': 'Reduced Time to Value'
};

function updateWizardSteps(stepIndex) {
    const steps = document.querySelectorAll('.montage-wizard-step');
    const totalSteps = steps.length;
    
    steps.forEach((step, index) => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'complete');
        
        if (stepNum < stepIndex) {
            // Previous steps are complete
            step.classList.add('complete');
        } else if (stepNum === stepIndex) {
            // Current step is active
            step.classList.add('active');
        }
        // Future steps remain grayed out (default state)
    });
}

function addCardToFeed(cardType) {
    const feed = document.getElementById('montage-feed');
    if (!feed) return;

    let card;
    switch(cardType) {
        case 'deal':
            card = createDealCard();
            break;
        case 'context':
            card = createContextCard();
            break;
        case 'handoff':
            card = createHandoffCard();
            break;
        case 'portal':
            card = createPortalCard();
            break;
        case 'value':
            card = createValueCard();
            break;
    }

    if (!card) return;

    // Add card to the top, pushing others down
    feed.insertBefore(card, feed.firstChild);
    card.classList.add('montage-visible');

    // Keep cards visible, they'll push down naturally
    // Remove cards after we have more than 4 to prevent overflow
    const visibleCards = feed.querySelectorAll('.montage-card.montage-visible');
    if (visibleCards.length > 4) {
        const oldestCard = visibleCards[visibleCards.length - 1];
        oldestCard.classList.add('montage-removing');
        setTimeout(() => {
            oldestCard.remove();
        }, 600);
    }

    // Animate card content
    setTimeout(() => {
        switch(cardType) {
            case 'deal':
                animateDealCard(card);
                break;
            case 'context':
                animateContextCard(card);
                break;
            case 'handoff':
                animateHandoffCard(card);
                break;
            case 'value':
                animateValueCard(card);
                break;
        }
    }, 200);
}

function playNextCard() {
    if (isAnimating) return;
    isAnimating = true;

    const sequence = ['deal', 'context', 'handoff', 'portal', 'value'];
    const totalSteps = sequence.length;
    const stepIndex = currentIndex % totalSteps;
    const cardType = sequence[stepIndex];
    
    // Update wizard steps
    updateWizardSteps(stepIndex);
    
    addCardToFeed(cardType);
    
    currentIndex++;
    
    setTimeout(() => {
        isAnimating = false;
    }, 3000);
}

function initHeroMontage() {
    const montage = document.getElementById('thread-hero-montage');
    if (!montage) return;

    // Initialize wizard steps to all grayed out
    updateWizardSteps(-1);

    // Start the sequence
    setTimeout(() => {
        playNextCard();
        // Loop continuously
        setInterval(() => {
            playNextCard();
        }, 3500);
    }, 500);
}

// Calendly Modal Functions
function openCalendlyModal() {
    const modal = document.getElementById('calendly-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCalendlyModal() {
    const modal = document.getElementById('calendly-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize montage animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initHeroMontage, 100);
    
    // Handle email form submission
    const emailForm = document.getElementById('hero-email-form');
    const submitBtn = document.getElementById('hero-submit-btn');
    const emailInput = document.getElementById('hero-email-input');
    const formMessage = document.getElementById('form-message');
    
    if (emailForm && submitBtn) {
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value;
            const originalBtnText = submitBtn.textContent;
            
            // Disable form during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            emailInput.disabled = true;
            
            try {
                const response = await fetch('https://formspree.io/f/xkoworkv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        _subject: 'New Thread Signup'
                    })
                });
                
                if (response.ok) {
                    // Success - show thanks message
                    submitBtn.textContent = 'Thanks!';
                    submitBtn.style.background = 'var(--success-color)';
                    submitBtn.disabled = true;
                    emailInput.style.display = 'none';
                    
                    // Hide the "Free trial" text
                    const trialText = emailForm.nextElementSibling;
                    if (trialText) {
                        trialText.style.display = 'none';
                    }
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Error handling
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                emailInput.disabled = false;
                
                if (formMessage) {
                    formMessage.textContent = 'Something went wrong. Please try again.';
                    formMessage.style.display = 'block';
                    formMessage.style.color = 'var(--danger-color)';
                }
            }
        });
    }
    
    // Calendly modal close handlers
    const modalClose = document.getElementById('calendly-modal-close');
    const modalOverlay = document.querySelector('.calendly-modal-overlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeCalendlyModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeCalendlyModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCalendlyModal();
        }
    });
});

