//------------------------ Global Variables to be used ---------------------
const weatherApiKey = "01c2f043e94a1460b1f6d351b9f98ce6";
const formEl = document.querySelector("#search-form");
const weatherMainURL = "https://api.openweathermap.org";

const citySearchBtn = document.querySelector("#citySearchBtn");
const cityEl = document.querySelector("#search-input");
const today = document.querySelector("#today");

const forecastContainer = document.querySelector("#forecast");
const searchHistoryContainer = document.querySelector("#history");
let historyArr = [];

// --------------------- Fetch weather data from API------------------------------------------
function weatherNow(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Woooo! We have weather data!", data);

      // Grab current weather & future 5-day weather
      weatherForecast(data[0].lat, data[0].lon);
    });
}

// gets current time, sets data on page
function currentWeatherText(weatherData) {
  console.log(`Weather Now:`);
  console.log(weatherData);

  //Show City name & current day
  cityEl.textContent = weatherData.city;
  let date = dayjs().format("DD MMM, YYYY");
  let currentHour = dayjs().format("h A");
  console.log(today.children)
  today.children[0].textContent = `Current Weather Today, ${date}, at ${currentHour}`;
  currentWeatherCard(weatherData);
}

// current weather card
function currentWeatherCard(weatherData) {
  // Create & append new data to current weather box:


  today.children[2].textContent = `Temp: ${weatherData.currentTemp}F`;
  today.children[3].textContent = `Wind: ${weatherData.wind}mph`;
  today.children[4].textContent = `Humidity: ${weatherData.humidity}%`;
  today.children[1].src = `https://openweathermap.org/img/w/${weatherData.weatherIcon}.png`;


}

// Fetch our 5 day forecast
function weatherForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`5 Day Weather Forecast`);
      console.log(data);

      let currentWeatherData = {
        city: data.city.name,
        currentTemp: data.list[0].main.temp,
        humidity: data.list[0].main.humidity,
        weatherIcon: data.list[0].weather[0].icon,
        wind: data.list[0].wind.speed,
      };
      currentWeatherText(currentWeatherData);

      let fiveDayForecast = [
        {
          time: dayjs(data.list[2].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[2].main.temp, // in F
          humidity: data.list[2].main.humidity,
          weatherIcon: data.list[2].weather[0].icon,
          wind: data.list[2].wind.speed, //mph
        },
        {
          time: dayjs(data.list[10].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[10].main.temp, // in F
          humidity: data.list[10].main.humidity,
          weatherIcon: data.list[10].weather[0].icon,
          wind: data.list[10].wind.speed, //mph
        },
        {
          time: dayjs(data.list[18].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[18].main.temp, // in F
          humidity: data.list[18].main.humidity,
          weatherIcon: data.list[18].weather[0].icon,
          wind: data.list[18].wind.speed, //mph
        },
        {
          time: dayjs(data.list[26].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[26].main.temp, // in F
          humidity: data.list[26].main.humidity,
          weatherIcon: data.list[26].weather[0].icon,
          wind: data.list[26].wind.speed, //mph
        },
        {
          time: dayjs(data.list[34].dt_txt).format("DD MMM, YYYY"),
          temp: data.list[34].main.temp, // in F
          humidity: data.list[34].main.humidity,
          weatherIcon: data.list[34].weather[0].icon,
          wind: data.list[34].wind.speed, //mph
        },
      ];
      for (i = 0; i < fiveDayForecast.length; i++) {
        forecastWeatherCard(fiveDayForecast);
      }
    });
}

function getStorage() {
  historyArr = JSON.parse(localStorage.getItem("stored-history")) || [];
}

// Repopulate the page - temp commenting out
// function savedWeather() {
//     let savedCity = JSON.parse(localStorage.getItem("Vero-Beach"));
//     console.log("Default City Location:");
//     console.log(savedCity);
//     weatherNow(savedCity.lat, savedCity.lon);
//     weatherForecast(savedCity.lat, savedCity.lon);
// }

function renderButtons() {
  for (var i = 0; i < historyArr.length; i++) {
    let savedCity = historyArr[i];
    let locationBtnEl = document.createElement("button");
    locationBtnEl.setAttribute(
      "class",
      "btn btn-primary text-start history-btn"
    );

    locationBtnEl.textContent = savedCity;
    searchHistoryContainer.appendChild(locationBtnEl);
    locationBtnEl.addEventListener("click", (event) => {
      weatherNow(event.target.textContent);
    });
  }
}

// Calling the functions
// savedWeather();
getStorage();
renderButtons();

// Apply the data to the cards!!!
function forecastWeatherCard(weatherData) {
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

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(cityEl.value);
  weatherNow(cityEl.value);
});
