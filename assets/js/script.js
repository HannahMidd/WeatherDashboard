// Grab latitude, longitude and app ID from city user entered:
let lat;
let lon;
let appid;

// --------------------- Fetch that data from API------------------------------------------

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`)

.then (function(response) {
  return response.json();
})

.then (function(data) {
  console.log("We have weather data!", data);
});


