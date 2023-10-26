import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const navigate = useNavigate();
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

  // let key = localStorage.getItem('key');
  const userType = localStorage.getItem("Type");

  const logout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("Nid");
    localStorage.removeItem("Type");
    localStorage.removeItem("name");
    navigate("/signin");
  };

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
            <li
              className={`${styles.nav_link} ${
                pathname == "/blogs" && styles.nav_link_active
              }`}
            >
              <Link to="/blogs">Blogs</Link>
            </li>
            <li
              className={`${styles.nav_link} ${
                pathname == "/reviews" && styles.nav_link_active
              }`}
            >
              <Link to="/reviews">Reviews</Link>
            </li>
            {userType && (
              <>
                {userType !== "admin" && (
                  <>
                    <li
                      className={`${styles.nav_link} ${
                        pathname == "/request" && styles.nav_link_active
                      }`}
                    >
                      <Link to="/request">Request</Link>
                    </li>

                    <li
                      className={`${styles.nav_link} ${
                        pathname == "/reviews" && styles.nav_link_active
                      }`}
                    >
                      <Link to="/reviews">Reviews</Link>
                    </li>
                  </>
                )}
                <li
                  className={`${styles.nav_link} ${
                    pathname == "/deal" && styles.nav_link_active
                  }`}
                >
                  <Link to="/deal">Deal</Link>
                </li>
              </>
            )}
            {userType === "admin" && (
              <>
                <li
                  className={`${styles.nav_link} ${
                    pathname == "/transactions" && styles.nav_link_active
                  }`}
                >
                  <Link to="/transactions">Transactions</Link>
                </li>
              </>
            )}
            {userType ? (
              <div className="flex items-center gap-x-8">
                <button className="px-3 py-2 text-white rounded-md bg-[#42A045]">
                  {localStorage.getItem("name")} ({localStorage.getItem("Type")}
                  )
                </button>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-white rounded-md bg-[#42A045]"
                >
                  logout
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
