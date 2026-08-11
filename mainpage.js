const map = L.map('map').setView([40.7128, -74.006], 13);
const nearbyList = document.getElementById('nearbyList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

const areaLocations = {
  central: { lat: 51.5074, lng: -0.1278, label: 'Central London' },
  west: { lat: 51.509, lng: -0.132, label: 'West London' },
  east: { lat: 51.5033, lng: -0.1195, label: 'East London' },
  default: { lat: 40.7128, lng: -74.006, label: 'Default area' },
};

function showNearbySpaces(lat, lng, areaLabel = 'your area') {
  const spaces = [
    { name: 'Central Plaza', distance: '180 m', price: 8.5, latOffset: 0.0012, lngOffset: 0.0013, bookLat: lat + 0.0012, bookLng: lng + 0.0013 },
    { name: 'River Street', distance: '320 m', price: 7.25, latOffset: -0.0014, lngOffset: 0.0016, bookLat: lat - 0.0014, bookLng: lng + 0.0016 },
    { name: 'Metro Lane', distance: '470 m', price: 6.75, latOffset: 0.0018, lngOffset: -0.0012, bookLat: lat + 0.0018, bookLng: lng - 0.0012 },
  ];

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
      map.removeLayer(layer);
    }
  });

  L.circleMarker([lat, lng], {
    radius: 10,
    color: '#14476c',
    fillColor: '#fff',
    fillOpacity: 1,
    weight: 3,
  })
    .addTo(map)
    .bindPopup(`Your exact location: ${areaLabel}`)
    .openPopup();

  spaces.forEach((space) => {
    L.marker([space.bookLat, space.bookLng])
      .addTo(map)
      .bindPopup(`<b>${space.name}</b><br>Price: £${space.price.toFixed(2)}<br>${space.distance} away`);
  });

  nearbyList.innerHTML = spaces
    .map(
      (space) => `
        <div class="nearby-card">
          <div class="nearby-info">
            <h4>${space.name}</h4>
            <p class="nearby-badge">${space.distance} away</p>
            <p>Price: £${space.price.toFixed(2)}</p>
          </div>
          <div class="nearby-actions">
            <button type="button" onclick="goToBooking('${space.name}', ${space.bookLat}, ${space.bookLng})">Reserve</button>
          </div>
        </div>
      `
    )
    .join('');
}

function showFallbackSpaces() {
  showNearbySpaces(areaLocations.default.lat, areaLocations.default.lng, areaLocations.default.label);
}

function searchArea() {
  const query = searchInput.value.trim().toLowerCase();
  if (query.includes('central')) {
    showNearbySpaces(areaLocations.central.lat, areaLocations.central.lng, areaLocations.central.label);
  } else if (query.includes('west')) {
    showNearbySpaces(areaLocations.west.lat, areaLocations.west.lng, areaLocations.west.label);
  } else if (query.includes('east')) {
    showNearbySpaces(areaLocations.east.lat, areaLocations.east.lng, areaLocations.east.label);
  } else if (query) {
    showNearbySpaces(areaLocations.default.lat, areaLocations.default.lng, query);
  } else {
    showFallbackSpaces();
  }
}

function goToBooking(name, lat, lng) {
  const params = new URLSearchParams({
    name: name,
    lat: lat,
    lng: lng,
  });
  window.location.href = `book.html?${params.toString()}`;
}

searchButton.addEventListener('click', searchArea);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchArea();
  }
});

const geoRequested = sessionStorage.getItem('parkme-geo-requested') === 'true';
const storedLatitude = parseFloat(sessionStorage.getItem('parkme-geo-lat'));
const storedLongitude = parseFloat(sessionStorage.getItem('parkme-geo-lng'));
const hasStoredLocation = !Number.isNaN(storedLatitude) && !Number.isNaN(storedLongitude);

function storeLocation(latitude, longitude) {
  sessionStorage.setItem('parkme-geo-requested', 'true');
  sessionStorage.setItem('parkme-geo-lat', latitude.toString());
  sessionStorage.setItem('parkme-geo-lng', longitude.toString());
}

if (navigator.geolocation) {
  if (geoRequested) {
    if (hasStoredLocation) {
      map.setView([storedLatitude, storedLongitude], 15);
      showNearbySpaces(storedLatitude, storedLongitude, 'your current location');
    } else {
      showFallbackSpaces();
    }
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        storeLocation(latitude, longitude);
        map.setView([latitude, longitude], 15);
        showNearbySpaces(latitude, longitude, 'your current location');
      },
      () => {
        sessionStorage.setItem('parkme-geo-requested', 'true');
        showFallbackSpaces();
      }
    );
  }
} else {
  showFallbackSpaces();
}
