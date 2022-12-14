import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoritoItem from "./FavoritoItem";


const UserCard = ({ usuarios }) => {
  const params = useParams().name;
  const [favoritos, setFavoritos] = useState([]);

  const matchUser = usuarios.filter(
    (usuario) => usuario.userName.toLowerCase() === params
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/favoritos/${matchUser[0].userName}`)
      .then((res) => res.data)
      .then((favs) => setFavoritos(favs))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div class="mt-3">
      <div className="ml-3">
        <Link to="/api/user/all">
          <span>
            <button className="button is-info is-small"> ↩ Atras </button>
          </span>
        </Link>
      </div>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Favoritos de {matchUser[0].userName}</th>
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
  );
};

export default UserCard;
