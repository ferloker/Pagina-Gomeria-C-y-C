export const renderServicios = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <section class="servicios-section section-padding reveal">
            <h2 class="title-underline">Otros servicios</h2>
            <div class="card-glass">
                <ul class="servicios-list">
                    <li>
                        <span class="dot"></span>
                        Cambio de aceite
                    </li>
                    <li>
                        <span class="dot"></span>
                        Corte de cadena
                    </li>
                    <li>
                        <span class="dot"></span>
                        Reparaciones varias
                    </li>
                </ul>
            </div>
        </section>
    `;
};
