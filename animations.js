function startRainAnimation(){

    document.body.classList.add("rain");

}

function stopRainAnimation(){

    document.body.classList.remove("rain");

}

function startSnowAnimation(){

    document.body.classList.add("snow");

}

function stopSnowAnimation(){

    document.body.classList.remove("snow");

}

function animateWeather(condition){

    stopRainAnimation();
    stopSnowAnimation();

    if(condition === "Rain"){

        startRainAnimation();

    }

    else if(condition === "Snow"){

        startSnowAnimation();

    }

}