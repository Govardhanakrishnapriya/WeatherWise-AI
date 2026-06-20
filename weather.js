function getWeatherEmoji(condition){

    switch(condition){

        case "Clear":
            return "☀️";

        case "Clouds":
            return "☁️";

        case "Rain":
            return "🌧️";

        case "Snow":
            return "❄️";

        case "Thunderstorm":
            return "⛈️";

        case "Drizzle":
            return "🌦️";

        case "Mist":
            return "🌫️";

        default:
            return "🌤️";

    }

}


function weatherBackground(condition){

    if(condition === "Clear"){

        document.body.style.background =
        "linear-gradient(135deg,#0ea5e9,#38bdf8,#7dd3fc)";

    }

    else if(condition === "Clouds"){

        document.body.style.background =
        "linear-gradient(135deg,#475569,#64748b,#94a3b8)";

    }

    else if(condition === "Rain"){

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e3a8a,#1d4ed8)";

    }

    else if(condition === "Snow"){

        document.body.style.background =
        "linear-gradient(135deg,#cbd5e1,#e2e8f0,#f8fafc)";

    }

    else if(condition === "Thunderstorm"){

        document.body.style.background =
        "linear-gradient(135deg,#111827,#1e293b,#000000)";

    }

}


function weatherSuggestion(temp){

    let suggestion =
    document.getElementById("aiSuggestion");

    if(temp > 40){

        suggestion.innerHTML =
        "🔥 Heat wave detected. Stay indoors and drink plenty of water.";

    }

    else if(temp > 30){

        suggestion.innerHTML =
        "🥤 Stay hydrated and avoid direct sunlight.";

    }

    else if(temp < 15){

        suggestion.innerHTML =
        "🧥 It's cold outside. Wear warm clothes.";

    }

    else{

        suggestion.innerHTML =
        "😊 Pleasant weather today.";

    }

}


function weatherAlert(condition){

    let alert =
    document.getElementById("weatherAlert");

    if(condition === "Thunderstorm"){

        alert.innerHTML =
        "⚡ Thunderstorm Warning";

    }

    else if(condition === "Rain"){

        alert.innerHTML =
        "☔ Carry an umbrella";

    }

    else{

        alert.innerHTML =
        "✅ No weather alerts";

    }

}
function setWeatherCardBackground(condition){

    const card =
    document.querySelector(".weather-bg");

    if(condition === "Clear"){

        card.style.backgroundImage =
        "url('images/sunny-bg.jpg')";

    }

    else if(condition === "Clouds"){

        card.style.backgroundImage =
        "url('images/cloudy-bg.jpg')";

    }

    else if(condition === "Rain"){

        card.style.backgroundImage =
        "url('images/rainy-bg.jpg')";

    }

    else if(condition === "Snow"){

        card.style.backgroundImage =
        "url('images/snow-bg.jpg')";

    }

    else if(condition === "Thunderstorm"){

        card.style.backgroundImage =
        "url('images/thunder-bg.jpg')";

    }

    else{

        card.style.backgroundImage =
        "url('images/night-bg.jpg')";

    }

}