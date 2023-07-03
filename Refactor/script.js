import Data from "./config.js";
const searchBar = document.querySelector('#searchBar');
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector('.city-name');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
console.log("hello world")
// Event will start on a keyup action


const fetchApi = (city) => {
    const apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + Data.key;
    event.currentTarget.value = '';
    // Fetching first api to get the City coordinates
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            console.log(data)
            const lon = data[0].lon;
            const lat = data[0].lat;

            cityNameContainer.innerHTML = data[0].name;

            // Fetching final data according to the coordinates
            return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=" + Data.key)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    console.log('Welcome to this basic weather app. this is not a product but the product of an academic exercise.')
                    return result
                });
        })
        .catch((error) => {
            // If there are errors, send out an error message
            console.log(error);

            console.error('Error:', "not a place!");

            return alert("Are you sure you aren't holding your map upside down?");
        });
};



function createElement(data) { // definirion of the function createEle;ent

    // Looping through 5 days of weather data
    for (let i = 0; i < 5; i++) {
        // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
        const date = new Date();
        let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
        let normalDate = data.list[0]?.dt_txt;

        // Create the elements with Data
        const card = document.createElement('div');
        card.classList.add("card");
        container.appendChild(card);

        const imageBox = document.createElement('div');
        imageBox.classList.add("imgBx");
        card.appendChild(imageBox);

        const cardImg = document.createElement('img');
        console.log(i)
        // cardImg.src = "http://openweathermap.org/img/wn/" + data[0].list[i].weather[0].icon + "@2x.png";
        cardImg.src = `https://openweathermap.org/img/wn/${data.list[i]?.weather[0].icon}@2x.png`;

        imageBox.appendChild(cardImg);

        const contentBox = document.createElement("div");
        contentBox.classList.add("contentBx");
        card.appendChild(contentBox);

        const cardHeader = document.createElement("h2");
        cardHeader.innerHTML = dayOfTheWeek;
        contentBox.appendChild(cardHeader);

        const tempDescription = document.createElement("h4");
        tempDescription.innerHTML = data.list[i]?.weather[0].description;
        contentBox.appendChild(tempDescription);

        const currentTempBox = document.createElement("div");
        currentTempBox.classList.add("color");
        contentBox.appendChild(currentTempBox);

        const currentTempHeader = document.createElement("h3");
        currentTempHeader.innerHTML = "Temp:"
        currentTempBox.appendChild(currentTempHeader);

        const currentTemp = document.createElement("span");
        currentTemp.classList.add("current-temp");
        currentTemp.innerHTML = data.list[i]?.main.temp + "°C";
        currentTempBox.appendChild(currentTemp);

        const minMaxTemperatures = document.createElement("div");
        minMaxTemperatures.classList.add("details");
        contentBox.appendChild(minMaxTemperatures);

        const minMaxTempHeader = document.createElement("h3");
        minMaxTempHeader.innerHTML = "More:"
        minMaxTemperatures.appendChild(minMaxTempHeader);

        const minTemp = document.createElement("span");
        minTemp.classList.add("min-temp")
        minTemp.innerHTML = data.list[i]?.main.temp_min + "°C";
        minMaxTemperatures.appendChild(minTemp);

        const maxTemp = document.createElement("span");
        maxTemp.classList.add("max-temp")
        maxTemp.innerHTML = data.list[i]?.main.temp_max + "°C";
        minMaxTemperatures.appendChild(maxTemp);
    };
}


searchBar.addEventListener('keyup', (event) => {
    // checking the action for specific key (Enter)
    if (event.key === "Enter") {
        fetchApi(event.target.value.toLowerCase())
            .then(data => {
            console.log('data:', data)    
            createElement(data)}); // we call createElement fucntin with the argument "data" coming from the API
    };
});