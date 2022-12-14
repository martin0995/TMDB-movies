import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../commons/spinner";
import { useAuthContext } from "../../context/user";
import { useInput } from "../../hooks/useInput";
import { log, success, error } from "../../utils/logs";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const userName = useInput("userName");
  const password = useInput("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("login attempt...");
    try {
      setLoading(true);
      setError(false);
      // POST user credentials
      const { data } = await axios.post("/api/user/login", {
        userName: userName.value,
        password: password.value,
      });
      // Set new state
      setUser(data);
      setLoading(false);
      success(`logged user ${data.userName}`);

      // store the user in localStorage to PERSIST:
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to home page
      navigate("/");
    } catch (response) {
      // something's not right...
      setLoading(false);
      error(response.status, response.statusText);
      setError(true);
    }
  };

  useEffect(() => {
    if (user.userName) {
      navigate("/");
    }
  }, [user]);

  return (
    <section 
    class=""
    style={{
      backgroundImage: `url("https://wallpaperaccess.com/full/4840775.jpg")`,
      backgroundSize: "cover",
      height: 350
    }}>
      <div
        
      >
        <div class="container is-fullheight">
          <div className="columns is-centered">
            <div class="mt-6">
              <div>
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold has-text-primary-dark">
                  Sign in to your account
                </h2>
              </div>
              <form className="mt-8" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm">
                  <div>
                    <input
                      aria-label="userName address"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                      placeholder="userName"
                      {...userName}
                    />
                  </div>
                  <div className="-mt-px">
                    <input
                      aria-label="Password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                      placeholder="Password"
                      {...password}
                    />
                  </div>
                </div>

                <div
                  className={`items-center ${
                    hasError ? "justify-between" : "justify-end"
                  }`}
                >
                  {hasError && (
                    <p className="has-text-danger">Invalid Credentials</p>
                  )}
                </div>

                <div class="container">
                  <div className="columns is-centered mt-6">
                    <button type="submit" className="button is-success">
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          <span>
                            <svg
                              className="h-5 w-5 transition ease-in-out duration-150"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          Sign in
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
