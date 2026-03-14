export const renderPayments = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <section class="payments-section section-padding reveal">
            <h2 class="title-underline">Pagos por transferencia</h2>
            <div class="card-glass">
                <ul class="payments-list">
                    <li>
                        <span class="label">Alias:</span>
                        <div class="value-wrapper">
                            <span class="value" id="alias-value">0973378073</span>
                            <button id="copy-alias" class="btn-copy" title="Copiar Alias">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                    </li>
                    <li>
                        <span class="label">Titular:</span>
                        <span class="value">Celso Martínez Martínez</span>
                    </li>
                    <li>
                        <span class="label">Banco:</span>
                        <span class="value">Familiar</span>
                    </li>
                </ul>
            </div>
        </section>

        <!-- Transfer Reminder Popup (Redesigned) -->
        <div id="transfer-reminder" class="popup-overlay">
            <div class="popup-card success-modal">
                <button class="popup-close" id="close-reminder">&times;</button>
                <div class="modal-grid">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-check">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h3>¡Alias Copiado!</h3>
                        </div>
                        <p class="modal-text">
                            ✅ ¡Alias Copiado! No olvides pasar el comprobante de pago por <strong>WhatsApp</strong> a <strong>Gomería C y C</strong> para confirmar tu transferencia.
                        </p>
                        <div class="modal-actions">
                            <a href="https://wa.me/595973378073" class="btn btn-whatsapp" target="_blank" style="width: auto;">
                                Enviar Comprobante
                            </a>
                            <button class="btn btn-secondary" id="close-reminder-btn">Cerrar</button>
                        </div>
                    </div>
                    <div class="modal-image-container">
                        <img src="/assets/images/transfer-success.png" alt="Confirmación de Pago" class="modal-illustration">
                    </div>
                </div>
            </div>
        </div>
    `;

    // Copy Logic
    const copyBtn = document.getElementById('copy-alias');
    const reminder = document.getElementById('transfer-reminder');
    const closeBtn = document.getElementById('close-reminder');
    const closeBtnInner = document.getElementById('close-reminder-btn');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const alias = document.getElementById('alias-value').innerText;
            navigator.clipboard.writeText(alias).then(() => {
                reminder.classList.add('active');
            });
        });
    }

    const closeModal = () => {
        reminder.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBtnInner) closeBtnInner.addEventListener('click', closeModal);

    // Close on overlay click
    reminder.addEventListener('click', (e) => {
        if (e.target === reminder) {
            closeModal();
        }
    });
};
