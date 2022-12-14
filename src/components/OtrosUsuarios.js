import React from "react";
import { Link } from "react-router-dom";
import Usuario from "../commons/Usuario";

const OtrosUsuarios = ({ usuarios }) => {
    
  return (
    <div class="mt-3">
      <div class="ml-5">
        <Link to="/">
          <span>
            <button className="button is-info is-small"> ↩ Home </button>
          </span>
        </Link>
      </div>

      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Usuarios</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {usuarios.map((usuario, i) => (
              <Usuario usuario={usuario} key={i} i={i} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OtrosUsuarios;
