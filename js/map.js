// Initialize the map
const map = L.map('map').setView([28.3949, 84.1240], 7); // Nepal center

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load Nepal boundary GeoJSON
fetch('data/nepal_boundary.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        L.geoJson(data, {
            style: {
                color: '#4a4a4a',
                weight: 2,
                fillColor: '#c2c2c2',
                fillOpacity: 0.2
            }
        }).addTo(map);
        console.log("Nepal boundary loaded successfully.");
    })
    .catch(error => {
        console.error("Error loading Nepal boundary:", error);
    });

// Load glacier points GeoJSON
fetch('data/glacier_points.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.name && feature.properties.page) {
                    const popupContent = `
                        <b>${feature.properties.name}</b><br>
                        <a href="pages/${feature.properties.page}.html">View Details</a>
                    `;
                    layer.bindPopup(popupContent);
                    layer.on('click', function(e) {
                        map.flyTo(e.latlng, 9);
                        setTimeout(() => { layer.openPopup(); }, 800);
                        layer.once('click', function() {
                            window.location.href = `pages/${feature.properties.page}.html`;
                        });
                    });
                }
            }
        }).addTo(map);
        console.log("Glacier points loaded successfully.");
    })
    .catch(error => {
        console.error("Error loading glacier points:", error);
    });
    // Get a reference to the new button
const recenterBtn = document.getElementById('recenter-btn');

// Define the initial map view coordinates and zoom level
const initialCoords = [28.3949, 84.1240];
const initialZoom = 7;

// Add a click event listener to the button
recenterBtn.addEventListener('click', () => {
    // Set the map view back to the initial coordinates and zoom level
    map.setView(initialCoords, initialZoom);
});
