import React from "react";
import { Link, useLocation } from "react-router-dom";
import urlMaker from "../hooks/urlMaker";
import axios from "axios";

const FavoritoItem = ({ favorito }) => {
  const location = useLocation().pathname;

  const handleClick = () => {
    axios
      .delete(`/api/favoritos/${favorito.id}`)
      .then(window.location.reload());
  };

  return (
    <div>
      {location.includes("user") ? (
        <div>
          <tr>
            <div className={"column-1"}>
              <td>
                <figure className="image is-48x48">
                  <img
                    src={
                      favorito.imgUrl
                        ? `${favorito.imgUrl}`
                        : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                    }
                    alt="movie"
                  />
                </figure>
              </td>
              <td>
                <Link to={`/movies/${urlMaker(favorito.title)}`}>
                  <span>{favorito.title}</span>
                </Link>
              </td>
            </div>
            <br />
          </tr>
        </div>
      ) : (
        <div>
          <tr>
            <div className={"column-1"}>
              <td>
                <button
                  className="button is-small is-danger"
                  onClick={handleClick}
                >
                  ✖️
                </button>
              </td>
              <td>
                <figure className="image is-48x48">
                  <img
                    src={
                      favorito.imgUrl
                        ? `${favorito.imgUrl}`
                        : "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                    }
                    alt="movie"
                  />
                </figure>
              </td>
              <td>
                <Link to={`/movies/${urlMaker(favorito.title)}`}>
                  <span>{favorito.title}</span>
                </Link>
              </td>
            </div>
            <br />
          </tr>
        </div>
      )}
    </div>
  );
};

export default FavoritoItem;

// ✖️
