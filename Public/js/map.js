//MAP
//Making a map and tiles
const mymap = L.map('map-div',{
    maxZoom: 16,
    minZoom: 12
    })
    // .setView([19.076090, 72.877426], 12);        // Mumbai
    // .setView([37.236262, -80.4460145], 12);      // Blacksburg
    .setView([37.19903, -80.57739], 12);            // Launch site
// const attribution = '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl = 'http://localhost:5001/images/{z}/{x}/{y}.png';

// const tiles = L.tileLayer(tileUrl, {attribution});
const tiles = L.tileLayer(tileUrl);
tiles.addTo(mymap);

//Making a marker with a custom icon
const myIcon = L.icon({
    iconUrl: 'images/cansat_icon.png',
    iconSize: [120, 60],
    iconAnchor: [50, 33],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

//Marker
// const marker = L.marker([19.076090, 72.877426], {icon: myIcon}).addTo(mymap);        // Mumbai
// const marker = L.marker([37.236262, -80.4460145], {icon: myIcon}).addTo(mymap);      // Blacksburg
const marker = L.marker([37.19903, -80.57739], {icon: myIcon}).addTo(mymap);            // Launch site