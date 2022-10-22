import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
  const [height, setHeight] = useState(0);
  const nav = useRef<HTMLDivElement>(null);
  const { setAccessToken } = useContext(AuthContext);

  const handlerResize = () => {
    if (nav.current) setHeight(nav.current.clientHeight);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener("resize", handlerResize);
    return () => window.removeEventListener("resize", handlerResize);
  });

  const handlerLogout = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAccessToken(null);
  };

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-0 px-4 shadow-lg position-fixed w-100"
        style={{ zIndex: 3 }}
        ref={nav}
      >
        <Link to={"/pokemon"} className="navbar-brand">
          <img
            src="/rarc.png"
            height="60"
            className="d-inline-block align-top"
            alt=""
          />
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
              <a
                href="/"
                className="nav-link"
                onClick={(e) => handlerLogout(e)}
              >
                Logout
              </a>
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
