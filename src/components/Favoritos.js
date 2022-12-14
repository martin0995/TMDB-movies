import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import FavoritoItem from "../commons/FavoritoItem";
import { useAuthContext } from "../context/user";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [showing, setShowing] = useState("movies");
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/favoritos/movies/${user.userName}`)
      .then((res) => res.data)
      .then((favoritos) => {
        setFavoritos(favoritos);
      });
  }, []);

  const handleMovies = () => {
    setShowing("movies");

    axios
      .get(`http://localhost:3000/api/favoritos/movies/${user.userName}`)
      .then((res) => res.data)
      .then((favoritos) => {
        setFavoritos(favoritos);
      });
  };

  const handleSeries = () => {
    setShowing("series");

    axios
      .get(`http://localhost:3000/api/favoritos/series/${user.userName}`)
      .then((res) => res.data)
      .then((favoritos) => {
        setFavoritos(favoritos);
      });
  };

  return (
    <div class="mt-3">
      {" "}
      <div class="ml-5">
        <Link to="/">
          <span>
            <button className="button is-info is-small"> ↩ Home </button>
          </span>
        </Link>
      </div>
      <div>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              {showing === "movies" ? (
                <div>
                  <span>
                    <button
                      onClick={handleSeries}
                      class="button is-warning is-light is-small ml-5 mt-3"
                    >
                      Series
                    </button>
                  </span>
                  <tr>
                    <th>Películas Favoritas</th>
                  </tr>
                </div>
              ) : (
                <div>
                  <span>
                    <button
                      onClick={handleMovies}
                      class="button is-success is-light is-small ml-5 mt-3"
                    >
                      Peliculas
                    </button>
                  </span>
                  <tr>
                    <th>Series Favoritas</th>
                  </tr>
                </div>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {favoritos.map((favorito, i) => (
                <FavoritoItem favorito={favorito} key={i} i={i} />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favoritos;
