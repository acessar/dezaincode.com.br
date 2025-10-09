// EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL
function typeWriter() {
    const blueElement = document.querySelector('#typing-title .title-blue');
    const whiteElement = document.querySelector('#typing-title .title-white');
    if (!blueElement || !whiteElement) return;
    
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

// CARROSSEL MOBILE
class MobileCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container || window.innerWidth > 768) return;
        
        this.options = {
            autoplay: true,
            autoplaySpeed: 4000,
            ...options
        };
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        this.slides = Array.from(this.container.children);
        if (this.slides.length === 0) return;
        
        this.createStructure();
        this.setupEventListeners();
        this.updateSlides();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }
    
    createStructure() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'carousel-container';
        
        this.track = document.createElement('div');
        this.track.className = 'carousel-track';
        
        this.slides.forEach(slide => {
            const slideWrapper = document.createElement('div');
            slideWrapper.className = 'carousel-slide';
            slideWrapper.appendChild(slide);
            this.track.appendChild(slideWrapper);
        });
        
        this.wrapper.appendChild(this.track);
        
        const isBenefits = this.container.classList.contains('benefits-list');
        if (!isBenefits) {
            const controls = this.createControls();
            this.wrapper.appendChild(controls);
        }
        
        const dots = this.createDots();
        this.wrapper.appendChild(dots);
        
        this.container.parentElement.insertBefore(this.wrapper, this.container);
        this.container.remove();
    }
    
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        controls.innerHTML = `
            <button class="carousel-btn carousel-prev" aria-label="Anterior">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button class="carousel-btn carousel-next" aria-label="Próximo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        `;
        return controls;
    }
    
    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        return dotsContainer;
    }
    
    setupEventListeners() {
        const prevBtn = this.wrapper.querySelector('.carousel-prev');
        const nextBtn = this.wrapper.querySelector('.carousel-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.prev());
            nextBtn.addEventListener('click', () => this.next());
        }
        
        this.track.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: true });
        this.track.addEventListener('touchmove', (e) => this.handleDragMove(e), { passive: false });
        this.track.addEventListener('touchend', () => this.handleDragEnd());
        
        this.track.addEventListener('mousedown', (e) => this.handleDragStart(e));
        this.track.addEventListener('mousemove', (e) => this.handleDragMove(e));
        this.track.addEventListener('mouseup', () => this.handleDragEnd());
        this.track.addEventListener('mouseleave', () => this.handleDragEnd());
        
        this.wrapper.addEventListener('mouseenter', () => this.stopAutoplay());
        this.wrapper.addEventListener('mouseleave', () => {
            if (this.options.autoplay) this.startAutoplay();
        });
    }
    
    handleDragStart(e) {
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        this.track.style.cursor = 'grabbing';
        this.stopAutoplay();
    }
    
    handleDragMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        this.currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = this.currentX - this.startX;
        const offset = -(this.currentIndex * 100) + (diff / this.track.offsetWidth * 100);
        this.track.style.transform = `translateX(${offset}%)`;
    }
    
    handleDragEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.track.style.cursor = 'grab';
        
        const diff = this.currentX - this.startX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && this.currentIndex > 0) {
                this.prev();
            } else if (diff < 0 && this.currentIndex < this.slides.length - 1) {
                this.next();
            } else {
                this.updateSlides();
            }
        } else {
            this.updateSlides();
        }
        
        if (this.options.autoplay) {
            setTimeout(() => this.startAutoplay(), 2000);
        }
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    next() {
        if (this.isTransitioning) return;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
    }
    
    prev() {
        if (this.isTransitioning) return;
        this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
        this.updateSlides();
    }
    
    updateSlides() {
        this.isTransitioning = true;
        
        const offset = -(this.currentIndex * 100);
        this.track.style.transform = `translateX(${offset}%)`;
        
        const dots = this.wrapper.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        const slideElements = this.wrapper.querySelectorAll('.carousel-slide');
        slideElements.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else if (index === this.currentIndex - 1 || (this.currentIndex === 0 && index === this.slides.length - 1)) {
                slide.classList.add('prev');
            } else if (index === this.currentIndex + 1 || (this.currentIndex === this.slides.length - 1 && index === 0)) {
                slide.classList.add('next');
            }
        });
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    startAutoplay() {
        if (!this.options.autoplay) return;
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.options.autoplaySpeed);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        if (this.options.autoplay) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
    
    destroy() {
        this.stopAutoplay();
        if (this.wrapper && this.wrapper.parentElement) {
            this.wrapper.remove();
        }
    }
}

let carousels = [];

function initMobileCarousels() {
    carousels.forEach(carousel => carousel.destroy());
    carousels = [];
    
    if (window.innerWidth > 768) return;
    
    const configs = [
        { selector: '.services-grid', speed: 5000 },
        { selector: '.benefits-list', speed: 4500 },
        { selector: '.plans-grid', speed: 5500 },
        { selector: '.partner-benefits', speed: 4000 }
    ];
    
    configs.forEach(config => {
        const container = document.querySelector(config.selector);
        if (container) {
            const carousel = new MobileCarousel(config.selector, {
                autoplay: true,
                autoplaySpeed: config.speed
            });
            carousels.push(carousel);
        }
    });
}

function initSlideAnimations() {
    const slideElements = document.querySelectorAll('.slide-title, .slide-text, .slide-btn');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    slideElements.forEach(element => observer.observe(element));
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const numParticles = 25;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
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
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        if (counter.classList.contains('animated')) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const windowHeight = window.innerHeight;
        const counterTop = counter.getBoundingClientRect().top;
        
        if (counterTop < windowHeight * 0.8) {
            counter.classList.add('animated');
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / 2500, 1);
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

document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
    initSlideAnimations();
    initMobileCarousels();
    createParticles();
    revealOnScroll();
    
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
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
}

let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initMobileCarousels();
    }, 250);
});

window.addEventListener('scroll', () => {
    revealOnScroll();
    animateCounters();
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    revealOnScroll();
    animateCounters();
});

console.log('%c🚀 Dezain Code', 'color: #00bfa5; font-size: 16px; font-weight: bold;');