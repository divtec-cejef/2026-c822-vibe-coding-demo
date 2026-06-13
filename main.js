// Brasseries de Suisse - point d'entree

const SWITZERLAND_CENTER = [46.8, 8.3];
const DEFAULT_ZOOM = 8;
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const OVERPASS_QUERY = `
[out:json][timeout:25];
area["ISO3166-1"="CH"]->.ch;
(
  nwr["craft"="brewery"](area.ch);
  nwr["microbrewery"="yes"](area.ch);
  nwr["industrial"="brewery"](area.ch);
);
out center;
`.trim();

const map = L.map('map', {
  center: SWITZERLAND_CENTER,
  zoom: DEFAULT_ZOOM,
  zoomControl: true,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  maxZoom: 18,
}).addTo(map);

const footer = document.getElementById('footer');

function showFooterMessage(message) {
  footer.textContent = message;
}

// Convertit un element Overpass en objet brasserie utilisable.
function normalizeElement(element) {
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;
  return {
    id: element.id,
    name: element.tags?.name ?? 'Brasserie sans nom',
    lat,
    lon,
    city: element.tags?.['addr:city'] ?? null,
    website: element.tags?.website ?? null,
  };
}

async function loadBreweries() {
  try {
    const response = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: OVERPASS_QUERY,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const breweries = data.elements.map(normalizeElement).filter(Boolean);
    breweries.forEach(addBreweryMarker);
    showFooterMessage(`${breweries.length} brasseries affichees`);
  } catch (error) {
    showFooterMessage('Erreur reseau - donnees OpenStreetMap indisponibles');
    console.error('Echec du chargement des brasseries :', error);
  }
}

function addBreweryMarker(brewery) {
  L.marker([brewery.lat, brewery.lon], {
    title: brewery.name,
  }).addTo(map);
}

loadBreweries();
