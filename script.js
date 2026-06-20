const apiKey = "37fde91caf5efbacda3a9e1c0cf430d0";

const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uvIndex");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const apparentTemp = document.getElementById("apparentTemp");

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const forecastContainer = document.getElementById("forecastContainer");
const hourlyForecast = document.getElementById("hourlyForecast");

const favoriteCities = document.getElementById("favoriteCities");
const saveBtn = document.getElementById("saveBtn");
console.log(saveBtn);
console.log(favoriteCities);
const historyCities = document.getElementById("historyCities");

const themeBtn = document.getElementById("themeBtn");



let chart;



// Search weather
searchBtn.addEventListener("click", () => {
    let city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
        saveHistory(city);
    }
});
favoriteCities.addEventListener("change", () => {

    let selectedCity = favoriteCities.value;

    if(selectedCity !== ""){

        cityInput.value = selectedCity;

        getWeather(selectedCity);

        saveHistory(selectedCity);

    }

});
saveBtn.addEventListener("click", () => {

    let city = cityName.textContent.trim();

    if(city && city !== "--"){

        let favorites =
        JSON.parse(localStorage.getItem("favoriteCities")) || [];

        if(!favorites.includes(city)){

            favorites.push(city);

            localStorage.setItem(
                "favoriteCities",
                JSON.stringify(favorites)
            );

            populateFavorites();

            favoriteCities.value = city;

            alert(city + " saved to favorites ⭐");

        }
        else{

            alert(city + " is already in favorites ⭐");

        }

    }

});
// Dark mode
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// Main weather function
async function getWeather(city){

    let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);

    let data = await response.json();
    if (data.cod != 200) {
        alert(data.message);
    return;
}

    cityName.innerHTML = data.name;
    weatherDescription.innerHTML = data.weather[0].description;

    temperature.innerHTML =
    Math.round(data.main.temp) + "°C";

    feelsLike.innerHTML =
    "Feels Like " + Math.round(data.main.feels_like) + "°C";

    humidity.innerHTML =
    data.main.humidity + "%";

    wind.innerHTML =
    data.wind.speed + " km/h";

    pressure.innerHTML =
    data.main.pressure + " hPa";

    visibility.innerHTML =
    (data.visibility / 1000) + " km";

    apparentTemp.innerHTML =
    Math.round(data.main.feels_like) + "°C";

    let rise =
    new Date(data.sys.sunrise * 1000);

    sunrise.innerHTML =
    rise.toLocaleTimeString();

    let set =
    new Date(data.sys.sunset * 1000);

    sunset.innerHTML =
    set.toLocaleTimeString();
    console.log(data.weather[0].main);
console.log(data.weather[0].description);

changeIcon(data.weather[0].description);

    setWeatherCardBackground(data.weather[0].main);

    getForecast(city);

    getHourlyForecast(city);

    getChart(city);

    aiSuggestion(data);

    weatherAlerts(data);
}

// Change icon
function changeIcon(condition){

    condition = condition.toLowerCase();

    if(
        condition.includes("clear sky")
    ){

        weatherIcon.innerHTML = "☀️";

    }

    else if(
        condition.includes("few clouds") ||
        condition.includes("scattered clouds") ||
        condition.includes("broken clouds") ||
        condition.includes("overcast clouds")
    ){

        weatherIcon.innerHTML = "☁️";

    }

    else if(
        condition.includes("rain")
    ){

        weatherIcon.innerHTML = "🌧️";

    }

    else if(
        condition.includes("drizzle")
    ){

        weatherIcon.innerHTML = "🌦️";

    }

    else if(
        condition.includes("thunderstorm")
    ){

        weatherIcon.innerHTML = "⛈️";

    }

    else if(
        condition.includes("snow")
    ){

        weatherIcon.innerHTML = "❄️";

    }

    else if(
        condition.includes("mist") ||
        condition.includes("fog") ||
        condition.includes("haze")
    ){

        weatherIcon.innerHTML = "🌫️";

    }

    else{

        weatherIcon.innerHTML = "🌤️";

    }

}

// 5 day forecast
async function getForecast(city){

    forecastContainer.innerHTML = "";

    let url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);

    let data = await response.json();

    for(let i=0;i<data.list.length;i+=8){

        let day = data.list[i];

        let card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
        <h3>${new Date(day.dt*1000)
        .toLocaleDateString("en-US",{weekday:"short"})}</h3>

        <h1>${Math.round(day.main.temp)}°C</h1>

        <p>${day.weather[0].main}</p>
        `;

        forecastContainer.appendChild(card);
    }
}

// Hourly forecast
async function getHourlyForecast(city){

    hourlyForecast.innerHTML = "";

    let url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);

    let data = await response.json();

    for(let i=0;i<8;i++){

        let item = data.list[i];

        let card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
        <h3>${item.dt_txt.slice(11,16)}</h3>
        <h1>${Math.round(item.main.temp)}°C</h1>
        <p>${item.weather[0].main}</p>
        `;

        hourlyForecast.appendChild(card);
    }
}

// Chart
async function getChart(city){

    let url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);

    let data = await response.json();

    let labels = [];
    let temps = [];

    for(let i=0;i<8;i++){

        labels.push(data.list[i].dt_txt.slice(11,16));

        temps.push(data.list[i].main.temp);
    }

    if(chart)
        chart.destroy();

    chart = new Chart(
    document.getElementById("weatherChart"),
    {
        type: "line",

        data: {
            labels: labels,
            datasets: [
                {
                    label: "Temperature",
                    data: temps,
                    borderColor: "cyan",
                    backgroundColor: "rgba(0,255,255,.2)",
                    fill: true,
                    tension: 0.4
                }
            ]
        },

        options:{
    responsive:true,
    maintainAspectRatio:false,

    plugins:{
        legend:{
            labels:{
                color:"white"
            }
        }
    },

    scales:{
        x:{
            ticks:{
                color:"white"
            }
        },

        y:{
            beginAtZero:false,
            ticks:{
                color:"white"
            }
        }
    }
}
    }
);
}

// AI suggestion
function aiSuggestion(data){

    let suggestion =
    document.getElementById("aiSuggestion");

    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let condition = data.weather[0].main;

    if(condition === "Rain"){

        suggestion.innerHTML =
        "☔ Carry an umbrella and avoid slippery roads.";

    }

    else if(condition === "Thunderstorm"){

        suggestion.innerHTML =
        "⚡ Stay indoors and avoid open areas.";

    }

    else if(condition === "Snow"){

        suggestion.innerHTML =
        "❄️ Wear warm clothes and drive carefully.";

    }

    else if(temp >= 40){

        suggestion.innerHTML =
        "🔥 Extreme heat! Stay indoors and drink plenty of water.";

    }

    else if(temp >= 35){

        suggestion.innerHTML =
        "🥤 Stay hydrated and avoid direct sunlight.";

    }

    else if(temp >= 30){

        suggestion.innerHTML =
        "😎 Hot weather today. Wear light clothes.";

    }

    else if(temp >= 25){

        suggestion.innerHTML =
        "😊 Pleasant weather today. Great for outdoor activities.";

    }

    else if(temp >= 18){

        suggestion.innerHTML =
        "🌤 Comfortable weather. Enjoy your day.";

    }

    else if(temp >= 10){

        suggestion.innerHTML =
        "🧥 It may feel chilly. Consider wearing a jacket.";

    }

    else{

        suggestion.innerHTML =
        "🥶 Very cold weather. Stay warm.";

    }

    if(humidity > 80){

        suggestion.innerHTML +=
        "<br><br>💧 Humidity is high. Stay hydrated.";

    }

}

// Weather alerts
function weatherAlerts(data){

    let alert =
    document.getElementById("weatherAlert");

    if(data.weather[0].main === "Thunderstorm"){

        alert.innerHTML =
        "⚡ Thunderstorm warning.";

    }

    else if(data.main.temp > 40){

        alert.innerHTML =
        "🔥 Heat wave alert.";

    }

    else{

        alert.innerHTML =
        "✅ No weather alerts.";
    }
}

// Save history
function saveHistory(city){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    if(!history.includes(city)){

        history.push(city);

        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );
    }

    displayHistory();
}

// Display history
function displayHistory(){

    historyCities.innerHTML = "";

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(city => {

        let chip =
        document.createElement("div");

        chip.classList.add("chip");

        chip.innerHTML = city;

        chip.onclick = () => getWeather(city);

        historyCities.appendChild(chip);

    });
}

// Favorite cities
function populateFavorites(){

    favoriteCities.innerHTML =
    `<option value="">
        -- Select a favorite city --
    </option>`;

    let favorites =
    JSON.parse(localStorage.getItem("favoriteCities")) || [];

    favorites.forEach(city => {

        let option =
        document.createElement("option");

        option.value = city;

        option.textContent = city;

        favoriteCities.appendChild(option);

    });

}

// Auto location
navigator.geolocation.getCurrentPosition(async position => {

    let lat = position.coords.latitude;

    let lon = position.coords.longitude;

    let url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);

    let data = await response.json();

    getWeather(data.name);

});

// Initial load
displayHistory();
populateFavorites();
getWeather("Hyderabad");
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")
    .then(() => {
        console.log("Service Worker Registered");
    });

}