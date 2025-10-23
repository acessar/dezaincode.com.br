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
        
        const purpleHue = Math.floor(Math.random() * 30) + 260;
        const brightness = Math.floor(Math.random() * 30) + 70;
        particle.style.backgroundColor = `hsla(${purpleHue}, 100%, ${brightness}%, 0.8)`;
        particle.style.boxShadow = `0 0 ${size * 4}px hsla(${purpleHue}, 100%, ${brightness}%, 1)`;
        
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.8 + 0.3;
        
        container.appendChild(particle);
    }
}

// Create floating tech elements
function createFloatingTech() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create additional floating orbs
    for (let i = 0; i < 6; i++) {
        const orb = document.createElement('div');
        orb.classList.add('tech-orb');
        
        const size = Math.random() * 40 + 20;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        orb.style.left = `${posX}%`;
        orb.style.top = `${posY}%`;
        
        orb.style.animationDelay = `${Math.random() * 8}s`;
        orb.style.animationDuration = `${8 + Math.random() * 4}s`;
        
        hero.appendChild(orb);
    }
    
    // Create floating lines
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.classList.add('tech-line');
        
        const width = Math.random() * 150 + 100;
        line.style.width = `${width}px`;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        line.style.left = `${posX}%`;
        line.style.top = `${posY}%`;
        
        line.style.animationDelay = `${Math.random() * 6}s`;
        line.style.animationDuration = `${6 + Math.random() * 3}s`;
        
        hero.appendChild(line);
    }
}

// Enhanced Scroll Reveal Animation with Parallax
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
    
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
    
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
    } else {
        faqItem.classList.remove('active');
    }
}

// ===== MOBILE CAROUSEL FUNCTIONALITY =====
function initCarousel(carouselId, dotsId) {
    const carousel = document.getElementById(carouselId);
    const dotsContainer = document.getElementById(dotsId);
    
    if (!carousel || !dotsContainer) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    
    // Only create carousel on mobile
    if (window.innerWidth <= 768) {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // AJUSTE ESPECÍFICO PARA PARCERIA - LARGURA MENOR E CENTRALIZADO
        if (carouselId === 'partnerCarousel') {
            const cardWidth = window.innerWidth <= 480 ? '68%' : '70%';
            items.forEach(item => {
                item.style.flex = `0 0 ${cardWidth}`;
                item.style.maxWidth = cardWidth;
                item.style.scrollSnapAlign = 'center';
            });
            const centerPadding = `calc((100% - ${cardWidth}) / 2)`;
            carousel.style.padding = `20px ${centerPadding}`;
            carousel.style.gap = '10px';
            carousel.style.scrollPadding = `0 ${centerPadding}`;
            
            // Centraliza o primeiro card ao carregar
            setTimeout(() => {
                if (items.length > 0) {
                    items[0].scrollIntoView({ block: 'nearest', inline: 'center' });
                }
            }, 100);
        }
        
        // Create dots
        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
        
        // Update active dot on scroll
        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const itemWidth = items[0].offsetWidth + (carouselId === 'partnerCarousel' ? 10 : 16);
            const activeIndex = Math.round(scrollLeft / itemWidth);
            
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
        
        // Touch swipe support
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
}

// Initialize all carousels
function initAllCarousels() {
    initCarousel('servicesCarousel', 'servicesDots');
    initCarousel('benefitsCarousel', 'benefitsDots');
    initCarousel('plansCarousel', 'plansDots');
    initCarousel('partnerCarousel', 'partnerDots');
}

// Enhanced Briefing Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar efeito de digitação
    typeWriter();
    
    // Iniciar animações de deslize
    initSlideAnimations();
    
    // Inicializar carrosséis
    initAllCarousels();
    
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
    createFloatingTech();
    revealOnScroll();
    initIntersectionObserver();
    lazyLoadImages();
    // Ribbon scroll + hover animations
    initRibbonScrollAnimations();
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Ribbon: animação ligada ao scroll + animação alternativa (wiggle) no hover
function initRibbonScrollAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ribbons = document.querySelectorAll('.best-seller-folded');
    if (!ribbons || ribbons.length === 0) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                el.dataset.inView = 'true';
                el.classList.add('ribbon-in-view');
            } else {
                el.dataset.inView = 'false';
                el.classList.remove('ribbon-in-view');
                // limpar transform/opacity quando fora de vista
                el.style.transform = '';
                el.style.opacity = '';
            }
        });
    }, { threshold: [0, 0.1, 0.5, 1] });

    ribbons.forEach(r => io.observe(r));

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ribbons.forEach(el => {
                    if (el.dataset.inView !== 'true' || el.dataset.pauseScroll === 'true') return;

                    const rect = el.getBoundingClientRect();
                    const windowH = window.innerHeight || document.documentElement.clientHeight;
                    const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), 0), 1);

                    // translateY vai de -12px (fora) para 0 (no centro) — adaptável
                    const translateY = -12 + (progress * 12);
                    const opacity = Math.min(1, 0.6 + progress * 0.4);

                    el.style.transform = `translateY(${translateY}px)`;
                    el.style.opacity = opacity;
                });
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // hover / pointer interactions: aplicar wiggle e pausar scroll-driven transform
    ribbons.forEach(el => {
        el.addEventListener('pointerenter', () => {
            el.dataset.pauseScroll = 'true';
            el.classList.add('ribbon-wiggle');
        });
        el.addEventListener('pointerleave', () => {
            delete el.dataset.pauseScroll;
            el.classList.remove('ribbon-wiggle');
            // recalcular posição imediatamente
            setTimeout(onScroll, 20);
        });
    });

    // inicial run
    onScroll();
}

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
        document.querySelectorAll('.animated-icon').forEach(icon => {
            icon.style.animationPlayState = 'paused';
        });
    } else {
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

// Reinitialize carousels on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Clear existing dots
        document.querySelectorAll('.carousel-dots').forEach(dots => {
            dots.innerHTML = '';
        });
        // Reinitialize carousels
        initAllCarousels();
    }, 250);
});

// Console message for developers
console.log('%c🚀 Dezain Code - Site desenvolvido com excelência', 'color: #00bfa5; font-size: 16px; font-weight: bold;');
console.log('%cTodos os direitos reservados © 2025', 'color: #667eea; font-size: 12px;');