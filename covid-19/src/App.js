import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from "./components/InfoBoxes/InfoBox";
import Map from "./components/Maps/Map";
import Table from "./components/Tables/Table";
//import numeral from "numeral";
import { sortData } from "./components/Utils/Util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          //setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        //All of data from the country response
        setCountryInfo(data);
        //setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        //setMapZoom(4);
      });
  };

  console.log("COUNTRY INFO >>>>>", countryInfo)



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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          {/* InfoBoxs title=Coronavirus recovers */}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* InfoBoxs title=Coronavirus deaths */}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
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
            <Table countries={tableData} /> 
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
