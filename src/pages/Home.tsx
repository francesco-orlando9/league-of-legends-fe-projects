import { t } from "i18next";
import { Link } from "react-router-dom";

import ChampionsImage from "../assets/images/lol-champions-min.jpg";
import classes from "./Home.module.css";

export default function HomePage() {
  return (
    <>
      <div className={classes["home-container"]}>
        <img
          className={classes["champions-image"]}
          src={ChampionsImage}
          alt=""
        />
        <h1>{t("title.home")}</h1>
        <p>{t("home_introduction")}</p>
        <p>{t("subtitle")}</p>
        <Link to={"/champions"}>{t("cta_all_champions")}</Link>
      </div>
    </>
  );
}
