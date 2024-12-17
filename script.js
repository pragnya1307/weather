const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "41047b3b77e794a44810d5ed05252332";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`City not found or server error (${response.status})`);
        }

        const data = await response.json();

        // Check if the data contains necessary fields
        if (!data || !data.main || !data.weather || !data.wind) {
            throw new Error("Unexpected API response format.");
        }

        // Update the DOM with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/hr";

        // Update the weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/sun.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rainy-day.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/cloud.png";
        } else {
            weatherIcon.src = "images/mark.png"; // Default icon for unhandled weather conditions
        }
        // Display the weather details
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        // Log error to console
        console.error(error);

        // Display error message to the user
        document.querySelector(".city").innerHTML = "Error. This city doesn't exist.";
        document.querySelector(".temp").innerHTML = "N/A";
        document.querySelector(".humidity").innerHTML = "N/A";
        document.querySelector(".wind").innerHTML = "N/A";
        weatherIcon.src = "images/error.png"; // Default icon for errors
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
