import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { pathname } = useLocation();
  const [navbarColor, setNavbarColor] = useState("");

  // height change function for scrolling..........
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        setNavbarColor("shadow-md");
      } else {
        setNavbarColor("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        className={`w-full flex justify-center items-center fixed top-0 z-50 bg-white ${
          pathname !== "/" && "shadow-md"
        } ${navbarColor}`}
      >
        <div className={`w-[70%] flex justify-between items-center p-4`}>
          <div className="flex items-center justify-start">
            <img src={"/img/logo.gif"} alt="Logo_img" className="h-14 w-28" />
            <Link
              to={"/"}
              className={`text-3xl text-[#42A045] ${styles.title}`}
            >
              Digital Sharecropper
            </Link>
          </div>
          <ul className="flex items-center gap-x-10 text-md font-semibold text-gray-700">
            <li
              className={`${styles.nav_link} ${
                pathname == "/" && styles.nav_link_active
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            {/* <li
              className={`${styles.nav_link} ${
                pathname == "/appointment" && styles.nav_link_active
              }`}
            >
              <Link to="/appointment">Appointment</Link>
            </li> */}
            <li
              className={`${styles.nav_link} ${
                pathname == "/request" && styles.nav_link_active
              }`}
            >
              <Link to="/request">Request</Link>
            </li>
            <li
              className={`${styles.nav_link} ${
                pathname == "/deal" && styles.nav_link_active
              }`}
            >
              <Link to="/deal">Deal</Link>
            </li>
            <li
              className={`${styles.nav_link} ${
                pathname == "/signin" && styles.nav_link_active
              }`}
            >
              <Link to="/signin">Login</Link>
            </li>
            <li
              className={`${styles.nav_link} ${
                pathname == "/signup" && styles.nav_link_active
              }`}
            >
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
