console.log("running...");
import "./index.css"

const apiKey = "5G228VLEJFUDAH365JTVPHJBW";
let location = "Cebu City";

async function getData(){
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`);
        const weatherData = await response.json();
        console.log("Location: ",location);
        console.log("Temperature: ",weatherData.currentConditions.temp);
        console.log("Feels Like: ",weatherData.currentConditions.feelslike);
        console.log("Humidity: ",weatherData.currentConditions.humidity);
        console.log("Wind Speed: ",weatherData.currentConditions.windspeed);
        console.log("Conditions: ",weatherData.currentConditions.conditions);
    }catch(error){
       console.error(error);
    }
}

getData();
