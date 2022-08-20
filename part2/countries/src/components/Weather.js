import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
  
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }, [])
  
    return <div>{weather.main ? (
      <div>
        <h2>Weather in {capital}</h2>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"></img>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    ) : null}</div>
  }

  export default Weather;
