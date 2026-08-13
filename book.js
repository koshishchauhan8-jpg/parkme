const map = L.map('map').setView([51.5074, -0.1278], 13);
const mapMessage = document.getElementById('mapMessage');
const params = new URLSearchParams(window.location.search);
const preselectedName = params.get('name');
const preselectedLat = parseFloat(params.get('lat'));
const preselectedLng = parseFloat(params.get('lng'));
const selectedLocationInput = document.getElementById('selectedLocation');
const arrivalTimeInput = document.getElementById('arrivalTime');
const durationInput = document.getElementById('duration');
const paymentMethodInput = document.getElementById('paymentMethod');
const extraOptionInput = document.getElementById('extraOption');
const advanceBookingInput = document.getElementById('advanceBooking');
const bookingCountInput = document.getElementById('bookingCount');
const carModelInput = document.getElementById('carModel');
const plateNumberInput = document.getElementById('plateNumber');
const cardNumberInput = document.getElementById('cardNumber');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');
const priceBox = document.getElementById('priceBox');
const priceSummary = document.getElementById('priceSummary');
const confirmBox = document.getElementById('confirmBox');
const confirmButton = document.getElementById('confirmBooking');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

const parkingPrices = {
  'Central Plaza': 8.5,
  'River View': 10,
  'Metro Station': 6.75,
  'City Center': 9.25,
};

function updatePrice(name) {
  const basePrice = parkingPrices[name] || 8.5;
  const hours = parseInt(durationInput.value, 10) || 1;
  const total = (basePrice * hours).toFixed(2);
  priceSummary.innerHTML = `Parking at <strong>${name}</strong> for <strong>${hours}</strong> hour(s)<br>Total: <strong>£${total}</strong>`;
}

function showParkingLocation(name, lat, lng) {
  map.setView([lat, lng], 15);
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  selectedLocationInput.value = name;
  updatePrice(name);
  L.marker([lat, lng]).addTo(map).bindPopup(`<b>${name}</b><br>Parking location`).openPopup();
  mapMessage.textContent = `Directions to ${name} are now shown on the map.`;
}

if (preselectedName && !Number.isNaN(preselectedLat) && !Number.isNaN(preselectedLng)) {
  showParkingLocation(preselectedName, preselectedLat, preselectedLng);
}

const geoRequested = sessionStorage.getItem('parkme-geo-requested') === 'true';
const storedLatitude = parseFloat(sessionStorage.getItem('parkme-geo-lat'));
const storedLongitude = parseFloat(sessionStorage.getItem('parkme-geo-lng'));
const hasStoredLocation = !Number.isNaN(storedLatitude) && !Number.isNaN(storedLongitude);

function storeLocation(latitude, longitude) {
  sessionStorage.setItem('parkme-geo-requested', 'true');
  sessionStorage.setItem('parkme-geo-lat', latitude.toString());
  sessionStorage.setItem('parkme-geo-lng', longitude.toString());
}

function addUserLocationMarker(latitude, longitude) {
  L.marker([latitude, longitude]).addTo(map).bindPopup('Your current location').openPopup();
}

if (navigator.geolocation) {
  if (geoRequested) {
    if (hasStoredLocation) {
      addUserLocationMarker(storedLatitude, storedLongitude);
    } else {
      L.marker([51.5074, -0.1278]).addTo(map).bindPopup('Default location').openPopup();
    }
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        storeLocation(latitude, longitude);
        addUserLocationMarker(latitude, longitude);
      },
      () => {
        sessionStorage.setItem('parkme-geo-requested', 'true');
        L.marker([51.5074, -0.1278]).addTo(map).bindPopup('Default location').openPopup();
      }
    );
  }
} else {
  L.marker([51.5074, -0.1278]).addTo(map).bindPopup('Default location').openPopup();
}

document.querySelectorAll('.reserve-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const lat = parseFloat(button.getAttribute('data-lat'));
    const lng = parseFloat(button.getAttribute('data-lng'));
    showParkingLocation(name, lat, lng);
  });
});

durationInput.addEventListener('change', () => {
  const location = selectedLocationInput.value;
  if (location) {
    updatePrice(location);
  }
});


confirmButton.addEventListener('click', () => {
  const location = selectedLocationInput.value;
  const arrivalTime = arrivalTimeInput.value || 'Not selected';
  const duration = durationInput.value;
  const paymentMethod = paymentMethodInput.value;
  const extraOption = extraOptionInput.value;
  const advanceBooking = advanceBookingInput.value;
  const bookingCount = bookingCountInput.value;
  const carModel = carModelInput.value || 'Not provided';
  const plateNumber = plateNumberInput.value || 'Not provided';
  const cardNumber = cardNumberInput.value.replace(/\D/g, '');
  const maskedCard = cardNumber ? `•••• ${cardNumber.slice(-4)}` : 'Not provided';
  const confirmationNumber = `PKM-${Math.floor(1000 + Math.random() * 9000)}`;
  const basePrice = parkingPrices[location] || 8.5;
  const totalPrice = (basePrice * parseInt(duration, 10) * parseInt(bookingCount, 10)).toFixed(2);

  confirmBox.style.display = 'block';
  confirmBox.innerHTML = `Booking confirmed!<br>Confirmation number: ${confirmationNumber}<br>Location: ${location}<br>Arrival: ${arrivalTime}<br>Duration: ${duration} hour(s)<br>Payment: ${paymentMethod}<br>Advance booking: ${advanceBooking}<br>Bookings: ${bookingCount}<br>Car model: ${carModel}<br>Plate number: ${plateNumber}<br>Card: ${maskedCard}<br>Total amount: £${totalPrice}`;
});

