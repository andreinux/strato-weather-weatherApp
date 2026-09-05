console.log("running...");
import "./index.css"
const apiKey = "5G228VLEJFUDAH365JTVPHJBW";

//dom declarations
const slocation = document.querySelectorAll(".slocation");
const temp = document.querySelector("#temp")
const conditions = document.querySelector("#conditions");
const feels = document.querySelector("#feelslike");
const humidity = document.querySelector("#humidity");
const windspeed = document.querySelector("#windspeed");
const domtime = document.querySelector("#time");
const domdate = document.querySelector("#date");
const tempUnit = document.querySelectorAll(".tempUnit");
const windUnit = document.querySelector("#windUnit");

const forecastDays = document.querySelector("#forecastDays");   


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
        
        //formatting time

const now = new Date();

const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
});

console.log(time);
//end--------------

//date formatting

const formattedDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "long",
    year: "numeric"
});

console.log(formattedDate);

//end

//forecast sidebar
const forecast = weatherData.days.slice(1, 6);

forecast.forEach(day => {
    const date = new Date(day.datetime + "T00:00:00");

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    console.log("Date:", formattedDate);
    console.log("High:", day.tempmax);
   

       const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecastCard");

    forecastCard.innerHTML = `
        <h3>${formattedDate}</h3>
        <p>${day.conditions}</p>
    `;

    forecastDays.appendChild(forecastCard);
});

//UI endpoint rendering

    
        slocation.forEach(slocation=> {
             slocation.textContent = weatherData.resolvedAddress;
        })
        temp.textContent = weatherData.currentConditions.temp;
        conditions.textContent = weatherData.currentConditions.conditions;
        feels.textContent = `Feels like: ${weatherData.currentConditions.feelslike}`;
        humidity.textContent = `Humidity: ${weatherData.currentConditions.humidity}%`;
        windspeed.textContent = `Wind Speed: ${weatherData.currentConditions.windspeed}`;
        domtime.textContent = time;
        domdate.textContent = formattedDate;


        //units

        if (unitGroup === "metric"){
            tempUnit.forEach(tempUnit => {
                tempUnit.textContent = "°C";
            })
           
            windUnit.textContent = "km/h";

        }else{
            tempUnit.forEach(tempUnit => {
                tempUnit.textContent = "°F";
            })

            windUnit.textContent = "mph";
        }

        

        
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
    fUnitBtn.classList.remove("active");

})