import { renderHero } from '../components/hero.js';
import { renderPayments } from '../components/payments.js';
import { renderAuxilio } from '../components/auxilio-section.js';
import { renderNeumaticos } from '../components/neumaticos-section.js';
import { renderServicios } from '../components/servicios-section.js';
import { renderMaps } from '../components/maps-section.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Gomería C y C - Initializing...');

    let settings = {
        whatsappNumber: "595973378073",
        whatsappMessage: "Hola, necesito asistencia mecánica.",
        whatsappLogoSize: 80
    };

    try {
        const response = await fetch('/api/settings');
        if (response.ok) settings = await response.json();
    } catch (e) {
        // Silently use fallback settings if backend is not running
    }

    // Render Components with Settings
    renderHero('hero-container', settings);
    renderPayments('payments-container');
    renderAuxilio('auxilio-container', settings);
    renderNeumaticos('neumaticos-container', settings);
    renderServicios('servicios-container', settings);
    renderMaps('maps-container');

    // Setup WhatsApp FAB
    const fabButton = document.getElementById('whatsapp-fab');
    if (fabButton) {
        const messageEscaped = encodeURIComponent(settings.whatsappMessage || "Hola, necesito asistencia mecánica.");
        const phoneNoSpaces = (settings.whatsappNumber || "595973378073").replace(/\s+/g, '');
        fabButton.href = `https://wa.me/${phoneNoSpaces}?text=${messageEscaped}`;
    }

    // Initialize interactive features
    initAnimations();
});

// PWA Installation Logic
let deferredPrompt;
const installBanner = document.getElementById('pwa-install-banner');
const btnInstall = document.getElementById('btn-install-pwa');
const btnClose = document.getElementById('btn-close-pwa');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the custom install banner AFTER a short delay to not overwhelm the user
    if (!sessionStorage.getItem('pwaPromptClosed')) {
        setTimeout(() => {
            if(installBanner) installBanner.classList.add('show');
        }, 2000); 
    }
});

if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
        // Hide our user interface that shows our A2HS button
        installBanner.classList.remove('show');
        sessionStorage.setItem('pwaPromptClosed', 'true');
        // Show the prompt
        if (deferredPrompt) {
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }
    });
}

if (btnClose) {
    btnClose.addEventListener('click', () => {
        installBanner.classList.remove('show');
        sessionStorage.setItem('pwaPromptClosed', 'true');
    });
}
