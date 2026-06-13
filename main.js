// Brasseries de Suisse - point d'entree
// Initialise une carte Leaflet centree sur la Suisse.

const SWITZERLAND_CENTER = [46.8, 8.3];
const DEFAULT_ZOOM = 8;

const map = L.map('map', {
  center: SWITZERLAND_CENTER,
  zoom: DEFAULT_ZOOM,
  zoomControl: true,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  maxZoom: 18,
}).addTo(map);
