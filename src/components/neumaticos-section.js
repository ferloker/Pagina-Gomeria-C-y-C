export const renderNeumaticos = (containerId, settings) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get specific settings with fallback
    const btnParams = settings.buttons && settings.buttons.neumaticos 
        ? settings.buttons.neumaticos 
        : { text: "Consultar disponibilidad", color: "#25D366", message: "Consulta sobre neumáticos" };

    const waLink = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(btnParams.message)}`;

    container.innerHTML = `
        <section class="neumaticos-section section-padding reveal">
            <div class="section-header text-center">
                <h2 class="title-main">VENTA DE NEUMÁTICOS</h2>
                <p class="subtitle">Nuevos y Usados</p>
            </div>
            
            <div class="cards-grid">
                <!-- Neumáticos Nuevos -->
                <div class="card card-glass card-hover">
                    <div class="card-image-wrapper">
                        <img src="/assets/images/nuevos.jpg" alt="Neumáticos Nuevos" class="card-media" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h3>Neumáticos Nuevos</h3>
                        <p>Trabajamos con las mejores marcas del mercado. Garantía total.</p>
                    </div>
                </div>

                <!-- Neumáticos Usados -->
                <div class="card card-glass card-hover">
                    <div class="card-image-wrapper">
                        <img src="/assets/images/usados.jpg" alt="Neumáticos Usados" class="card-media" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h3>Neumáticos Usados</h3>
                        <p>Excelente estado y seleccionados cuidadosamente para tu seguridad.</p>
                    </div>
                </div>
            </div>

            <div class="cta-centered">
                <a href="${waLink}" class="btn btn-whatsapp" target="_blank" style="background-color: ${btnParams.color} !important;">
                    ${btnParams.text}
                </a>
            </div>
        </section>
    `;
};
