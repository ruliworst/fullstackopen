import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  const showOnlyOneCountry = (country) => {
    const languages = country.languages
    const api_key = process.env.REACT_APP_API_KEY

    let weatherData;
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}`)
      .then(response => weatherData = response.data)
    
    let languageNames = []

    for(let language in languages) {
      languageNames.push(languages[language])
    }

    return (
      <>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {languageNames.map(name => <li key={name}>{name}</li>)}
        </ul>
        <img src={country.coatOfArms['png']} alt="coat of arms" height='100' width='100'></img>
        <h3>Weather in {country.capital}</h3>
        <p>temperature {temperature} Celsius</p>
      </>
    )
  }

  const showCountries = (country) => {
    return (
      <>
        <p key={country.ccn3}>
          {country.name.common}<a href={country.maps['googleMaps']} target="_blank" rel="noreferrer"><button>show</button></a>
        </p>
      </>
    )
  }

  const onChangeFilter = (event) => {
    const localFilter = event.target.value
    setFilter(localFilter)

    if(localFilter === '') {
      setFilteredCountries([])
      return;
    }

    setFilteredCountries(countries.filter(country => {
      let name = country.name.common
      return name.toLowerCase().includes(localFilter.toLowerCase())
    }))
  }

  return (
    <div>
      find countries <input value={filter} onChange={onChangeFilter} />
      <div>
        {filteredCountries.length > 10 
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length === 1 
              ? showOnlyOneCountry(filteredCountries[0])
              : filteredCountries.map(country => showCountries(country))}
      </div> 
    </div>
  )
}

export default App