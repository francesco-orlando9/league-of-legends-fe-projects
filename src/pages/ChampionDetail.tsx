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
      <>
        <header className={classes.header}>
          <h1>{champion.name}</h1>
          <h2>{champion.title}</h2>
        </header>
        <section className={classes["splash-section"]}>
          <img
            src={getChampionSplashImageUrl(championName)}
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
      </>
    );
  }

  return <>{content}</>;
}
