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

const map = L.map('myMap').setView([20.5937, 78.9629], 4);
// const marker = L.marker([0, 0]).addTo(map);

const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl);
tiles.addTo(map);

// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     setTimeout(function () { map.invalidateSize() }, 1)
//     const target = document.querySelector(tab.dataset.tabTarget)
//     tabContents.forEach(tabContent => {
//         tabContent.classList.remove('active')
//     })
//     tabs.forEach(tab => {
//         tab.classList.remove('active')
//     })
//     tab.classList.add('active')
//     target.classList.add('active')
//   })
// })



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