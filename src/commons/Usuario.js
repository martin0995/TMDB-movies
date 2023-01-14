import React from "react";
import { Link } from "react-router-dom";
import urlMaker from "../hooks/urlMaker";

const Usuario = ({ usuario }) => {
  return (
    <div>
      <tr>
        <div className={"column-1"}>
          <td>
            <figure className="image is-48x48">
              <img
                src={
                  "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                }
                alt="user"
              />
            </figure>
          </td>
          <td>
            <Link to={`/user/favoritos/${urlMaker(usuario.userName)}`}>
              <span>{usuario.userName}</span>
            </Link>
          </td>
        </div>
        <br />
      </tr>
    </div>
  );
};

export default Usuario;
