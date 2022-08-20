import DisplayCountryDetail from './DisplayCountryDetail'
import { useState } from 'react'
const DisplayCountry = ({ country }) => {
    const [showDetail, setShowDetail] = useState(false)
  
    return (
      <div>
        <div>{country.name.common} <button onClick={() => setShowDetail(!showDetail)}>{!showDetail ? "show" : "hide"}</button></div>
        {showDetail ? <DisplayCountryDetail country={country}></DisplayCountryDetail> : null}
      </div>
    )
  }

  export default DisplayCountry;
