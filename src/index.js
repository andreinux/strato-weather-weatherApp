console.log("running...");
import "./index.css"
const apiKey = "5G228VLEJFUDAH365JTVPHJBW";



const form = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");




async function getData(location){
    try {
        console.log("Location:", location);

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const weatherData = await response.json();
        console.log("Resolved address:", weatherData.resolvedAddress);
        console.log("Temperature: ",weatherData.currentConditions.temp);
        console.log("Feels Like: ",weatherData.currentConditions.feelslike);
        console.log("Humidity: ",weatherData.currentConditions.humidity);
        console.log("Wind Speed: ",weatherData.currentConditions.windspeed);
        console.log("Conditions: ",weatherData.currentConditions.conditions);
    }
    
    catch(error){
       console.error(error);
    }
}

getData("City of naga");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    getData(cityInput.value);
})



