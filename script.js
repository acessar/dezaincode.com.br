// JavaScript para a loja Belle Rose
document.addEventListener('DOMContentLoaded', function() {
    // Remover qualquer fundo ou efeito da logo, garantindo transparência
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    if (logoPlaceholder) {
        logoPlaceholder.style.backgroundColor = 'transparent';
        // Remover qualquer efeito de brilho existente
        const glossyEffect = logoPlaceholder.querySelector('.glossy-effect');
        if (glossyEffect) {
            glossyEffect.remove();
        }
    }
    
    // Verificar o status da loja no carregamento inicial
    checkStoreStatus();
    
    // Adicionar efeitos hover nos itens sociais
    addSocialItemsHoverEffect();
    
    // Adicionar efeitos de brilho nos links
    addShimmerEffects();
    
    // Configurar a funcionalidade para copiar o texto de localização
    setupLocationCopy();
    
    // Atualizar o status a cada minuto
    setInterval(checkStoreStatus, 60000);
});

// Função para verificar se a loja está aberta ou fechada
function checkStoreStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    
    // Definição dos horários de funcionamento
    const openTime = 9 * 60; // 09:00
    const closeTimeWeekday = 18 * 60; // 18:00
    const closeTimeSaturday = 13 * 60; // 13:00
    
    let isOpen = false;
    
    // Verifica se está dentro do horário de funcionamento
    if (day >= 1 && day <= 5) { // Segunda a Sexta
        isOpen = currentTime >= openTime && currentTime < closeTimeWeekday;
    } else if (day === 6) { // Sábado
        isOpen = currentTime >= openTime && currentTime < closeTimeSaturday;
    }
    
    // Atualiza o indicador de status
    const statusEl = document.getElementById('status');
    if (statusEl) {
        if (isOpen) {
            statusEl.innerHTML = '<div class="status-dot"></div><span>Loja Aberta</span>';
            statusEl.className = 'status-indicator status-open';
        } else {
            statusEl.innerHTML = '<div class="status-dot"></div><span>Loja Fechada</span>';
            statusEl.className = 'status-indicator status-closed';
        }
    }
}

// Efeito de hover nos itens de redes sociais
function addSocialItemsHoverEffect() {
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Adicionar efeito de brilho nos links sociais
function addShimmerEffects() {
    document.querySelectorAll('.social-link').forEach(link => {
        // Adicionar efeito de brilho apenas aos links que ainda não o têm
        if (!link.querySelector('.shimmer-effect')) {
            const shimmerEffect = document.createElement('div');
            shimmerEffect.className = 'shimmer-effect';
            shimmerEffect.style.position = 'absolute';
            shimmerEffect.style.top = '0';
            shimmerEffect.style.left = '0';
            shimmerEffect.style.right = '0';
            shimmerEffect.style.bottom = '0';
            shimmerEffect.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)';
            shimmerEffect.style.backgroundSize = '200% 200%';
            shimmerEffect.style.animation = 'linkShimmerDiagonal 4s ease-in-out infinite';
            shimmerEffect.style.pointerEvents = 'none';
            shimmerEffect.style.zIndex = '1';
            shimmerEffect.style.opacity = '0';
            
            link.style.position = 'relative';
            link.style.overflow = 'hidden';
            link.appendChild(shimmerEffect);
            
            // Adicionar efeito de hover para mostrar o brilho
            link.addEventListener('mouseenter', () => {
                shimmerEffect.style.opacity = '1';
            });
            
            link.addEventListener('mouseleave', () => {
                shimmerEffect.style.opacity = '0';
            });
        }
    });
    
    // Adicionar a animação de brilho ao CSS se ainda não existir
    if (!document.querySelector('style#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes linkShimmerDiagonal {
                0% { background-position: 200% -100%; }
                100% { background-position: -100% 200%; }
            }
            
            @keyframes glossyDiagonal {
                0% { background-position: 200% -100%; opacity: 0; }
                50% { opacity: 0.7; }
                100% { background-position: -100% 200%; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Configurar funcionalidade para facilitar a cópia do texto de localização
function setupLocationCopy() {
    const locationDiv = document.querySelector('.location-div');
    const locationText = document.querySelector('.copyable-location');
    const copyIcon = document.querySelector('.location-copy-icon');
    
    if (locationDiv && locationText) {
        // Adicionar classe de animação pulsante para chamar atenção
        locationDiv.classList.add('location-pulse');
        
        // Adicionar feedback visual ao clicar no texto ou no ícone
        const handleCopyClick = () => {
            // Tenta copiar o texto para a área de transferência usando a API Clipboard moderna
            const textToCopy = locationText.textContent;
            
            if (navigator.clipboard && window.isSecureContext) {
                // Para navegadores modernos em contextos seguros
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showCopyFeedback(locationDiv, locationText, textToCopy);
                    })
                    .catch(err => {
                        console.error('Erro ao copiar com Clipboard API: ', err);
                        fallbackCopy();
                    });
            } else {
                // Fallback para método mais antigo
                fallbackCopy();
            }
            
            function fallbackCopy() {
                // Seleciona todo o texto quando clicado
                const range = document.createRange();
                range.selectNodeContents(locationText);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
                // Tenta copiar o texto
                try {
                    document.execCommand('copy');
                    showCopyFeedback(locationDiv, locationText, textToCopy);
                } catch (err) {
                    console.error('Erro ao copiar o texto: ', err);
                    alert('Não foi possível copiar automaticamente. Por favor, selecione o texto manualmente e copie (Ctrl+C / Cmd+C).');
                }
            }
        };
        
        // Adicionar evento de clique tanto no div quanto no ícone
        locationDiv.addEventListener('click', handleCopyClick);
        if (copyIcon) {
            copyIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Previne o disparo duplo do evento
                handleCopyClick();
            });
        }
        
        // Remover a pulsação após 5 segundos (para não ser muito intrusivo)
        setTimeout(() => {
            locationDiv.classList.remove('location-pulse');
        }, 5000);
    }
}

// Função para mostrar feedback visual ao copiar
function showCopyFeedback(element, textElement, originalText) {
    // Armazenar o texto original
    const originalContent = textElement.innerHTML;
    
    // Criar div de confirmação animada
    const confirmDiv = document.createElement('div');
    confirmDiv.innerHTML = '✓ Endereço copiado!';
    confirmDiv.style.position = 'absolute';
    confirmDiv.style.top = '50%';
    confirmDiv.style.left = '50%';
    confirmDiv.style.transform = 'translate(-50%, -50%)';
    confirmDiv.style.backgroundColor = 'rgba(46, 204, 113, 0.9)';
    confirmDiv.style.color = 'white';
    confirmDiv.style.padding = '10px 15px';
    confirmDiv.style.borderRadius = '4px';
    confirmDiv.style.fontSize = '14px';
    confirmDiv.style.fontWeight = 'bold';
    confirmDiv.style.zIndex = '100';
    confirmDiv.style.opacity = '0';
    confirmDiv.style.transition = 'all 0.3s ease';
    
    // Adicionar glow ao redor do elemento
    element.style.boxShadow = '0 0 15px rgba(46, 204, 113, 0.8)';
    element.style.borderColor = '#2ecc71';
    
    // Adicionar confirmação ao elemento
    element.style.position = 'relative';
    element.appendChild(confirmDiv);
    
    // Esconder o texto original
    textElement.style.opacity = '0';
    
    // Mostrar confirmação com animação
    setTimeout(() => {
        confirmDiv.style.opacity = '1';
    }, 10);
    
    // Limpar a seleção
    window.getSelection().removeAllRanges();
    
    // Restaurar o elemento ao estado original após 2 segundos
    setTimeout(() => {
        textElement.style.opacity = '1';
        element.style.boxShadow = '';
        element.style.borderColor = '';
        confirmDiv.style.opacity = '0';
        
        setTimeout(() => {
            element.removeChild(confirmDiv);
        }, 300);
    }, 2000);
}