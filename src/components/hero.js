export const renderHero = (containerId, settings) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get specific settings with fallback
    const logoSize = settings.whatsappLogoSize || 80;
    const btnParams = settings.buttons && settings.buttons.hero 
        ? settings.buttons.hero 
        : { text: "Contactanos por WhatsApp", color: "#25D366", message: "Hola, necesito asistencia mecánica." };

    // Build dynamic WhatsApp link based on granular settings
    const message = encodeURIComponent(btnParams.message);
    const waLink = `https://wa.me/${settings.whatsappNumber}?text=${message}`;

    container.innerHTML = `
        <section class="hero-section reveal">
            <div class="hero-content">
                <div class="logo-wrapper">
                    <img src="/assets/images/logo.png" alt="Gomería C y C" class="hero-logo">
                    <h1 class="hero-title">Gomería C y C</h1>
                </div>
                
                <div class="cta-wrapper">
                    <div class="whatsapp-badge">
                        <img src="/assets/icons/whatsapp.png" alt="WhatsApp" class="whatsapp-icon" style="width: ${logoSize}px; height: ${logoSize}px;">
                    </div>
                    
                    <a href="${waLink}" class="btn btn-whatsapp" target="_blank" style="background-color: ${btnParams.color} !important;">
                        ${btnParams.text}
                    </a>
                    
                    <p class="hero-aux-text">
                        Atención rápida por WhatsApp.<br>
                        Consultas, precios y envío de comprobantes.
                    </p>
                </div>
            </div>
        </section>
    `;
};
