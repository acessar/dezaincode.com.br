// Criação de partículas tecnológicas para efeito visual
function createParticles() {
    const techBgElements = document.querySelectorAll('.tech-bg');
    
    techBgElements.forEach(element => {
        // Criar container de partículas
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        element.prepend(particlesContainer);
        
        // Criar partículas
        const numParticles = 20; // Aumentado para mais densidade
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Tamanho aleatório
            const size = Math.random() * 6 + 2; // Tamanhos variados
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Posição aleatória
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Cor aleatória em tons de azul
            const blueHue = Math.floor(Math.random() * 40) + 200; // 200-240 (azuis)
            const brightness = Math.floor(Math.random() * 40) + 60; // 60-100%
            particle.style.backgroundColor = `hsla(${blueHue}, 100%, ${brightness}%, 0.6)`;
            particle.style.boxShadow = `0 0 ${size * 2}px hsla(${blueHue}, 100%, ${brightness}%, 0.8)`;
            
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
                
                // Adiciona um efeito sutil de destaque
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 15px 40px rgba(0, 112, 243, 0.12)';
                
                // Remove o efeito após 300ms
                setTimeout(() => {
                    item.style.transform = '';
                    item.style.boxShadow = '';
                }, 300);
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
                // Adicionando efeito de highlight ao elemento alvo
                const highlightElement = () => {
                    const originalBackground = targetElement.style.backgroundColor;
                    const originalTransition = targetElement.style.transition;
                    
                    targetElement.style.transition = 'background-color 1s ease';
                    targetElement.style.backgroundColor = 'rgba(0, 194, 255, 0.1)';
                    
                    setTimeout(() => {
                        targetElement.style.backgroundColor = originalBackground;
                        setTimeout(() => {
                            targetElement.style.transition = originalTransition;
                        }, 1000);
                    }, 1000);
                };
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                setTimeout(highlightElement, 800);
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
        
        // Adiciona efeito de tooltip
        if (!link.getAttribute('title')) {
            link.setAttribute('title', 'Enviar mensagem via WhatsApp');
        }
    });
}

// Iniciar contadores com animação
function setupCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
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
                            setTimeout(updateCount, 15); // Mais rápido
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
                            setTimeout(updateCount, 80);
                        }
                    } else if (target.includes('%')) {
                        // Para contadores com porcentagem (ex: 98%)
                        const targetNum = parseInt(target.replace('%', ''));
                        if (currentCount < targetNum) {
                            currentCount += increment;
                            counter.innerText = currentCount + '%';
                            setTimeout(updateCount, 20);
                        }
                    } else {
                        // Para contadores numéricos simples
                        const targetNum = parseInt(target);
                        if (currentCount < targetNum) {
                            currentCount += increment;
                            counter.innerText = currentCount;
                            setTimeout(updateCount, 15); // Mais rápido
                        }
                    }
                };
                
                // Adiciona efeito de pulso ao completar
                const addPulseEffect = () => {
                    counter.classList.add('counter-completed');
                    counter.style.transform = 'scale(1.1)';
                    counter.style.transition = 'transform 0.3s ease';
                    
                    setTimeout(() => {
                        counter.style.transform = 'scale(1)';
                        setTimeout(() => {
                            counter.classList.remove('counter-completed');
                        }, 300);
                    }, 300);
                };
                
                updateCount();
                setTimeout(addPulseEffect, 1500);
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
        // Adiciona validação de campos
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('filled');
                } else {
                    input.parentElement.classList.remove('filled');
                }
            });
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validação antes do envio
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    isValid = false;
                    input.parentElement.classList.add('error');
                } else {
                    input.parentElement.classList.remove('error');
                }
            });
            
            if (!isValid) {
                // Mostrar mensagem de erro
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error-message';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, preencha todos os campos obrigatórios.';
                
                // Remover mensagem anterior se existir
                const oldError = form.querySelector('.form-error-message');
                if (oldError) {
                    oldError.remove();
                }
                
                form.prepend(errorMessage);
                
                // Animar entrada da mensagem
                errorMessage.style.opacity = '0';
                errorMessage.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    errorMessage.style.transition = 'all 0.3s ease';
                    errorMessage.style.opacity = '1';
                    errorMessage.style.transform = 'translateY(0)';
                }, 10);
                
                // Remover após 5 segundos
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    errorMessage.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 300);
                }, 5000);
                
                return;
            }
            
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
            submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';
            
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
                
                // Animar entrada da mensagem
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    successMessage.style.transition = 'all 0.5s ease';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 10);
                
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
    const elements = document.querySelectorAll(
        '.plan-card, .benefit-item, .payment-feature, .testimonial-card, .briefing-step, .portfolio-img img, .process-step'
    );
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Atraso baseado na posição do elemento para criar um efeito cascata
                const delay = Array.from(elements).indexOf(entry.target) % 4 * 100;
                
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
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
        
        // Animar o scroll suavemente
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        
        scrollToTop();
    });
}

// Adicionar estilos de animação CSS
function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Estilos tech para animações */
        .animate-prepare {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), 
                        transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .header-scrolled {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 20px rgba(0, 112, 243, 0.15);
        }
        
        .form-group.focused .form-control {
            border-color: var(--accent-blue);
            box-shadow: 0 0 0 3px rgba(0, 194, 255, 0.2);
            background-color: rgba(255, 255, 255, 0.07);
        }
        
        .form-group.error .form-control {
            border-color: #ff3b30;
            box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.2);
        }
        
        .form-error-message {
            background-color: rgba(255, 59, 48, 0.1);
            color: #ff3b30;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            font-size: 14px;
            border-left: 3px solid #ff3b30;
        }
        
        .form-error-message i {
            margin-right: 10px;
            font-size: 16px;
        }
        
        .counter-completed {
            color: var(--accent-blue);
        }
        
        /* Animações para partículas tech */
        @keyframes techPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(0, 194, 255, 0.7);
                background-color: rgba(0, 194, 255, 0.7);
            }
            50% {
                box-shadow: 0 0 20px 10px rgba(0, 194, 255, 0);
                background-color: rgba(0, 194, 255, 0.3);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(0, 194, 255, 0);
                background-color: rgba(0, 194, 255, 0.7);
            }
        }
        
        /* Portfolio gallery modal */
        .portfolio-modal {
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        
        .portfolio-modal img {
            transform: scale(0.9);
            transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
    `;
    document.head.appendChild(styleElement);
}

// Função especial para a galeria de imagens no Portfolio
function setupPortfolioGallery() {
    const portfolioImgs = document.querySelectorAll('.portfolio-img img');
    
    portfolioImgs.forEach(img => {
        img.addEventListener('click', () => {
            // Cria modal para visualização ampliada
            const modal = document.createElement('div');
            modal.classList.add('portfolio-modal');
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('portfolio-modal-close');
            closeBtn.innerHTML = '&times;';
            
            modal.appendChild(closeBtn);
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Animação de entrada
            modal.style.opacity = '0';
            modalImg.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.opacity = '1';
                modalImg.style.transform = 'scale(1)';
            }, 10);
            
            // Adiciona eventos
            const closeModal = () => {
                modal.style.opacity = '0';
                modalImg.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 400);
            };
            
            modal.addEventListener('click', closeModal);
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeModal();
            });
            
            // Permitir fechar com ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
            
            // Efeito de zoom no hover
            modalImg.addEventListener('mouseenter', () => {
                modalImg.style.transform = 'scale(1.02)';
            });
            
            modalImg.addEventListener('mouseleave', () => {
                modalImg.style.transform = 'scale(1)';
            });
        });
        
        // Adiciona indicador de clique
        img.style.cursor = 'pointer';
        
        // Adiciona efeito de hover
        img.addEventListener('mouseenter', () => {
            const overlay = document.createElement('div');
            overlay.classList.add('portfolio-img-overlay');
            overlay.innerHTML = '<i class="fas fa-search-plus"></i>';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 112, 243, 0.3)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.color = 'white';
            overlay.style.fontSize = '24px';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.style.borderRadius = '12px';
            
            img.parentElement.style.position = 'relative';
            img.parentElement.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
        });
        
        img.addEventListener('mouseleave', () => {
            const overlay = img.parentElement.querySelector('.portfolio-img-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    img.parentElement.removeChild(overlay);
                }, 300);
            }
        });
    });
}

// Efeito de digitação para o título principal
function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        const typingSpeed = 50; // ms por caractere
        let i = 0;
        
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Adicionar cursor piscante no final
                heroTitle.innerHTML += '<span class="typing-cursor">|</span>';
                
                // Configurar animação do cursor
                const cursor = document.querySelector('.typing-cursor');
                cursor.style.animation = 'blink-cursor 0.7s infinite';
                
                // Adicionar estilo para o cursor
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes blink-cursor {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                
                // Remover cursor após 3 segundos
                setTimeout(() => {
                    cursor.style.opacity = '0';
                    cursor.style.transition = 'opacity 0.7s ease';
                }, 3000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
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
    setupPortfolioGallery();
    setupTypingEffect();
    
    // Inicializar o primeiro item do FAQ como aberto
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        const firstAnswer = firstFaqItem.querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
        }
    }
    
    // Adiciona feedback visual nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});