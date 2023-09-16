import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";
import { t } from "i18next";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={classes.header}>
      <div>
        <h1>{t("site_title")}</h1>
      </div>
      <div
        className={`${classes["menu-btn"]} ${isMenuOpen ? classes.open : ""}`}
        onClick={toggleMenuHandler}
      >
        <div className={classes["menu-btn__burger"]}></div>
      </div>
      <nav className={`${classes.navbar} ${isMenuOpen ? classes.open : ""}`}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end={true}
            >
              {t("link.home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/champions"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end={true}
            >
              {t("link.champions_gallery")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end={true}
            >
              {t("link.about")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end={true}
            >
              {t("link.contact")}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
