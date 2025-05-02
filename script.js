// Criação de partículas tecnológicas para efeito visual
function createParticles() {
    const techBgElements = document.querySelectorAll('.tech-bg');
    
    techBgElements.forEach(element => {
        // Criar container de partículas
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        element.prepend(particlesContainer);
        
        // Criar partículas
        const numParticles = 15;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Tamanho aleatório
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posição aleatória
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Animação com delay aleatório
            particle.style.animation = `float ${Math.random() * 25 + 15}s infinite linear`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            // Opacidade aleatória
            particle.style.opacity = Math.random() * 0.7 + 0.3;
            
            particlesContainer.appendChild(particle);
        }
    });
}

// FAQs accordion functionality
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            });
            
            // If it wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// Smooth scrolling para links âncora
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para verificar e corrigir links do WhatsApp
function fixWhatsAppLinks() {
    // Seleciona todos os links de WhatsApp
    const whatsAppLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    // Verifica cada link e corrige se necessário
    whatsAppLinks.forEach(link => {
        // Garantir que o link tenha o formato correto e esteja funcionando
        const currentHref = link.getAttribute('href');
        
        // Se o link não começar com https://, adicione-o
        if (!currentHref.startsWith('https://')) {
            const correctedHref = 'https://' + currentHref.replace(/^(http:\/\/|\/\/|)/, '');
            link.setAttribute('href', correctedHref);
        }
        
        // Certifique-se de que o link abre em uma nova janela
        link.setAttribute('target', '_blank');
    });
}

// Iniciar contadores com animação
function setupCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.innerText;
                const increment = target.includes('%') ? 1 : 1;
                let currentCount = 0;
                
                const updateCount = () => {
                    if (target.includes('+')) {
                        // Para contadores com + no final (ex: 350+)
                        const targetNum = parseInt(target.replace('+', ''));
                        if (currentCount < targetNum) {
                            currentCount += increment;
                            counter.innerText = currentCount + '+';
                            setTimeout(updateCount, 20);
                        }
                    } else if (target.includes('.')) {
                        // Para contadores com decimal (ex: 5.0)
                        const parts = target.split('.');
                        const targetWhole = parseInt(parts[0]);
                        const targetDecimal = parseInt(parts[1]);
                        
                        if (currentCount < targetWhole * 10 + targetDecimal) {
                            currentCount += increment;
                            const whole = Math.floor(currentCount / 10);
                            const decimal = currentCount % 10;
                            counter.innerText = `${whole}.${decimal}`;
                            setTimeout(updateCount, 100);
                        }
                    } else if (target.includes('%')) {
                        // Para contadores com porcentagem (ex: 98%)
                        const targetNum = parseInt(target.replace('%', ''));
                        if (currentCount < targetNum) {
                            currentCount += increment;
                            counter.innerText = currentCount + '%';
                            setTimeout(updateCount, 30);
                        }
                    } else {
                        // Para contadores numéricos simples
                        const targetNum = parseInt(target);
                        if (currentCount < targetNum) {
                            currentCount += increment;
                            counter.innerText = currentCount;
                            setTimeout(updateCount, 20);
                        }
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Configuração do formulário com envio para WhatsApp
function setupBriefingForm() {
    const form = document.getElementById('briefingForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Desabilitar o botão de envio durante o processo
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
            
            // Formatar a mensagem para o WhatsApp
            let whatsappMessage = `*🔵 NOVO BRIEFING DEZAIN CODE*\n\n`;
            whatsappMessage += `*Nome:* ${data.name}\n`;
            whatsappMessage += `*E-mail:* ${data.email}\n`;
            whatsappMessage += `*WhatsApp:* ${data.phone}\n`;
            whatsappMessage += `*Negócio:* ${data.business}\n`;
            whatsappMessage += `*Segmento:* ${data.segment}\n`;
            whatsappMessage += `*Objetivo do site:* ${data.objective}\n`;
            whatsappMessage += `*Plano de interesse:* ${data.plan}\n`;
            
            if (data.message && data.message.trim() !== '') {
                whatsappMessage += `*Informações adicionais:* ${data.message}\n`;
            }
            
            // Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Criar o link do WhatsApp
            const whatsappLink = `https://wa.me/5583991816152?text=${encodedMessage}`;
            
            // Após breve delay, redirecionar para o WhatsApp
            setTimeout(() => {
                // Resetar o formulário
                form.reset();
                
                // Criar mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="success-text">
                        <h3>Formulário enviado com sucesso!</h3>
                        <p>Você será redirecionado para o WhatsApp para finalizar o envio.</p>
                    </div>
                `;
                
                // Inserir a mensagem no lugar do formulário
                form.style.display = 'none';
                form.parentNode.appendChild(successMessage);
                
                // Restaurar o botão
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Abrir o WhatsApp em uma nova aba
                window.open(whatsappLink, '_blank');
            }, 1500);
        });
    }
}

// Animar elementos na visualização
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.plan-card, .benefit-item, .premium-item, .testimonial-card, .briefing-step');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(element => {
        element.classList.add('animate-prepare');
        observer.observe(element);
    });
}

// Header fixo com mudança de estilo no scroll
function setupStickyHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// Mostrar/esconder botão voltar ao topo
function setupBackToTop() {
    // Criar o botão
    const backToTopBtn = document.createElement('a');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Controlar visibilidade com base no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Adicionar funcionalidade de voltar ao topo
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Adicionar estilos de animação CSS
function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .animate-prepare {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .header-scrolled {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
            background-color: var(--primary-blue);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 99;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            background-color: var(--secondary-blue);
        }
        
        .success-message {
            display: flex;
            background-color: rgba(37, 211, 102, 0.1);
            border-left: 3px solid #25D366;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            align-items: center;
        }
        
        .success-icon {
            font-size: 32px;
            color: #25D366;
            margin-right: 15px;
        }
        
        .success-text h3 {
            color: var(--dark-blue);
            margin-bottom: 5px;
        }
        
        .success-text p {
            color: #555;
        }
    `;
    document.head.appendChild(styleElement);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupFaqAccordion();
    setupSmoothScrolling();
    fixWhatsAppLinks();
    setupCounters();
    setupBriefingForm();
    addAnimationStyles();
    setupScrollAnimations();
    setupStickyHeader();
    setupBackToTop();
    
    // Inicializar o primeiro item do FAQ como aberto
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        const firstAnswer = firstFaqItem.querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
        }
    }
});