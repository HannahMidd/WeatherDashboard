fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={01c2f043e94a1460b1f6d351b9f98ce6}")
.then (function(response) {
  return response.json():
})
.then (function(data) {
  console.log(We have weather data!)
});

