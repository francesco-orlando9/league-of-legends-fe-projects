import ChampionsGeneric from "../components/Champions/ChampionGeneric";
import { useLoaderData } from "react-router-dom";
import { getChampionSuggestionImgUrl } from "../utils/urlUtils";

import { queryClient, fetchChampions } from "../utils/reactQuery";

import classes from "./ChampionsPage.module.css";
import Tag from "../layout/Tag";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const tags = ["Mage", "Tank", "Fighter", "Assassin", "Marksman", "Support"];

export default function ChampionsPage() {
  const [champions, setChampions] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { data, isError, error } = useQuery({
    queryKey: ["champions"],
    // @ts-ignore
    queryFn: ({ signal }) => fetchChampions(signal),
    staleTime: 3 * 60 * 10000, // 30 minuti
  });

  useEffect(() => {
    const fetchedChampions = data?.champions || [];
    if (
      fetchedChampions &&
      activeFilters.length === 0 &&
      searchText.trim() === ""
    ) {
      setChampions(fetchedChampions);
    } else if (activeFilters.length !== 0 && searchText.trim() === "") {
      let _champions = [...fetchedChampions];
      activeFilters.forEach((filter) => {
        _champions = _champions.filter((c) => c.tags.includes(filter));
      });
      setChampions(_champions);
    } else if (activeFilters.length === 0 && searchText.trim() !== "") {
      let _champions = [...fetchedChampions];
      _champions = _champions.filter((c) =>
        c.name.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setChampions(_champions);
    } else if (activeFilters.length !== 0 && searchText.trim() !== "") {
      let _champions = [...fetchedChampions];
      activeFilters.forEach((filter) => {
        _champions = _champions.filter(
          (c) =>
            c.tags.includes(filter) &&
            c.name.toLowerCase().startsWith(searchText.toLowerCase())
        );
      });
    }
  }, [data, activeFilters, searchText]);

  const onTagClickHandler = (tagType: string) => {
    if (searchText.trim() !== "") setSearchText("");
    setActiveFilters((prevState) => {
      let newState: string[] = [];

      const index = prevState.findIndex((tag) => tag === tagType);
      if (index !== -1) {
        newState = prevState.filter((tag) => tag !== tagType);
      } else {
        newState = [...prevState, tagType];
      }

      return newState;
    });
  };

  const onSearchHandler = (name: string) => {
    if (activeFilters.length > 0) setActiveFilters([]);
    setSearchText(name);
  };

  const getChampionsInfo = () => {
    const championsInfo: { imgUrl: string; name: string }[] = [];
    data &&
      data.champions.forEach((c: any) => {
        const imageUrl = getChampionSuggestionImgUrl(c.id);

        const name = c.name;
        championsInfo.push({ imgUrl: imageUrl, name });
      });

    return championsInfo;
  };

  return (
    <>
      <div style={{ display: isError ? "block" : "none" }}>
        <h1>Couldnt fetch champhions info</h1>
      </div>
      <div
        className={classes["filters-container"]}
        style={{ display: !isError ? "flex" : "none" }}
      >
        <div className={classes["searchbar-container"]}>
          <SearchBar
            championsInfo={getChampionsInfo()}
            onSearchHandler={onSearchHandler}
          />
        </div>
        <span>Or</span>
        <div className={classes["tags-container"]}>
          {tags.map((tag) => (
            // TODO: Aggiungere classe active a questi tag, aggiungere cursor pointer
            // N.B. Queste classi non devono essere applicati ai tag nella card.
            <Tag
              key={tag}
              tagType={tag}
              isActive={activeFilters.includes(tag)}
              onClickHandler={onTagClickHandler}
            >
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
  // const _champions = await fetch(getChampionsUrl());
  // let champions: any = null;
  // if (_champions.ok) {
  //   champions = await _champions.json();
  // }

  // const championsArray: any = [];
  // Object.keys(champions.data).forEach((key) =>
  //   championsArray.push(champions.data[key])
  // );
  // return { champions: championsArray };

  return queryClient.fetchQuery({
    queryKey: ["champions"],
    // @ts-ignore
    queryFn: ({ signal }) => fetchChampions(signal),
    staleTime: 3 * 60 * 10000, // 30 minuti
  });
}
