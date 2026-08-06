# ParkMe

Simple static parking finder and booking UI built with HTML, CSS, and vanilla JavaScript.

## Overview

ParkMe is a small client-side project demonstrating a multi-page static site for discovering and booking parking spots. The project uses Leaflet (via CDN) for map rendering and simple DOM-based interactions for searching and booking flows.

## Features

- Search and view nearby parking spots on an interactive map
- Reserve a parking slot with basic form inputs and a confirmation message
- Profile page showing user stats
- Responsive layout for small screens

## Files

- `mainpage.html`, `book.html`, `profile.html`, `login.html` — main pages
- `mainpage.css`, `book.css`, `profile.css`, `login.css` — extracted styles
- `mainpage.js`, `book.js`, `profile.js`, `login.js` — page scripts
- `README.md` — this file

## Prerequisites

- Modern web browser (Chrome, Edge, Firefox, Safari)
- Internet connection to load Leaflet and map tiles (CDN + OpenStreetMap)

## Run locally

You can serve the folder with any static file server. Example using Python 3 (from the project root):

```powershell
python -m http.server 8000
```

Then open http://localhost:8000/mainpage.html in your browser.

Alternatively, use the VS Code Live Server extension.

## Notes for submission

- The app is static and requires internet for maps. If you must submit an offline package, remove or replace map functionality.
- All inline CSS/JS was moved to separate files for cleaner structure.

## Troubleshooting

- If maps do not appear, check the browser console for network errors (CDN or tile server blocked).
- For any JS errors, open the DevTools console to see stack traces and file references.

## License & Credits

Use as-is. Map tiles via OpenStreetMap; map library via Leaflet.