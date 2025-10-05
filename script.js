// EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL COM DUAS CORES - AJUSTADO
function typeWriter() {
    const blueElement = document.querySelector('#typing-title .title-blue');
    const whiteElement = document.querySelector('#typing-title .title-white');
    const textBlue = 'Soluções Web ';
    const textWhite = 'Profissionais Para Seu Negócio';
    let indexBlue = 0;
    let indexWhite = 0;
    
    function typeBlue() {
        if (indexBlue < textBlue.length) {
            blueElement.textContent = textBlue.substring(0, indexBlue + 1);
            indexBlue++;
            setTimeout(typeBlue, 80);
        } else {
            setTimeout(typeWhite, 200);
        }
    }
    
    function typeWhite() {
        if (indexWhite < textWhite.length) {
            whiteElement.textContent = textWhite.substring(0, indexWhite + 1);
            indexWhite++;
            setTimeout(typeWhite, 80);
        }
    }
    
    setTimeout(typeBlue, 500);
}

// ANIMAÇÕES DE DESLIZE PARA TÍTULOS E TEXTOS
function initSlideAnimations() {
    const slideElements = document.querySelectorAll('.slide-title, .slide-text, .slide-btn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    slideElements.forEach(element => observer.observe(element));
}

// Create particles with enhanced animation
function createParticles() {
    const container = document.getElementById('particles');
    const numParticles = 25;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        const blueHue = Math.floor(Math.random() * 40) + 200;
        const brightness = Math.floor(Math.random() * 40) + 60;
        particle.style.backgroundColor = `hsla(${blueHue}, 100%, ${brightness}%, 0.7)`;
        particle.style.boxShadow = `0 0 ${size * 3}px hsla(${blueHue}, 100%, ${brightness}%, 0.9)`;
        
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.8 + 0.3;
        
        container.appendChild(particle);
    }
}

// Enhanced Scroll Reveal Animation with Parallax
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Trigger animation when element is 15% into viewport
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
    
    // Parallax effect for images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(img => {
        const speed = 0.05;
        const rect = img.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const offset = rect.top + scrolled;
        const diff = scrolled - offset;
        const yPos = -(diff * speed);
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            img.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // Smooth parallax for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const speed = 0.02 + (index * 0.01);
        const rect = card.getBoundingClientRect();
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercentage = (windowHeight - rect.top) / windowHeight;
            const translateY = scrollPercentage * 20 * speed;
            
            if (card.classList.contains('visible')) {
                card.style.transform = `translateY(calc(-16px + ${translateY}px))`;
            }
        }
    });
}

// Counter Animation with enhanced easing
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        if (counter.classList.contains('animated')) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2500;
        const windowHeight = window.innerHeight;
        const counterTop = counter.getBoundingClientRect().top;
        
        if (counterTop < windowHeight * 0.8) {
            counter.classList.add('animated');
            
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                const current = Math.floor(target * easeOutQuart);
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    });
}

// FAQ Toggle with smooth animation
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allItems = document.querySelectorAll('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all items with animation
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    } else {
        faqItem.classList.remove('active');
    }
}

// Enhanced Briefing Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar efeito de digitação
    typeWriter();
    
    // Iniciar animações de deslize
    initSlideAnimations();
    
    const briefingForm = document.getElementById('briefingForm');
    
    if (briefingForm) {
        briefingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            let message = '*🔵 NOVO BRIEFING DEZAIN CODE*\n\n';
            
            const labels = {
                name: '👤 Nome',
                email: '📧 E-mail',
                phone: '📱 WhatsApp',
                business: '🏢 Negócio',
                segment: '🎯 Segmento',
                objective: '🎪 Objetivo do site',
                plan: '💎 Plano de interesse',
                message: '📝 Informações adicionais'
            };
            
            formData.forEach((value, key) => {
                if (value && labels[key]) {
                    message += `*${labels[key]}:* ${value}\n`;
                }
            });
            
            message += '\n_Enviado através do site Dezain Code_';
            
            const whatsappUrl = `https://wa.me/5583991816152?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Success animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ENVIADO COM SUCESSO!';
            submitBtn.style.background = 'linear-gradient(135deg, #00d084, #00a86b)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                this.reset();
            }, 3000);
        });
        
        // Enhanced form field animations
        const formControls = briefingForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
});

// Smooth Scroll with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Enhanced Service Cards Hover Effect with Tilt
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `
                translateY(-16px) 
                scale(1.02) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
});

// Plan Cards Enhanced Animation
document.addEventListener('DOMContentLoaded', function() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            planCards.forEach(otherCard => {
                if (otherCard !== card && !otherCard.classList.contains('featured')) {
                    otherCard.style.opacity = '0.6';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            planCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = '';
            });
        });
    });
});

// Benefit Items Stagger Animation
function animateBenefitItems() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    const windowHeight = window.innerHeight;
    
    benefitItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < windowHeight * 0.85) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1)';
            }, index * 100);
        }
    });
}

// WhatsApp Button Enhanced Animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        let isHovering = false;
        
        whatsappBtn.addEventListener('mouseenter', function() {
            isHovering = true;
            this.style.animation = 'none';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            isHovering = false;
            this.style.animation = 'pulse-whatsapp 2s infinite';
        });
    }
});

// Image Lazy Loading Effect
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize Intersection Observer for advanced animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Text Animation on Scroll
function animateTextOnScroll() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const windowHeight = window.innerHeight;
    
    textElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight * 0.9 && !element.classList.contains('text-animated')) {
            element.classList.add('text-animated');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Main Event Listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    animateCounters();
    animateBenefitItems();
    animateTextOnScroll();
});

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            animateCounters();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    revealOnScroll();
    initIntersectionObserver();
    lazyLoadImages();
    
    // Add entrance animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    revealOnScroll();
    animateCounters();
});

// Prevent layout shift
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// SVG Icon Animations Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações interativas extras para os ícones SVG
    const animatedIcons = document.querySelectorAll('.animated-icon');
    
    animatedIcons.forEach(icon => {
        const card = icon.closest('.service-card, .benefit-item');
        
        if (card) {
            card.addEventListener('mouseenter', function() {
                icon.style.filter = 'drop-shadow(0 15px 30px rgba(0, 191, 165, 0.8))';
            });
            
            card.addEventListener('mouseleave', function() {
                icon.style.filter = 'drop-shadow(0 10px 20px rgba(0, 191, 165, 0.4))';
            });
        }
    });
    
    // Animações específicas para o ícone de chatbot - SIMPLIFICADO
    const chatbotIcon = document.querySelector('.chatbot-icon');
    if (chatbotIcon) {
        const card = chatbotIcon.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const dots = chatbotIcon.querySelectorAll('.typing-dot-1, .typing-dot-2, .typing-dot-3');
                const signal = chatbotIcon.querySelector('.bot-signal');
                
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.animation = 'typingBounce 0.5s ease-in-out 2';
                    }, index * 100);
                });
                
                if (signal) {
                    signal.style.animation = 'signalPulse 0.5s ease-in-out 3';
                }
            });
        }
    }
    
    // Animações específicas para o ícone de personalização
    const customIcon = document.querySelector('.custom-icon');
    if (customIcon) {
        const card = customIcon.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const colors = customIcon.querySelectorAll('[class^="color-circle"]');
                colors.forEach((color, index) => {
                    setTimeout(() => {
                        color.style.animation = 'colorPulseCustom 0.5s ease-in-out';
                    }, index * 100);
                });
            });
        }
    }
    
    // Animações específicas para o ícone de manutenção - SIMPLIFICADO
    const maintenanceIcon = document.querySelector('.maintenance-icon');
    if (maintenanceIcon) {
        const card = maintenanceIcon.closest('.service-card');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const gear = maintenanceIcon.querySelector('.setting-gear');
                const wrench = maintenanceIcon.querySelector('.wrench-tool');
                const bolt = maintenanceIcon.querySelector('.bolt-head');
                
                if (gear) {
                    gear.style.animation = 'gearRotate 1s linear infinite';
                }
                if (wrench) {
                    wrench.style.animation = 'wrenchSwing 0.5s ease-in-out 3';
                }
                if (bolt) {
                    bolt.style.animation = 'boltTighten 0.5s ease-in-out 2';
                }
            });
        }
    }
    
    // Animações específicas para o ícone de design (pintura)
    const paintDesignIcon = document.querySelector('.paint-design-icon');
    if (paintDesignIcon) {
        const card = paintDesignIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const strokes = paintDesignIcon.querySelectorAll('[class^="paint-stroke"]');
                const stars = paintDesignIcon.querySelectorAll('[class^="creative-star"]');
                
                strokes.forEach((stroke, index) => {
                    setTimeout(() => {
                        stroke.style.animation = 'strokeDraw 1s ease-in-out';
                    }, index * 200);
                });
                
                stars.forEach(star => {
                    star.style.animation = 'starSparkle 0.5s ease-in-out 2';
                });
            });
        }
    }
    
    // Animações específicas para o ícone de vendas
    const salesIcon = document.querySelector('.sales-icon');
    if (salesIcon) {
        const chartLine = salesIcon.querySelector('.chart-line');
        const dots = salesIcon.querySelectorAll('[class^="chart-dot"]');
        
        const card = salesIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                if (chartLine) {
                    chartLine.style.animation = 'chartGrow 1s ease-in-out forwards';
                }
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.animation = 'dotPulse 0.5s ease-in-out';
                    }, index * 100);
                });
            });
        }
    }
    
    // Animações específicas para o ícone de handshake
    const handshakeIcon = document.querySelector('.handshake-icon');
    if (handshakeIcon) {
        const card = handshakeIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const hands = handshakeIcon.querySelectorAll('.hand-left, .hand-right');
                hands.forEach(hand => {
                    hand.style.animation = 'handShake 0.5s ease-in-out 3';
                });
            });
        }
    }
    
    // Animações específicas para o ícone de dinheiro
    const moneyIcon = document.querySelector('.money-icon');
    if (moneyIcon) {
        const card = moneyIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const coins = moneyIcon.querySelectorAll('.coin-1, .coin-2');
                coins.forEach(coin => {
                    coin.style.animation = 'coinSpin 1s ease-in-out';
                });
            });
        }
    }
    
    // Animações específicas para o ícone de entrega
    const deliveryIcon = document.querySelector('.delivery-icon');
    if (deliveryIcon) {
        const card = deliveryIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const check = deliveryIcon.querySelector('.check-delivery');
                if (check) {
                    check.style.animation = 'checkDraw 1s ease-in-out';
                }
            });
        }
    }
    
    // Animações específicas para o ícone de escudo
    const shieldIcon = document.querySelector('.shield-icon');
    if (shieldIcon) {
        const card = shieldIcon.closest('.benefit-item');
        if (card) {
            card.addEventListener('mouseenter', function() {
                const glows = shieldIcon.querySelectorAll('.shield-glow-1, .shield-glow-2');
                glows.forEach(glow => {
                    glow.style.animation = 'glowExpand 1s ease-in-out';
                });
            });
        }
    }
});

// Check Icon Animations Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const checkIcons = document.querySelectorAll('.check-icon, .check-icon-small');
    
    checkIcons.forEach(icon => {
        const item = icon.closest('.plan-feature, .showcase-features li');
        
        if (item) {
            item.addEventListener('mouseenter', function() {
                const circle = icon.querySelector('.check-circle');
                const mark = icon.querySelector('.check-mark');
                
                if (circle && mark) {
                    circle.style.animation = 'checkCirclePulse 0.5s ease-in-out';
                    mark.style.animation = 'checkMarkDraw 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        circle.style.animation = '';
                        mark.style.animation = '';
                    }, 500);
                }
            });
        }
    });
});

// FAQ Icon Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        question.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.faq-icon');
            const faqItem = this.closest('.faq-item');
            if (icon && !faqItem.classList.contains('active')) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('button, a, .btn, .service-card, .plan-card, .benefit-item');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause heavy animations
        document.querySelectorAll('.animated-icon').forEach(icon => {
            icon.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.animated-icon').forEach(icon => {
            icon.style.animationPlayState = 'running';
        });
    }
});

// Add error handling for form submission
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff3b30';
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
});

// Add smooth fade-in for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile touch optimization
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.service-card, .plan-card, .benefit-item');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    });
}

// Console message for developers
console.log('%c🚀 Dezain Code - Site desenvolvido com excelência', 'color: #00bfa5; font-size: 16px; font-weight: bold;');
console.log('%cTodos os direitos reservados © 2025', 'color: #667eea; font-size: 12px;');