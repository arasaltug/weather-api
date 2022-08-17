import React,{useState} from "react";
import Wheather from "./Wheatherresult";
import './App.css';

function App() {

  const APP_KEY = "4861ee16e4e54457afb104728221408"
  let cityInput = ""
  const [weatherData, setWeatherData]= useState([]);

  function cityText(){
    document.querySelector("input").addEventListener("input",(e)=>{
      e.preventDefault();
      cityInput = e.target.value;
      console.log(cityInput);
    })
    
  } 

  async function getData(value){
    const data=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3&aqi=no&alerts=no`)
    const result=await data.json();
    setWeatherData(result.forecast.forecastday)
    console.log(result.forecast.forecastday);
    
  }

  return (
    <div className="App">
      <div className="search">
        <input type="text" placeholder="Search a city..." onChange={cityText}/>
        <button type="submit" onClick={()=>getData(cityInput)}>Search</button>
      </div>
      {weatherData.map(item=>(<Wheather key={item.date} date={item.date} mintemp={item.day.mintemp_c} maxtemp={item.day.maxtemp_c} condition={"clear"} icon={item.day.condition.icon} />))}
    </div> 
  );
}

export default App;
