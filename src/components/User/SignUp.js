import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useInput } from "../../hooks/useInput";
import { log, success, error } from "../../utils/logs";
import Spinner from "../../commons/spinner.js";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = useInput("email");
  const password = useInput("password");
  const userName = useInput("userName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("register attempt...");
    try {
      setLoading(true);
      // POST user credentials
      await axios.post("/api/user/signup", {
        userName: userName.value,
        password: password.value,
        email: email.value,
      });
      setLoading(false);
      success(`new user registered`);
      // Redirect to login!
      navigate("/api/user/login");
    } catch ({ response }) {
      // something's not right...
      setLoading(false);
      error(response.status, response.statusText);
    }
  };

  return (
    <div
      className="container"
      class=""
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/4840775.jpg")`,
        backgroundSize: "cover",
        height: 350,
      }}
    >
      <div className="columns is-centered">
        <div class="mt-6">
          <div>
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold has-text-primary-dark">
              Create your account
            </h2>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <input
                  aria-label="User name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="User name"
                  {...userName}
                />
              </div>
              <div className="-mt-px">
                <input
                  aria-label="Password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Password"
                  {...password}
                />
              </div>
              <div className="-mt-px">
                <input
                  aria-label="Email"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Email"
                  {...email}
                />
              </div>
            </div>

            <div class="container">
              <div className="columns is-centered mt-6">
                <button
                  type="submit"
                  className="button is-success"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
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
                      Sign up
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
