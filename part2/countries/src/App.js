import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map(key => {
          return <li key={key}>{country.languages[key]}</li>
        })}
      </ul>
      <img src={country.flags.png} alt="Flag"></img>
    </div>
  )
}

const DisplayCountries = ({ countries, filter }) => {
  if (countries.length == 1) {
    const country = countries[0]

    return (
      <DisplayCountry country={country}></DisplayCountry>
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.name.common}>
               <div>{country.name.common} <button onClick={() => {console.log("click", country.name.common)}} >show</button></div>
            </div>
          )
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
