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
const searchInput = document.getElementById('search');

const breweries = [];
const markers = new Map();

function showFooterMessage(message) {
  footer.textContent = message;
}

function updateCount(visible, total) {
  showFooterMessage(`${visible} brasserie${visible > 1 ? 's' : ''} affichée${visible > 1 ? 's' : ''} sur ${total}`);
}

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function buildPopupContent(brewery) {
  const lines = [`<strong>${escapeHtml(brewery.name)}</strong>`];
  if (brewery.city) lines.push(`<div>${escapeHtml(brewery.city)}</div>`);
  if (brewery.website) {
    lines.push(
      `<a href="${escapeAttr(brewery.website)}" target="_blank" rel="noopener">Visiter le site web →</a>`
    );
  }
  return lines.join('');
}

function createMarkerFor(brewery) {
  return L.marker([brewery.lat, brewery.lon], { title: brewery.name })
    .bindPopup(buildPopupContent(brewery));
}

// Insensible casse + accents : normalise via NFD pour retirer les diacritiques.
function normalize(text) {
  return text.toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function applyFilter(query) {
  const needle = normalize(query.trim());
  let visible = 0;
  breweries.forEach(brewery => {
    const marker = markers.get(brewery.id);
    if (!marker) return;
    const matches = needle === '' || normalize(brewery.name).includes(needle);
    if (matches) {
      if (!map.hasLayer(marker)) marker.addTo(map);
      visible++;
    } else if (map.hasLayer(marker)) {
      map.removeLayer(marker);
    }
  });
  updateCount(visible, breweries.length);
}

searchInput.addEventListener('input', event => {
  applyFilter(event.target.value);
});

async function loadBreweries() {
  try {
    const response = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: OVERPASS_QUERY,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const list = data.elements.map(normalizeElement).filter(Boolean);
    list.forEach(brewery => {
      breweries.push(brewery);
      const marker = createMarkerFor(brewery).addTo(map);
      markers.set(brewery.id, marker);
    });
    updateCount(breweries.length, breweries.length);
  } catch (error) {
    showFooterMessage('Erreur reseau - donnees OpenStreetMap indisponibles');
    console.error('Echec du chargement des brasseries :', error);
  }
}

loadBreweries();
