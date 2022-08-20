import Weather from './Weather'

const DisplayCountryDetail = ({ country }) => {
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
  
        <Weather capital={country.capital}></Weather>
      </div>
    )
  }
  
  export default DisplayCountryDetail;