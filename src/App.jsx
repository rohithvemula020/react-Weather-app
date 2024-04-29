import React, { useEffect, useState } from "react";
import Temparature from "./components/temparature";
import Highlights from "./components/Highlights";


const App = () => {
  const [city, setCity] = useState("karimnagar");
  const [weatherdata, SetWeatherdata] = useState(null);
  const ApiUrl = `http://api.weatherapi.com/v1/current.json?key=5e3f6823c9894d7f8e3174557241904&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(ApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        SetWeatherdata(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  return (
    // totalll containerr div
    <div className="bg-[#1F213A] h-screen flex justify-center align-top">
      {/* left part div */}
      <div className="mt-40 w-1/5 h-1/3">
        { weatherdata &&(
        <Temparature setCity={setCity} 
       stats={{
        temp: weatherdata.current.temp_c,
        condition: weatherdata.current.condition.text,
        isDay: weatherdata.current.is_day,
        location: weatherdata.location.name,
        time: weatherdata.location.localtime
      }}
      
        />
    )}
      </div>

      {/* right part div */}

      <div className=" mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6">
        <h2 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights{" "}
        </h2>
        { weatherdata && <>
          <Highlights stats={{
            title:'Wind Status',
            value:weatherdata.current.wind_mph,
            unit:'mph',
            direction:weatherdata.current.wind_dir
          }} />
        <Highlights stats={{
            title:'Humidity',
            value:weatherdata.current.humidity,
            unit:'%',
          }}  />
        <Highlights  stats={{
            title:'Visibility',
            value:weatherdata.current.vis_miles,
            unit:'miles',
          }} />
        <Highlights stats={{
            title:'Air Pressure',
            value:weatherdata.current.pressure_mb,
            unit:'mb',
          }} />
        </>
}
       
      </div>
    </div>
  );
};

export default App;
