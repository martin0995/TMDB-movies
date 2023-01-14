import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/user";
import axios from "axios";

const Card = ({ movies, series }) => {
  const params = useParams().name; //Me tira el nombre de la pelicula/serie de la url
  const { user } = useAuthContext();

  const urlToMovie = (str) => {
    const movieName = str.replace(/_/g, " ");
    return movieName;
  };

  const matchMovie = movies.filter(
    (movie) => movie.original_title.toLowerCase() === urlToMovie(params)
  );

  const matchSerie = series.filter(
    (serie) => serie.original_name.toLowerCase() === urlToMovie(params)
  );

  const handleMovie = () => {
    user
      ? axios
          .post("/api/favoritos", {
            title: matchMovie[0].original_title,
            imgUrl: `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${matchMovie[0].poster_path}`,
            user: user.userName,
            movie: true,
          })
          .then(() => alert(`Película agregada exitosamente.`))
          .catch(() =>
            alert("Se ha producido un error al intentar agregar la película.")
          )
      : alert("Necesita iniciar sesión para añadir peliculas a favoritos.");
  };

  const handleSerie = () => {
    user
      ? axios
          .post("/api/favoritos", {
            title: matchSerie[0].original_name,
            imgUrl: `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${matchSerie[0].poster_path}`,
            user: user.userName,
            movie: false,
          })
          .then(() => alert(`Serie agregada exitosamente.`))
          .catch(() =>
            alert("Se ha producido un error al intentar agregar la serie.")
          )
      : alert("Necesita iniciar sesión para añadir series a favoritos.");
  };

  return (
    <div class="mt-3">
      {matchMovie[0] ? (
        <>
          <div className="ml-3">
            <Link to="/">
              <span>
                <button className="button is-info is-small"> Atras </button>
              </span>
            </Link>
          </div>
          <br />

          <table>
            <thead>
              <div className="ml-3">
                <div className="container">
                  <div className="rows is-centered">
                    <p className="title is-6">{matchMovie[0].original_title}</p>
                  </div>
                </div>
              </div>
            </thead>
            <br />
            <tbody>
              <tr>
                <td>
                  <div className="ml-3">
                    <figure className="image is-128x128">
                      <img
                        src={
                          matchMovie[0].poster_path
                            ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${matchMovie[0].poster_path}`
                            : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                        }
                        alt="movie"
                      />
                    </figure>
                  </div>
                </td>

                <div class="mr-4">
                  <div className="ml-3">
                    <div class="mb-3">
                      <td>
                        <button
                          className="button is-dark is-small"
                          onClick={handleMovie}
                        >
                          🤍 Agregar a favoritos
                        </button>
                      </td>
                    </div>
                    <div class="mb-2">
                      <th>Rating:</th>
                      <td>{matchMovie[0].vote_average}</td>
                    </div>
                    <th>Overview:</th>
                    <td>{matchMovie[0].overview}</td>
                  </div>
                  <div className="ml-3 mt-2">
                    <th>Release Date:</th>
                    <td>{matchMovie[0].release_date}</td>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="ml-3">
            <Link to="/">
              <span>
                <button className="button is-info is-small"> Atras </button>
              </span>
            </Link>
          </div>
          <br />

          <table>
            <thead>
              <div className="ml-3">
                <div className="container">
                  <div className="rows is-centered">
                    <p className="title is-6">{matchSerie[0].original_name}</p>
                  </div>
                </div>
              </div>
            </thead>
            <br />
            <tbody>
              <tr>
                <td>
                  <div className="ml-3">
                    <figure className="image is-128x128">
                      <img
                        src={
                          matchSerie[0].poster_path
                            ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${matchSerie[0].poster_path}`
                            : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                        }
                        alt="movie"
                      />
                    </figure>
                  </div>
                </td>
                <>
                  <div className="ml-3">
                    <div>
                      <td>
                        <button
                          className="button is-dark is-small"
                          onClick={handleSerie}
                        >
                          🤍 Agregar a favoritos
                        </button>
                      </td>
                    </div>
                    <div>
                      <th>Rating:</th>
                      <td>{matchSerie[0].vote_average}</td>
                      <br />
                    </div>
                    <th>Overview:</th>
                    <td>{matchSerie[0].overview}</td>
                    <br />
                  </div>
                  <div className="ml-3">
                    <th>Release Date:</th>
                    <td>{matchSerie[0].first_air_date}</td>
                  </div>
                </>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Card;

/*
backdrop_path
: 
null
first_air_date
: 
"2017-03-13"
genre_ids
: 
[99]
id
: 
98271
name
: 
"arte Regards"
origin_country
: 
(2) ['DE', 'FR']
original_language
: 
"fr"
original_name
: 
"arte Regards"
overview
: 
""
popularity
: 
92.978
poster_path
: 
"/19ChTJxvw9jZpMnWKsuXc83eI5C.jpg"
vote_average
: 
1
vote_count
: 
1
*/
