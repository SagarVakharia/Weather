import React, { useState } from "react";
import "./Weather.css";
import search from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import humidity from "../Assets/humidity.png";

const Weather = () => {

    let API_Key = "dcad92e8f85936e5dc4a0026204649a4";

    const [weatherIcon, setWeatherIcon] = useState(cloud); //To change the icon according to weather

    const Search = async ()  => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value ===""){
            return 0;
        }

        let API_Url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_Key}`;
        let response = await fetch(API_Url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidityPercent");
        const wind = document.getElementsByClassName("windRate");
        const temp = document.getElementsByClassName("weatherTemp");
        const location = document.getElementsByClassName("weatherLocation");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "km/hr"; // Math.floor() removes decimal values
        temp[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n"){
            setWeatherIcon(clear);
        }
        else if (data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n"){
            setWeatherIcon(cloud);
        }
        else if (data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n"){
            setWeatherIcon(drizzle);
        }
        else if (data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n"){
            setWeatherIcon(drizzle);
        }
        else if (data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n"){
            setWeatherIcon(rain);
        }
        else if (data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n"){
            setWeatherIcon(rain);
        }
        else if (data.weather[0].icon ==="13d" || data.weather[0].icon ==="13n"){
            setWeatherIcon(snow);
        }
        else{
            setWeatherIcon(clear);
        }
    }

  return (
    <div className="container">
      <div className="topBar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search" onClick={() => {Search()}}>
          <img src={search} alt="" />
        </div>
      </div>
      <div className="weatherImg">
        <img src={weatherIcon} alt="" />
      </div>
      <div className="weatherTemp">24°C</div>{" "}
      {/* To add degreee sign press alt+0176 */}
      <div className="weatherLocation">London</div>
      <div className="dataContainer">
        <div className="element">
          <img src={humidity} className="icon" />
          <div className="data">
            <div className="humidityPercent">64%</div>
            <div className="text">humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} className="icon" />
          <div className="data">
            <div className="windRate">18 km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
