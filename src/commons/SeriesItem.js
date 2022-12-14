import React from "react";
import { Link } from "react-router-dom";
import urlMaker from "../hooks/urlMaker";
import { useAuthContext } from "../context/user";
import axios from "axios";

const SeriesItem = ({ serie }) => {
  const { user } = useAuthContext();

  const handleClick = () => {
    user
      ? axios
          .post("/api/favoritos", {
            title: serie.original_name,
            imgUrl: `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${serie.poster_path}`,
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
                  serie.poster_path
                    ? `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${serie.poster_path}`
                    : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                }
                alt="Placeholder image"
              />
            </figure>
          </td>
          <td>
            <Link to={`/series/${urlMaker(serie.original_name)}`}>
              <span>{serie.original_name}</span>
            </Link>
          </td>
        </div>
        <br />
      </tr>
    </div>
  );
};

export default SeriesItem;
