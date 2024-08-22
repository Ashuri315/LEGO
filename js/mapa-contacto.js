var mapa;

// Función para inicializar el mapa
function initializeMap() {
    if (mapa) {
        // Si el mapa ya está inicializado, lo eliminamos primero
        mapa.remove();
    }

    // Crear un nuevo mapa
    mapa = L.map('map').setView([9.940017, -84.143373], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    L.marker([9.940017, -84.143373]).addTo(mapa)
        .bindPopup("LEGO")
        .openPopup();

    L.circle([9.940017, -84.143373], {
        color: 'lightblue',
        fillColor: 'pink',
        fillOpacity: 0.5,
        radius: 100
    }).addTo(mapa);
}

// Llamar a la función para inicializar el mapa
initializeMap();
