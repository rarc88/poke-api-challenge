import React, { Fragment, useContext, useEffect, useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { AboutMe } from "./pages/AboutMe";

export const AppRoutes = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isFirtRender = useRef(true);
  useEffect(() => {
    if (
      !isFirtRender.current &&
      !accessToken &&
      location.pathname !== "/login"
    ) {
      navigate("/login", { replace: true });
    }
    isFirtRender.current = false;
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <Fragment>
      {!accessToken ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/pokemon" element={<Home />} />
            <Route path="/pokemon/:name" element={<Detail />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="*" element={<Navigate to="/pokemon" />} />
          </Routes>
        </Layout>
      )}
    </Fragment>
  );
};

// const ProtectedRoute = ({ children }: Props) => {

//   const location = useLocation();

//   if (!accessToken && location.pathname !== "/login") {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };
