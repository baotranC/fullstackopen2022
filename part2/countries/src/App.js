import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountryDetail = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map(key => {
          return <li key={key}>{country.languages[key]}</li>
        })}
      </ul>
      <img src={country.flags.png} alt="Flag"></img>

      {weather.main ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>temperature {weather.main.temp} Celcius</div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"></img>
          <div>wind {weather.wind.speed} m/s</div>
        </div>

      ) : null}
    </div>
  )
}

const DisplayCountry = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div>
      <div>{country.name.common} <button onClick={() => setShowDetail(!showDetail)}>show</button></div>
      {showDetail ? <DisplayCountryDetail country={country}></DisplayCountryDetail> : null}
    </div>
  )
}

const DisplayCountries = ({ countries }) => {
  if (countries.length == 1) {
    const country = countries[0]

    return (
      <DisplayCountryDetail country={country}></DisplayCountryDetail>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => {
          return (<DisplayCountry key={country.name.common} country={country}></DisplayCountry>)
        })}
      </div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => filter != '' && country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <div>find countries <input value={filter} onChange={handleFilterChange} /></div>
      <DisplayCountries countries={countriesToShow}></DisplayCountries>
    </div>
  )
}

export default App;
