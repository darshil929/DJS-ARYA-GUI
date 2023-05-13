// MAP
const map = L.map('myMap', {
  maxZoom: 16,
  minZoom: 12
})
.setView([19.1075, 72.8372], 14);        // College
// .setView([19.2105, 72.8242], 14);            // Home
// .setView([37.20048, -80.5644], 14);          // Launch site

// const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

// const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl = 'http://localhost:5001/images/{z}/{x}/{y}.png';

// const tiles = L.tileLayer(tileUrl, {attribution});
const tiles = L.tileLayer(tileUrl);
tiles.addTo(map);

// var marker = L.marker([19.2105, 72.8242]).addTo(map);

//Making a marker with a custom icon
const myIcon = L.icon({
  iconUrl: '../images/cansat_icon.png',
  iconSize: [120, 60],
  iconAnchor: [50, 33],
  // popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
});

//Marker
const marker = L.marker([19.1075, 72.8372], {icon: myIcon}).addTo(map);        // College
// const marker = L.marker([37.236262, -80.4460145], {icon: myIcon}).addTo(map);      // Blacksburg
// const marker = L.marker([19.2105, 72.8242], {icon: myIcon}).addTo(map);            // Home
// const marker = L.marker([37.20048, -80.5644], {icon: myIcon}).addTo(map);          // Launch site