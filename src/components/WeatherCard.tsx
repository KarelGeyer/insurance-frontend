import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { WeatherData } from "../helpers/types";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const WeatherCard = () => {
  //   const [counter, setCounter] = useState<number>(0);
  //   let counterTest = 0; // are reseted every render

  // const testFce = () => {
  //   setCounter(0);
  // // setCounter(!loading);
  //   counter = counterTest + 1;
  //   console.log("counter", counter); // this will always be 1
  // };

  // console.log("counter", counter); // this will always be 0

  //   useEffect(() => {
  //     let timer: number = 0;
  //     const interval = setInterval(() => {
  //       timer++;
  //       console.log(timer);
  //     }, 1000);

  //     return () => {
  //       clearInterval(interval);
  //       console.log(interval + " cleared");
  //     };
  //   }, []);

  const [weatherDetail, setWeatherDetail] = useState<WeatherData>({
    city: "",
    temperature: 0,
    description: "",
    speed: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const API = {
    key: "09590f95afc6e554006c455c4b8fa021",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const getWeatherData = async (city: string) => {
    axios
      .get(`${API.base}weather?q=${city}&units=metric&APPID=${API.key}`)
      .then((res) => {
        const {
          main: { temp },
          weather,
          wind: { speed },
        } = res.data;
        const { description } = weather[0];
        setWeatherDetail({
          city: city,
          temperature: temp,
          description,
          speed: speed,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.db-ip.com/v2/free/self")
      .then((res) => {
        return res.data.city;
      })
      .then((city) => {
        getWeatherData(city);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchWeather = () => {
    setLoading(true);
    getWeatherData(search);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* <button onClick={() => setCounter(counter + 1)}> click </button> */}
      {/* <button onClick={testFce}> {counter} </button> */}

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: 270,
          marginBottom: "10px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Zadej město"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={searchWeather}
        >
          <Search />
        </IconButton>
      </Paper>
      <Card sx={{ maxWidth: 275 }}>
        {loading ? (
          <Stack spacing={1} sx={{ padding: "10px" }}>
            <Skeleton variant="text" sx={{ fontSize: 20, height: "40px" }} />
            <Skeleton variant="text" sx={{ mb: 1.5 }} />
            <Skeleton variant="text" sx={{ mb: 1.5 }} />
            <Skeleton variant="text" />
          </Stack>
        ) : (
          <CardContent>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              Počasí {weatherDetail.city}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Teplota: {weatherDetail.temperature}°C
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Vítr: {weatherDetail.speed} km/h
            </Typography>
            <Typography color="text.secondary">
              {weatherDetail.description}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default WeatherCard;
