var mapa = L.map('map').setView([9.940017,-84.143373], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

L.marker([9.940017,-84.143373]).addTo(mapa)
    .bindPopup("LEGO")
    .openPopup();

L.circle([9.940017,-84.143373], {
    color: 'lightblue',
    fillColor: 'pink',
    fillOpacity: 0.5,
    radius: 100
}).addTo(mapa);
