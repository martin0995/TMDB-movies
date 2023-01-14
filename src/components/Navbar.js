import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/user";
import { log, success, error } from "../utils/logs";

const Navbar = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    log("logout attempt...");
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("user");
      setUser({});
      success("logged out");
      navigate("/");
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  const handleFavoritos = () => {
    alert("Debes loggearte para acceder a favoritos.");
    navigate("/api/user/login");
  };

  return (
    <nav
      className="navbar has-background-black-ter"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/823503.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="navbar-item navbar-end">
          <Link to={"/"}>
            <h3 className="navbar-item has-text-white has-text-centered">
              The Movie Database
            </h3>
          </Link>
          {user.userName ? (
            <>
              <p className="has-text-white is-pulled-right ml-4 mr-3">
                {user.userName}
              </p>
              <span>
                <button
                  onClick={handleLogout}
                  className="button is-primary is-pulled-right is-small"
                >
                  {" "}
                  Log out{" "}
                </button>
              </span>
              <Link to="/api/user/all">
                <button className="button is-secondary is-light is-small">
                  <strong> Usuarios</strong>
                </button>
              </Link>
              <a
                href="http://localhost:3000/api/favoritos"
                className="button is-secondary is-dark is-small"
              >
                <strong>Favoritos 🤍</strong>
              </a>
            </>
          ) : (
            <div className={"navbar-item navbar-end"}>
              <a
                href="http://localhost:3000/api/user/login"
                className="button is-primary is-small"
              >
                <strong>Log in</strong>
              </a>
              <a
                href="http://localhost:3000/api/user/signup"
                className="button is-secondary is-small"
              >
                <strong>Sign up</strong>
              </a>
              <button
                onClick={handleFavoritos}
                className="button is-secondary is-pulled-right is-dark is-small"
              >
                <strong>Favoritos 🤍</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
