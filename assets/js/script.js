//------------------------ Global Variables to be used ---------------------
const weatherApiKey = "01c2f043e94a1460b1f6d351b9f98ce6";
const searchInput = document.querySelector("#search-input");
const weatherMainURL = "https://api.openweathermap.org";

const citySearchBtn = document.querySelector("#citySearchBtn");
const today = document.querySelector("#today");
const todayWeather = today.children[0];
const forecastContainer = document.querySelector("#forecast");
const searchHistoryContainer = document.querySelector("#history");
const searchHistory = [];

// --------------------- Fetch weather data from API------------------------------------------
function weatherNow(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${weatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Woooo! We have weather data!", data);
      let currentWeatherData = {
        city: data.name,
        currentTemp: data.main.temp,
        maxDayTemp: data.main.temp_max,
        minDayTemp: data.main.temp_min,
        humidity: data.main.humidity,
        weatherDesc: data.weather[0].description,
        weatherIcon: data.weather[0].icon,
        wind: data.wind.speed,
      };
      currentWeatherText(currentWeatherData);

      // Store location data to local storage
      localStorage.setItem(data.name, JSON.stringify({ lat: lat, lon: lon }));

      // Grab current weather & future 5-day weather
      weatherNow(data.lat, data.lon);
      weatherForecast(data.lat, data.lon);
    });
}

// gets current time, sets data on page
function currentWeatherText(weatherData) {
  console.log(`Weather Now:`);
  console.log(weatherData);

  //Show City name & current day
  searchInput.textContent = weatherData.city;
  let today = dayjs().format("DD MMM, YYYY");
  let currentHour = dayjs().format("h A");
  todayWeather.textContent = `Current Weather Today, ${today}, at ${currentHour}`;
  currentWeatherCard(weatherData);
}

// current weather card
function currentWeatherCard(weatherData) {
  // Create & append new data to current weather box:
  let weatherContainer = document.createElement("div");
  let weatherTitle = document.createElement("p");
  let tempTitle = document.createElement("p");
  let minMaxTempText = document.createElement("p");
  let windText = document.createElement("p");
  let humidityText = document.createElement("p");
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${weatherData.weatherIcon}.png`
  );

  tempTitle.textContent = `Temp: ${weatherData.currentTemp}F`;
  minMaxTempText.textContent = `Max Temp: ${weatherData.maxDayTemp}F, 
   Min Temp: ${weatherData.minDayTemp}F`;
  windText.textContent = `Wind: ${weatherData.wind}mph`;
  humidityText.textContent = `Humidity: ${weatherData.humidity}%`;

  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(weatherTitle);
  weatherContainer.appendChild(tempTitle);
  weatherContainer.appendChild(minMaxTempText);
  weatherContainer.appendChild(windText);
  weatherContainer.appendChild(humidityText);
  today.children[0].appendChild(weatherContainer);
}

// gets 5 day forecast
function weatherForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`5 Day Weather Forecast`);
      console.log(data);
      let fiveDayForecast = [
        {
          time: dayjs(data.list[2].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[2].main.temp, // in F
          humidity: data.list[2].main.humidity,
          weatherDesc: data.list[2].weather[0].description,
          weatherIcon: data.list[2].weather[0].icon,
          wind: data.list[2].wind.speed, //mph
        },
        {
          time: dayjs(data.list[10].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[10].main.temp, // in F
          humidity: data.list[10].main.humidity,
          weatherDesc: data.list[10].weather[0].description,
          weatherIcon: data.list[10].weather[0].icon,
          wind: data.list[10].wind.speed, //mph
        },
        {
          time: dayjs(data.list[18].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[18].main.temp, // in F
          humidity: data.list[18].main.humidity,
          weatherDesc: data.list[18].weather[0].description,
          weatherIcon: data.list[18].weather[0].icon,
          wind: data.list[18].wind.speed, //mph
        },
        {
          time: dayjs(data.list[26].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[26].main.temp, // in F
          humidity: data.list[26].main.humidity,
          weatherDesc: data.list[26].weather[0].description,
          weatherIcon: data.list[26].weather[0].icon,
          wind: data.list[26].wind.speed, //mph
        },
        {
          time: dayjs(data.list[34].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[34].main.temp, // in F
          humidity: data.list[34].main.humidity,
          weatherDesc: data.list[34].weather[0].description,
          weatherIcon: data.list[34].weather[0].icon,
          wind: data.list[34].wind.speed, //mph
        },
      ];
      for (i = 0; i < fiveDayForecast.length; i++) {
        forecastWeatherCard(fiveDayForecast);
      }
    });
}

// forecast card
function forecastWeatherCard(weatherData) {
  // Create & append new data to current weather box:
  let weatherContainer = document.createElement("div");
  let weatherTitle = document.createElement("p");
  let tempTitle = document.createElement("p");
  let windText = document.createElement("p");
  let humidityText = document.createElement("p");
  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${weatherData[i].weatherIcon}.png`
  );

  forecastContainer.children[i].children[0].children[0].textContent =
    weatherData[i].time;
  tempTitle.textContent = `Temp: ${weatherData[i].temp}F`;
  windText.textContent = `Wind: ${weatherData[i].wind}mph`;
  humidityText.textContent = `Humidity: ${weatherData[i].humidity}%`;

  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(weatherTitle);
  weatherContainer.appendChild(tempTitle);
  weatherContainer.appendChild(windText);
  weatherContainer.appendChild(humidityText);
  forecastContainer.children[i].children[0].children[0].appendChild(
    weatherContainer
  );
}

function getStorage() {
  for (i = 0; i < localStorage.length; i++) {
    let storedCity = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let locationBtnEl = document.createElement("button");
    locationBtnEl.setAttribute(
      "class",
      "btn btn-primary text-start history-btn"
    );
    locationBtnEl.textContent = storedCity.city;
    searchHistoryContainer.appendChild(locationBtnEl);
    locationBtnEl.addEventListener("click", () => {
      weatherNow(storedCity.lat, storedCity.lon);
      weatherForecast(storedCity.lat, storedCity.lon);
    });
  }
}

function savedWeather() {
  let storedCity = JSON.parse(localStorage.getItem("Vero Beach"));
  console.log("Default City Location:");
  console.log(storedCity);
  weatherNow(storedCity.lat, storedCity.lon);
  weatherForecast(storedCity.lat, storedCity.lon);
}

savedWeather();
getStorage();
citySearchBtn.addEventListener("click", retrieveLocation);
