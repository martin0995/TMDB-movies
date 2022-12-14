import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import LogInPage from "./components/User/LogIn";
import Register from "./components/User/SignUp";
import Home from "./components/Home";
import axios from "axios";
import Card from "./commons/Card";
import Favoritos from "./components/Favoritos";
import OtrosUsuarios from "./components/OtrosUsuarios";
import UserCard from "./commons/UserCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=840e24d1ee1a11c50677e9265d686942&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
      )
      .then((res) => res.data)
      .then((results) => {
        setMovies(results.results);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=840e24d1ee1a11c50677e9265d686942&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
      )
      .then((res) => res.data)
      .then((results) => {
        setSeries(results.results);
      });

    axios
      .get("/api/user/all")
      .then((res) => res.data)
      .then((users) => {
        setUsuarios(users);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/api/user/login" element={<LogInPage />} />
          <Route path="/api/user/signup" element={<Register />} />
          <Route path="/" element={<Home movies={movies} series={series} />} />
          <Route
            path="/movies/:name"
            element={<Card movies={movies} series={series} />}
          />
          <Route
            path="/series/:name"
            element={<Card movies={movies} series={series} />}
          />
          <Route
            path="/api/favoritos"
            element={<Favoritos movies={movies} series={series} />}
          />
          <Route
            path="/api/user/all"
            element={<OtrosUsuarios usuarios={usuarios} />}
          />
          <Route
            path="/user/favoritos/:name"
            element={<UserCard usuarios={usuarios} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
