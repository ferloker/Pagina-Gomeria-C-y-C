export const renderMaps = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Target coordinates
    const lng = -56.44220399682009;
    const lat = -24.661127442682776;

    container.innerHTML = `
        <section class="maps-section section-padding reveal">
            <h2 class="title-underline">Ubicación</h2>
            
            <div class="maps-card card-glass" style="padding: 0; overflow: hidden;">
                <!-- Map Container -->
                <div id="map" style="width: 100%; height: 350px; background-color: #1a1a1a;"></div>
                
                <div class="maps-footer" style="padding: 20px;">
                    <div class="maps-header" style="margin-bottom: 20px;">
                        <img src="/assets/icons/map.svg" alt="Ubicación" class="icon-large">
                        <div class="address-info">
                            <h3>Estamos ubicados en</h3>
                            <p>Coronel Zoilo González c/ Teniente Quintana</p>
                        </div>
                    </div>
                    
                    <a href="https://maps.app.goo.gl/V6752dxabPsX1KqWA" 
                       class="btn btn-primary" 
                       target="_blank">
                        Abrir en Google Maps
                    </a>
                </div>
            </div>
        </section>
    `;

    // Initialize MapLibre after the DOM is updated
    setTimeout(() => {
        if (!window.maplibregl) {
            console.error("MapLibre GL JS not loaded.");
            return;
        }

        const map = new window.maplibregl.Map({
            container: 'map', // container id
            style: 'https://tiles.openfreemap.org/styles/liberty', // OpenFreeMap 3D style
            center: [lng, lat],
            zoom: 13, // Start a bit zoomed out for the animation effect
            pitch: 0,
            interactive: true
        });

        // Add a marker
        new window.maplibregl.Marker({ color: "#D72638" })
            .setLngLat([lng, lat])
            .addTo(map);

        // Animate down to 3D view on load
        map.on('load', () => {
            map.flyTo({
                zoom: 16,
                pitch: 60, // 3D tilt
                bearing: 0,
                duration: 3000, // 3 seconds smooth animation
                essential: true
            });
        });
    }, 100);
};
