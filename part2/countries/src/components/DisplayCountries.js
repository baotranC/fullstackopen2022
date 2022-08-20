import DisplayCountryDetail from './DisplayCountryDetail'
import DisplayCountry from './DisplayCountry'

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

export default DisplayCountries;