import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // importa le icone dei social media

const Footer: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Link to="#" className={classes.link}>
          Chi siamo
        </Link>
        <Link to="#" className={classes.link}>
          Termini di Servizio
        </Link>
        <Link to="#" className={classes.link}>
          Politica sulla Privacy
        </Link>
      </div>

      <div className={classes.section}>
        <FaFacebook className={classes["social-icon"]} size={24} />
        <FaTwitter className={classes["social-icon"]} size={24} />
        <FaInstagram className={classes["social-icon"]} size={24} />
      </div>

      <div className={classes.copyright}>
        &copy; {new Date().getFullYear()} Nome del Progetto
      </div>
    </div>
  );
};

export default Footer;
