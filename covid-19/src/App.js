import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from "./components/InfoBoxes/InfoBox";
import Map from "./components/Maps/Map";


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          // let sortedData = sortData(data);
          setCountries(countries);
          //setMapCountries(data);
          // setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };


  return (
    <div className="app">
      <div className="app__left">
         {/* Header */}
        {/* Title+Select input dropdown */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries and show them in dropdown */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* InfoBoxs title=Coronavirus cases */}
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          {/* InfoBoxs title=Coronavirus recovers */}
          <InfoBox title="Recovered" cases={1234} total={3000} />
          {/* InfoBoxs title=Coronavirus deaths */}
          <InfoBox title="Deaths" cases={12345} total={4000} />
        </div>

        {/* Map */}
        <Map
          // countries={mapCountries}
          // casesType={casesType}
          // center={mapCenter}
          // zoom={mapZoom}
        />
      </div>
     
        <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            {/* Table */}
            {/* <Table countries={tableData} /> */}
            <h3>Worldwide new</h3>
             {/* Graph */}
            {/* <LineGraph casesType={casesType} /> */}
          </div>
        </CardContent>
        </Card>
    </div>
  );
}

export default App;
