// EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL COM DUAS CORES
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

// CARROSSEL MOBILE PARA CARDS
function initMobileCarousels() {
    // Só ativa em telas mobile (max-width: 768px)
    if (window.innerWidth > 768) return;
    
    const carouselSections = [
        { selector: '.services-grid', dotsClass: 'services-dots' },
        { selector: '.benefits-list', dotsClass: 'benefits-dots' },
        { selector: '.plans-grid', dotsClass: 'plans-dots' },
        { selector: '.partner-benefits', dotsClass: 'partner-dots' }
    ];
    
    carouselSections.forEach(section => {
        const container = document.querySelector(section.selector);
        if (!container) return;
        
        // Adicionar classe carousel
        container.classList.add('mobile-carousel');
        
        // Criar wrapper se não existir
        if (!container.parentElement.classList.contains('carousel-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'carousel-wrapper';
            container.parentElement.insertBefore(wrapper, container);
            wrapper.appendChild(container);
            
            // Criar indicadores de dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = `carousel-dots ${section.dotsClass}`;
            wrapper.appendChild(dotsContainer);
        }
        
        const cards = Array.from(container.children);
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        // Criar dots
        const dotsContainer = container.parentElement.querySelector('.carousel-dots');
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, cards.length - 1));
            const offset = -currentIndex * 100;
            container.style.transform = `translateX(${offset}%)`;
            updateDots();
        }
        
        function handleTouchStart(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            container.style.transition = 'none';
        }
        
        function handleTouchMove(e) {
            if (!isDragging) return;
            
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diff = currentX - startX;
            const containerWidth = container.offsetWidth;
            const movePercent = (diff / containerWidth) * 100;
            
            currentTranslate = prevTranslate + movePercent;
            const maxTranslate = -(cards.length - 1) * 100;
            currentTranslate = Math.max(maxTranslate, Math.min(0, currentTranslate));
            
            container.style.transform = `translateX(${currentTranslate}%)`;
        }
        
        function handleTouchEnd() {
            if (!isDragging) return;
            isDragging = false;
            
            container.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const movedBy = currentTranslate - prevTranslate;
            
            if (movedBy < -10 && currentIndex < cards.length - 1) {
                currentIndex++;
            } else if (movedBy > 10 && currentIndex > 0) {
                currentIndex--;
            }
            
            goToSlide(currentIndex);
            prevTranslate = -currentIndex * 100;
        }
        
        // Event listeners para touch e mouse
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);
        
        container.addEventListener('mousedown', handleTouchStart);
        container.addEventListener('mousemove', handleTouchMove);
        container.addEventListener('mouseup', handleTouchEnd);
        container.addEventListener('mouseleave', handleTouchEnd);
        
        // Prevenir seleção de texto durante arrasto
        container.addEventListener('dragstart', (e) => e.preventDefault());
    });
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

// Enhanced Briefing Form Submission
document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
    initSlideAnimations();
    initMobileCarousels();
    
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

// Reinicializar carrosséis ao redimensionar
window.addEventListener('resize', function() {
    const carousels = document.querySelectorAll('.mobile-carousel');
    carousels.forEach(carousel => {
        if (window.innerWidth > 768) {
            carousel.classList.remove('mobile-carousel');
            carousel.style.transform = '';
        }
    });
    
    if (window.innerWidth <= 768) {
        initMobileCarousels();
    }
});

// Main Event Listeners
window.addEventListener('scroll', () => {
    revealOnScroll();
    animateCounters();
});

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

console.log('%c🚀 Dezain Code - Site desenvolvido com excelência', 'color: #00bfa5; font-size: 16px; font-weight: bold;');
console.log('%cTodos os direitos reservados © 2025', 'color: #667eea; font-size: 12px;');