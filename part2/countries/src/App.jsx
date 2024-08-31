import { useState, useEffect } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [tiempo, setTiempo] = useState('')
  const [count ,setCount] = useState('')
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const filtrados =
    filter === ""
      ? []
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(filter.toLowerCase())
        );
  
  const onShow = (c) =>{
    setFilter(c.name.common)
    setCount(c)
  }

  useEffect(() => {
    if(filtrados.length === 1 ){
      const lon = filtrados[0].capitalInfo.latlng[1]
      const lat = filtrados[0].capitalInfo.latlng[0]
      console.log(lon,lat);
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        setTiempo(response.data)
        console.log(response.data);
      })
    }
  },[count,filter])

  return (
    <div>
      Find countries{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {filtrados.length === 1 ? (
        <div>
          <h1>{filtrados[0].name.common}</h1>
          <p>Capital: {filtrados[0].capital}</p>
          <p>Area: {filtrados[0].area}</p>
          <p>
            {Object.entries(filtrados[0].languages).map((l) => (
              <li key={l[0]}>{l[1]}</li>
            ))}
          </p>
          <img src={filtrados[0].flags.svg} alt="" width={200} />
          {tiempo ? <div>
            <h1>weather in {filtrados[0].capital}</h1>
            <p>Temperature {(tiempo.main.temp-273.15).toFixed(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${tiempo.weather.map(e => e.icon)}@2x.png`} alt="" />
            <p>wind {tiempo.wind?.speed} m/s</p>
          </div>:''}
        </div>
      ) : (
        <div>
          {filtrados.length > 1 && filtrados.length <= 10 ? (
            <div>
              {filtrados.map((c) => {
                return (
                  <div key={c.capital}>
                    {c.name.common} 
                    <button onClick={() => onShow(c)}>show</button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {filtrados.length > 10 ? (
                <div>Too many matches, specify another filter</div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
      
    </div>
  );
};

export default App;
