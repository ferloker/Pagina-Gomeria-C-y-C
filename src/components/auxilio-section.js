export const renderAuxilio = (containerId, settings) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get specific settings with fallback
    const btnMotocarro = settings.buttons && settings.buttons.auxilioMotocarro 
        ? settings.buttons.auxilioMotocarro 
        : { text: "Pedir auxilio ahora", color: "#D72638", message: "Auxilio para mi vehículo" };
        
    const btnMoto = settings.buttons && settings.buttons.auxilioMoto 
        ? settings.buttons.auxilioMoto 
        : { text: "Pedir auxilio ahora", color: "#D72638", message: "Auxilio para Moto" };

    const waLinkMotocarro = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(btnMotocarro.message)}`;
    const waLinkMoto = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(btnMoto.message)}`;

    container.innerHTML = `
        <section class="auxilio-section section-padding reveal">
            <div class="section-header text-center">
                <h2 class="title-main">SERVICIO DE AUXILIOS</h2>
                <p class="subtitle">Atención en el lugar donde te quedes</p>
            </div>
            
            <div class="cards-grid">
                <!-- Tarjeta Auxilio 1 -->
                <div class="card card-glass card-hover">
                    <div class="card-image-wrapper">
                        <img src="/assets/images/motocarro.jpg" alt="Auxilio en Motocarro para Vehículos" class="card-media" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h3>Auxilio en Motocarro</h3>
                        <p>Rescate rápido para autos y camionetas. Vamos equipados con compresor y herramientas para calibrar o reparar tu rueda en donde estés.</p>
                        <a href="${waLinkMotocarro}" class="btn btn-primary w-100" target="_blank" style="background-color: ${btnMotocarro.color} !important;">${btnMotocarro.text}</a>
                    </div>
                </div>

                <!-- Tarjeta Auxilio 2 -->
                <div class="card card-glass card-hover">
                    <div class="card-image-wrapper">
                        <img src="/assets/images/moto.jpg" alt="Auxilio de Moto" class="card-media" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h3>Auxilio para Motos</h3>
                        <p>Desllante, emparche y servicios de emergencia rápidos para motocicletas.</p>
                        <a href="${waLinkMoto}" class="btn btn-primary w-100" target="_blank" style="background-color: ${btnMoto.color} !important;">${btnMoto.text}</a>
                    </div>
                </div>
            </div>
        </section>
    `;
};
