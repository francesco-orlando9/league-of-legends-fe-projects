import ChampionsGeneric from "../components/Champions/ChampionGeneric";
import { useLoaderData } from "react-router-dom";
import { getChampionsUrl } from "../utils/urlUtils";

export default function ChampionsPage() {
  const data: any = useLoaderData();
  const champions = data && data.champions;
  return (
    <>
      {champions &&
        champions.map((champion: any) => (
          <ChampionsGeneric
            key={champion.key}
            id={champion.id}
            info={champion.info}
            name={champion.name}
            title={champion.title}
            blurb={champion.blurb}
            tags={champion.tags}
          />
        ))}
    </>
  );
}

export async function loader() {
  const _champions = await fetch(getChampionsUrl());
  let champions: any = null;
  if (_champions.ok) {
    champions = await _champions.json();
  }

  const championsArray: any = [];
  Object.keys(champions.data).forEach((key) =>
    championsArray.push(champions.data[key])
  );
  return { champions: championsArray };
}
