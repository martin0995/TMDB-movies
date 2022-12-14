import React, { useState } from "react";
import MovieItem from "./MovieItem";
import SeriesItem from "./SeriesItem";

const MoviesList = ({ movies, series }) => {

  const [showing, setShowing] = useState("movies");

  const handleMovies = () => {
    setShowing("movies");
  };

  const handleSeries = () => {
    setShowing("series");
  };

  return (
    <section className="pt-4">
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            {showing === "movies" ? (
              <div>
                <span>
                  <button
                    onClick={handleSeries}
                    class="button is-warning is-light"
                  >
                    Series recomendadas
                  </button>
                </span>
                <tr>
                  <th>Películas</th>
                </tr>
              </div>
            ) : (
              <div>
                <span>
                  <button
                    onClick={handleMovies}
                    class="button is-success is-light"
                  >
                    Peliculas recomendadas
                  </button>
                </span>
                <tr>
                  <th>Series</th>
                </tr>
              </div>
            )}
          </tr>
        </thead>
        <tbody>
          {showing === "movies" ? (
            <div>
              <tr>
                {movies.map((movie, i) => (
                  <MovieItem movie={movie} key={i} i={i} />
                ))}
              </tr>
            </div>
          ) : (
            <tr>
              {series.map((serie, i) => (
                <SeriesItem serie={serie} key={i} i={i} />
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default MoviesList;
