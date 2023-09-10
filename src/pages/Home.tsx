import { t } from "i18next";
import { Link } from "react-router-dom";
import { ENV } from "../env";

import ChampionsImage from "../assets/images/lol-champions-min.jpg";

export default function HomePage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={ChampionsImage}
          style={{ width: "500px", margin: "0 auto" }}
          alt=""
        />
        <h1>{t("title")}</h1>
        <p>{t("home_introduction")}</p>
        <p>{t("subtitle")}</p>
        <Link to={"/champions"}>{t("cta_all_champions")}</Link>
      </div>
    </>
  );
}
