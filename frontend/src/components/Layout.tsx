import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
  const [height, setHeight] = useState(0);
  const nav = useRef<HTMLDivElement>(null);

  const handlerResize = () => {
    if (nav.current) setHeight(nav.current.clientHeight);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener("resize", handlerResize);
    return () => window.removeEventListener("resize", handlerResize);
  });

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3 px-4 shadow-lg position-fixed w-100"
        style={{ zIndex: 3 }}
        ref={nav}
      >
        <Link to={"/"} className="navbar-brand">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          PokeAPI
        </Link>

        <div
          className="collapse navbar-collapse d-flex flex-row-reverse"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={"/about-me"} className="nav-link">
                About me
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid" style={{ paddingTop: height }}>
        {children}
      </div>
    </Fragment>
  );
};
