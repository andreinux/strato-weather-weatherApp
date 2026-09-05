console.log("running...");
import "./index.css"
const apiKey = "5G228VLEJFUDAH365JTVPHJBW";

//dom declarations
const slocation = document.querySelector("#slocation");
const temp = document.querySelector("#temp")
const conditions = document.querySelector("#condtions");
const feels = document.querySelector("#feelslike");
const humidity = document.querySelector("#humidity");
const windspeed = document.querySelector("#windspeed");


const form = document.querySelector("#searchForm");
const cityInput = document.querySelector("#cityInput");
const fUnitBtn = document.querySelector("#fUnit");
const mUnitBtn = document.querySelector("#mUnit"); 



let unitGroup = "metric";



async function getData(location){
    try {
        console.log("Location:", location);

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&include=current&key=${apiKey}&contentType=json`);

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

getData("naga, cebu");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    getData(cityInput.value);
})


fUnitBtn.addEventListener("click", ()=> {
    unitGroup = "us";
    getData(cityInput.value);
    fUnitBtn.classList.add("active");
    mUnitBtn.classList.remove("active");
})


mUnitBtn.addEventListener("click", ()=> {
    unitGroup = "metric";
    getData(cityInput.value);
    mUnitBtn.classList.add("active");
    fUnit.classList.remove("active");

})