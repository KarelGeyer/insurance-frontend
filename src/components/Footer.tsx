import { useState } from "react";
import WeatherCard from "./WeatherCard";

const Footer = () => {
  // const [showWeather, setShowWeather] = useState<boolean>(false);

  return (
    <div className="footer">
      <WeatherCard />
      {/* {showWeather && <WeatherCard />} */}
      {/* <button onClick={() => setShowWeather(!showWeather)}>show weather</button> */}
    </div>
  );
};

export default Footer;
