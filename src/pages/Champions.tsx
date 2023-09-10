import ChampionsGeneric from "../components/Champions/ChampionGeneric";
import { useLoaderData } from "react-router-dom";
import { getChampionsUrl } from "../utils/urlUtils";

import classes from "./ChampionsPage.module.css";
import Tag from "../layout/Tag";

const tags = ["Mage", "Tank", "Fighter", "Assassin", "Marksman", "Support"];

export default function ChampionsPage() {
  const data: any = useLoaderData();
  const champions = data && data.champions;
  return (
    <>
      <div className={classes.filters}>
        <div className={classes["tags-container"]}>
          {tags.map((tag) => (
            <Tag key={tag} tagType={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className={classes["champions-container"]}>
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
      </div>
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
