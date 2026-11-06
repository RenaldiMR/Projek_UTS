document.addEventListener("DOMContentLoaded", function () {
  if (typeof L === "undefined") return;
  const campus = [-6.926575719409608, 107.626200665495]; // koordinat contoh area kampus di Bandung
  const locations = [
    {name:"Kampus", coords:[-6.926575719409608, 107.626200665495]},
    {name:"Cicaheum", coords:[-6.90528, 107.65278]},
    {name:"Buah Batu", coords:[-6.960716, 107.666141]},
    {name:"Leuwipanjang", coords:[-6.945344, 107.593815]},
    {name:"Dago", coords:[-6.8728, 107.6161]},
    {name:"Antapani", coords:[-6.9078, 107.6619]},
    {name:"Cibiru", coords:[-6.92, 107.72]},
    {name:"Cicadas", coords:[-6.908333, 107.637222]},
    {name:"Sarijadi", coords:[-6.8713, 107.5804]},
    {name:"Ujung Berung", coords:[ -6.9119, 107.7006]},
    {name:"Kiaracondong", coords:[-6.92477, 107.64628]}
  ];
  
  function addMap(elementId, zoom) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const map = L.map(elementId).setView(campus, zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    locations.forEach(function(place) {
      L.marker(place.coords).addTo(map).bindPopup("<strong>" + place.name + "</strong>");
    });
    locations.slice(1).forEach(function(place) {
      L.polyline([place.coords,campus], {color:"#2874dc",weight:3,opacity:0.75,dashArray:"6 7"}).addTo(map);
    });
    if (elementId === "fullMap") {
      const group = L.featureGroup(locations.map(p => L.marker(p.coords)));
      map.fitBounds(group.getBounds().pad(0.2));
    }
    setTimeout(() => map.invalidateSize(), 200);
  }
  addMap("dashboardMap", 12);
  addMap("fullMap", 12);
});
