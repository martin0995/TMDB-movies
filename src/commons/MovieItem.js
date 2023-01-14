import React from "react";
import { Link } from "react-router-dom";
import urlMaker from "../hooks/urlMaker";
import axios from "axios";
import { useAuthContext } from "../context/user";

const MovieItem = ({ movie }) => {
  const { user } = useAuthContext();
  /*
  Como esta formado el USER?
  user = {emal: "",userName: ""}
  */

  const handleClick = () => {
    user
      ? axios
          .post("/api/favoritos", {
            title: movie.original_title,
            imgUrl: `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path}`,
            user: user.userName,
            movie: true,
          })
          .then(() => alert(`Película agregada exitosamente.`))
          .catch(() =>
            alert("Se ha producido un error al intentar agregar la película.")
          )
      : alert("Necesita iniciar sesión para añadir peliculas a favoritos.");
  };

  return (
    <div>
      <tr>
        <div className={"column-1"}>
          <td>
            <button
              className="button is-outlined is-small"
              onClick={handleClick}
            >
              🖤
            </button>
          </td>
          <td>
            <figure className="image is-48x48">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${movie.poster_path}`
                    : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                }
                alt="movie"
              />
            </figure>
          </td>
          <td>
            <Link to={`/movies/${urlMaker(movie.original_title)}`}>
              <span>{movie.original_title}</span>
            </Link>
          </td>
        </div>
        <br />
      </tr>
    </div>
  );
};

export default MovieItem;
