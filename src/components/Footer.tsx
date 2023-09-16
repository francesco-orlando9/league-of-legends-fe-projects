import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import lolLogo from "../assets/images/lol_icon_v3_white.svg";
import { t } from "i18next";

const Footer: React.FC = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.section}>
        <div className={classes["footer-logo"]}>
          <img src={lolLogo} alt="League of Legends Logo" />
        </div>
        <div className={classes["footer-links"]}>
          <Link to={"/"} className={classes.link}>
            {t("link.home")}
          </Link>
          <Link to={"/champions"} className={classes.link}>
            {t("link.champions_gallery")}
          </Link>
          <Link to={"/about"} className={classes.link}>
            {t("link.about")}
          </Link>
          <Link to={"/contact"} className={classes.link}>
            {t("link.contact")}
          </Link>
        </div>
      </div>

      <div className={classes.copyright}>
        &copy; {new Date().getFullYear()} {t("footer_rights")}
      </div>
    </footer>
  );
};

export default Footer;
