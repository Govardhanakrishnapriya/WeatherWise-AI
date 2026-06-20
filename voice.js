const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";

const voiceStatus = document.getElementById("voiceStatus");
const startVoice = document.getElementById("startVoice");

function speak(text) {

    const speech = new SpeechSynthesisUtterance();

    speech.text = text;
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

}

startVoice.addEventListener("click", () => {

    recognition.start();

    voiceStatus.innerHTML = "Listening...";

});

recognition.onresult = function(event){

    let command =
    event.results[0][0].transcript.toLowerCase();

    voiceStatus.innerHTML =
    "You said : " + command;


    // WEATHER

    if(command.includes("weather in")){

        let city =
        command.replace("weather in","").trim();

        getWeather(city);

        speak("Showing weather in " + city);

    }


    // TIME

    else if(command.includes("time")){

        let time =
        new Date().toLocaleTimeString();

        speak("Current time is " + time);

    }


    // DATE

    else if(command.includes("date")){

        let date =
        new Date().toDateString();

        speak("Today's date is " + date);

    }


    // TEMPERATURE

    else if(command.includes("temperature")){

        speak(
            "Current temperature is "
            + temperature.innerHTML
        );

    }


    // DARK MODE

    else if(command.includes("dark mode")){

        document.body.classList.remove("light");

        speak("Dark mode activated");

    }


    // LIGHT MODE

    else if(command.includes("light mode")){

        document.body.classList.add("light");

        speak("Light mode activated");

    }


    // REFRESH

    else if(command.includes("refresh")){

        getWeather(cityName.innerHTML);

        speak("Refreshing weather");

    }


    // WHO ARE YOU

    else if(command.includes("who are you")){

        speak(
            "I am Raj, your personal voice assistant."
        );

    }


    // GOOD MORNING

    else if(command.includes("good morning")){

        speak(
            "Good morning. Have a wonderful day."
        );

    }


    // GOOD NIGHT

    else if(command.includes("good night")){

        speak(
            "Good night. Sweet dreams."
        );

    }


    // OPEN YOUTUBE

    else if(command.includes("open youtube")){

        window.open(
            "https://www.youtube.com",
            "_blank"
        );

        speak(
            "Opening YouTube"
        );

    }


    // OPEN GOOGLE

    else if(command.includes("open google")){

        window.open(
            "https://www.google.com",
            "_blank"
        );

        speak(
            "Opening Google"
        );

    }


    // OPEN CHATGPT

    else if(command.includes("open chatgpt")){

        window.open(
            "https://chatgpt.com",
            "_blank"
        );

        speak(
            "Opening Chat GPT"
        );

    }


    // JOKE

    else if(command.includes("joke")){

        let jokes = [

            "Why do programmers prefer dark mode? Because light attracts bugs.",

            "There are ten types of people. Those who understand binary and those who don't.",

            "Why did Java developers wear glasses? Because they couldn't C sharp."

        ];

        let joke =
        jokes[Math.floor(Math.random()*jokes.length)];

        speak(joke);

    }


    else{

        speak(
            "Sorry, I don't understand that command."
        );

    }

};

recognition.onerror = function () {

    voiceStatus.innerHTML =
        "Voice recognition failed";

};