// get ISS location
const API = "https://api.wheretheiss.at/v1/satellites/25544"
async function getISSLocation() {
    const resp = await fetch(API)
    const result = await resp.json()
    return result
}

function updateMap(result) {
    // Variables
    const latitude = result.latitude
    const longitude = result.longitude

    // Update map and marker
    map.setView([latitude, longitude])
    issMarker.setLatLng([latitude, longitude])

    // Update coordinates
    document.querySelector(".platuma span").innerText = result.latitude.toFixed(2) + "°"
    document.querySelector(".ilguma span").innerText = result.longitude.toFixed(2) + "°"
}

// Load map
var map = L.map('issMap').setView([0, 0.0], 8);
var icon = L.icon({
    iconUrl: '../assets/iss200.png',
    iconSize: [50, 32]
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const issMarker = L.marker([55.93, 23.31], {icon: icon}).addTo(map)

// Update satelite position
let number = 24
setInterval(function(){
    getISSLocation().then(updateMap)
}, 1000)

// First load
getISSLocation().then(updateMap)
