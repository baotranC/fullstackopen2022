import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountries = ({ countries, filter }) => {
  const countriesToShow = countries.filter(country => filter != '' && country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (countriesToShow.length == 1) {
    const country = countriesToShow[0]

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
  } else if (countriesToShow.length <= 10) {
    return (
      <ul>
        {countriesToShow.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
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

  return (
    <div>
      <div>find countries <input value={filter} onChange={handleFilterChange} /></div>
      <DisplayCountries countries={countries} filter={filter}></DisplayCountries>
    </div>
  )
}

export default App;
