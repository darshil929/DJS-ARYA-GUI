const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    setTimeout(function () { map.invalidateSize() }, 1)
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
        tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

const map = L.map('myMap').setView([19.2105, 72.8242], 14);
// const marker = L.marker([0, 0]).addTo(map);

const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl);
tiles.addTo(map);

// var marker = L.marker([19.2105, 72.8242]).addTo(map);

//Making a marker with a custom icon
const myIcon = L.icon({
  iconUrl: './cansat_icon.png',
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
const marker = L.marker([19.2105, 72.8242], {icon: myIcon}).addTo(map);            // Launch site



// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// // Get the header
// var header = document.getElementById("thead");

// // Get the offset position of the navbar
// var sticky = header.offsetTop;

// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }
