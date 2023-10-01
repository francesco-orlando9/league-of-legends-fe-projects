import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchChampion } from "../utils/reactQuery";
import classes from "./ChampionDetailPage.module.css";
import { getChampionSplashImageUrl } from "../utils/urlUtils";
import ChampionSpell from "../components/Champions/ChampionSpell";
import Carousel from "../components/Carousel";

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
    content = <h1>Loading champion data</h1>;
  }

  if (isError) {
    content = <h1>Error occured</h1>;
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
            src={getChampionSplashImageUrl(championName, 0)}
            alt="Champion Splash"
          />
        </section>
        <section className={classes["champion-lore"]}>
          <h1>Lore</h1>
          <p>{champion.lore}</p>
        </section>
        <section className={classes["champion-spells"]}>
          <h1>Spells</h1>
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
          <Carousel
            type={"tips"}
            components={((): any[] => {
              return [
                <div className={`${classes["playing-with-tips"]} tip`}>
                  <h1>Playing as {champion.name}</h1>
                  {champion.allytips.length > 0 ? (
                    <ul>
                      {champion.allytips.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ textAlign: "center", padding: "20px" }}>
                      No tip found!
                    </p>
                  )}
                </div>,
                <div className={`${classes["playing-against-tips"]} tip`}>
                  <h1>Playing against {champion.name}</h1>
                  {champion.enemytips.length > 0 ? (
                    <ul>
                      {champion.enemytips.map((tip: string) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ textAlign: "center", padding: "20px" }}>
                      No tip found!
                    </p>
                  )}
                </div>,
              ];
            })()}
          />
        </section>
      </div>
    );
  }

  return <>{content}</>;
}
