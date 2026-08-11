# ParkMe

ParkMe is a polished static parking finder and booking interface built with HTML, CSS, and vanilla JavaScript.

## Project Overview

This project demonstrates a multi-page client-side web app for discovering parking spaces, reviewing bookings, and managing a user profile.

The app uses:
- Leaflet.js for interactive maps
- OpenStreetMap tiles for map rendering
- `sessionStorage` to preserve location permission within a browser session
- Responsive UI components for desktop and mobile layouts

## Pages Included

- `login.html` — sign-in screen for returning users
- `mainpage.html` — homepage with geolocation-aware parking search and map display
- `book.html` — parking reservation page with location details and booking form
- `profile.html` — user profile dashboard with stats
- `about.html` — app introduction, brand information, and contact details

## Key Features

- Current location detection and nearby parking suggestions
- Interactive map markers for parking spots and exact user location
- Rich nearby parking cards with distance and pricing
- Seamless navigation between home, book, profile, and about pages
- Modern header and footer design across the site
- Mobile-friendly layout and responsive card-based UI

## File Structure

- HTML pages: `mainpage.html`, `book.html`, `profile.html`, `login.html`, `about.html`
- CSS files: `mainpage.css`, `book.css`, `profile.css`, `login.css`, `about.css`
- JavaScript files: `mainpage.js`, `book.js`, `profile.js`, `login.js`
- `README.md` — this documentation file

## Prerequisites

- Modern browser (Chrome, Edge, Firefox, Safari)
- Internet access for Leaflet CDN and OpenStreetMap tile loading

## Run Locally

From the project folder, use a static server. Example with Python 3:

```powershell
python -m http.server 8000
```

Open the site at:

```text
http://localhost:8000/mainpage.html
```

You may also use the VS Code Live Server extension for local preview.

## Upload Preparation

- Verify all HTML, CSS, and JS files are included in the upload package.
- Keep the `README.md` with project overview, running instructions, and file list.
- Ensure the site is served from a static host so Leaflet and OpenStreetMap assets load correctly.

## Troubleshooting

- If the map does not render, confirm the browser console for network errors or blocked CDN requests.
- If booking or search interactions fail, inspect the JavaScript console for runtime error details.
- If location is not available, allow browser location permissions and refresh the page.

## Credits

- Map library: Leaflet
- Map data: OpenStreetMap
- UI and scripting: built with HTML, CSS, and vanilla JavaScript

---

This README is ready for upload with clear instructions, page details, and usage guidance.