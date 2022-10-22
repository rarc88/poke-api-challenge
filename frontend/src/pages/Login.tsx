import axios, { AxiosError } from "axios";
import React, { Fragment, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

export const Login = () => {
  const { setAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const body = {
        username: username.current?.value,
        password: password.current?.value,
      };
      const response = await axios.post("/v1/auth/login", body);
      const data = response.data.data;

      toast.success("Success", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAccessToken(data.access_token);

      navigate("/pokemon", { replace: true });
    } catch (e: AxiosError | any) {
      let message = "";
      if (e instanceof AxiosError) {
        if (e.response) {
          message = e.response.data.error;
        } else {
          message = e.message;
        }
      } else if (!(e instanceof AxiosError)) {
        message = e;
      }
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="row vw-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-12 p-4 border rounded shadow-lg">
          <h1 className="text-center">Login</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="col-12 mt-4">
              <label className="form-label" htmlFor="username ">
                User
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Enter your username"
                id="username"
                disabled={isLoading}
                required
                ref={username}
              />
            </div>
            <div className="col-12 mt-4">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                disabled={isLoading}
                required
                ref={password}
              />
            </div>
            <div className="col-12 mt-4 d-flex flex-row-reverse">
              {isLoading ? (
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
