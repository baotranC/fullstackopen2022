import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

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
