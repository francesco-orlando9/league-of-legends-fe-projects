import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { fetchChampion } from "../utils/reactQuery";
import { getChampionSplashImageUrl } from "../utils/urlUtils";

import ChampionSpell from "../components/Champions/ChampionSpell";
import Carousel from "../components/Carousel";

import classes from "./ChampionDetailPage.module.css";
import SkinCarousel from "../components/SkinCarousel";

export default function ChampionDetailPage() {
  const params = useParams();
  const championName = params.championName?.replace(
    params.championName[0],
    params.championName.slice(0, 1).toUpperCase()
  ) as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["champion", { name: championName }],
    queryFn: ({ signal }) => fetchChampion({ championName, signal }),
    onSuccess: (data: any) => console.log("Data :: ", data),
    onError: (err) => console.log(JSON.stringify(err)),
  });

  let content = null;

  if (isLoading) {
    content = <h1>{t("loading-champion-detail")}</h1>;
  }

  if (isError) {
    content = <h1>{t("error-loading-champion-detail")}</h1>;
  }

  if (data && data.champion) {
    const { champion } = data;
    content = (
      <div className={classes.container}>
        <header className={classes.header}>
          <h1>{champion.name}</h1>
          <h2>{champion.title}</h2>
        </header>

        <section className={classes["splash-section"]}>
          <img
            id="splash-image"
            src={getChampionSplashImageUrl(championName, 0)}
            alt="Champion Splash"
          />
        </section>

        <section className={classes["champion-lore"]}>
          <h1>{t("title.champion_lore")}</h1>
          <p>{champion.lore}</p>
        </section>

        <section className={classes["champion-spells"]}>
          <h1>{t("title.champion_spells")}</h1>
          <Carousel
            type={"spells"}
            components={((): any[] => {
              return [
                <ChampionSpell
                  key={champion.passive.image.full}
                  keyPress={0}
                  isPassive={true}
                  id={champion.passive.image.full}
                  name={champion.passive.name}
                  description={champion.passive.description}
                />,
                champion.spells.map((spell: any, index: number) => (
                  <ChampionSpell
                    key={spell.id}
                    keyPress={index + 1}
                    id={spell.id}
                    name={spell.name}
                    description={spell.description}
                  />
                )),
              ];
            })()}
          />

          {}
        </section>

        <section className={classes["champion-tips"]}>
          <h1>{t("title.champion_tips")}</h1>
          <Carousel
            type={"tips"}
            components={((): any[] => {
              return [
                <div className={`${classes["playing-with-tips"]} tip`}>
                  <h1>
                    {t("playing_as")} {champion.name}
                  </h1>
                  {champion.allytips.length > 0 ? (
                    <ul>
                      {champion.allytips.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ textAlign: "center", padding: "20px" }}>
                      {t("no_tip_found")}
                    </p>
                  )}
                </div>,
                <div className={`${classes["playing-against-tips"]} tip`}>
                  <h1>
                    {t("playing_agains")} {champion.name}
                  </h1>
                  {champion.enemytips.length > 0 ? (
                    <ul>
                      {champion.enemytips.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ textAlign: "center", padding: "20px" }}>
                      {t("no_tip_found")}
                    </p>
                  )}
                </div>,
              ];
            })()}
          />
        </section>

        <section className={classes["champion-skins"]}>
          <h1>{t("title.champion_skins")}</h1>
          <SkinCarousel
            images={champion.skins.map((skin: any) => ({
              name: skin.name,
              src: getChampionSplashImageUrl(championName, skin.num),
            }))}
          />
        </section>
      </div>
    );
  }

  return <>{content}</>;
}
