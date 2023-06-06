//------------------------ Global Variables to be used ---------------------
const weatherApiKey = "01c2f043e94a1460b1f6d351b9f98ce6";
const weatherMainURL = "https://api.openweathermap.org";
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const todayContainer = document.querySelector("#today");
const forecastContainer = document.querySelector("#forecast");
const searchHistoryContainer = document.querySelector("#history");

// --------------------- Fetch weather data from API------------------------------------------

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=01c2f043e94a1460b1f6d351b9f98ce6"
)
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    console.log("We have weather data!", data);
  });

// Show previous searches for easy user access

function renderSearchHistory() {
  searchHistoryContainer.innerHTML = "";

  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-controls", "today forecast");
    btn.classList.add("history-btn", "btn-history");

    btn.setAttribute("data-search", searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);
  }
}
