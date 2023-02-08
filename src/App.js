import React, { useState } from "react";
import {BsSearch} from 'react-icons/bs';
import { WiHumidity } from "react-icons/wi";
import { BsWind } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
function App() {
  const [city, setCity] = useState("");
  const [isCity, setIsCity] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  const handleClick = async () => {
    setIsCity(true);

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7dafc7b2c2d52366e8d3aba3dad47984`
      )
      .then((response) => setWeatherData(response.data))
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleChange = (e) => {
    const city = e.target.value;
    setCity(city);
    if (city === "") setIsCity(false);
  };

  return (
    <div className="min-h-screen bg-blue-400">
      <img
        className="absolute object-cover h-full w-full"
        src="https://images.unsplash.com/photo-1580193483760-d0ef2abaa348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        alt="bg-img"
      />

      <div className="flex justify-center">
        <div className="bg-gray-500 px-2 z-10 py-2 rounded-[25px] w-[800px] mt-10 flex justify-arround cursor-pointer">
          <input
            className="w-[740px] rounded-[25px] text-center bg-slate-100 mr-2"
            placeholder="Enter Your City"
            value={city}
            onChange={handleChange}
          ></input>
          <BsSearch size={30} onClick={handleClick} />
        </div>
      </div>
      {isCity ? (
        <div className="flex justify-center mt-4 text-6xl font-bold text-gray-800 opacity-80">
          {weatherData.name}
        </div>
      ) : (
        <div className="mt-[104px]"></div>
      )}
      {weatherData.weather ? (
        <div className="flex justify-between">
          <div className=" text-5xl mt-12 mx-24 text-gray-800 font-bold opacity-75 ">
            {weatherData.weather[0].description}
          </div>
          <div className="z-10 mx-24">
            {weatherData.weather ? <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt="not found"
            /> : null}
          </div>
        </div>
      ) : null}

      {weatherData.main ? (
        <div className=" flex justify-between text-[70px] text-black font-bold mx-24 opacity-70">
          {weatherData.main.temp} ℃
        </div>
      ) : null}
      {isCity ? <div className="flex justify-center  ">
        <div className="bg-gray-500 rounded-[25px] opacity-75 h-[150px] w-[700px] grid grid-cols-4 gap-2 drop-shadow-lg">
          {weatherData.main ? (
            <div className="flex flex-col justify-evenly items-center text-3xl text-white">
              <p className="text-[1rem]"> Humidity</p>
              {weatherData.main.humidity} <WiHumidity />
            </div>
          ) : null}
          {weatherData.main ? (
            <div className="flex flex-col justify-evenly items-center text-3xl text-white">
              <p className="text-[1rem]"> feels like</p>
              {weatherData.main.feels_like}
              <CiTempHigh />
            </div>
          ) : null}
          {weatherData.main ? (
            <div className="flex flex-col justify-evenly items-center text-3xl text-white">
              <p className="text-[1rem]"> wind speed</p>
              {weatherData.wind.speed}
              <BsWind />
            </div>
          ) : null}
          {weatherData.main ? (
            <div className="flex flex-col justify-evenly items-center text-3xl text-white">
              <p className="text-[1rem]"> visibility</p>
              {weatherData.visibility}
              <MdOutlineVisibility />
            </div>
          ) : null}
        </div>
      </div> : null}
    </div>
  );
}

export default App;