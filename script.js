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
            });
            
            // If it wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
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
        
        // Evitar que ações de clique padrão interfiram
        link.addEventListener('click', function(e) {
            // Vamos garantir que este link seja aberto adequadamente
            e.stopPropagation();
            
            // Se for um link de contato, também verificamos se há algum texto
            if (!currentHref.includes('?text=')) {
                const newHref = currentHref + '?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20seus%20serviços!';
                window.open(newHref, '_blank');
                e.preventDefault(); // Evita o comportamento padrão do link
            }
        });
    });
    
    // Correção específica para o botão de contato WhatsApp
    const contactWhatsAppButton = document.querySelector('.whatsapp-contact-btn');
    if (contactWhatsAppButton) {
        contactWhatsAppButton.addEventListener('click', function(e) {
            // Impede qualquer outro evento de interferir
            e.stopPropagation();
        });
    }
    
    // Correção específica para o link no rodapé (footer)
    const footerWhatsAppLink = document.querySelector('.footer-col .social-links a[href*="wa.me"]');
    if (footerWhatsAppLink) {
        footerWhatsAppLink.setAttribute('href', 'https://wa.me/5583991816152');
        footerWhatsAppLink.setAttribute('target', '_blank');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupFaqAccordion();
    setupSmoothScrolling();
    fixWhatsAppLinks(); // Função para corrigir links do WhatsApp
});