import ChampionsGeneric from "../components/Champions/ChampionGeneric";
import { getChampionSuggestionImgUrl } from "../utils/urlUtils";

import { fetchChampions } from "../utils/reactQuery";

import classes from "./ChampionsPage.module.css";
import Tag from "../layout/Tag";
import SearchBar from "../components/SearchBar";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";

const tags = ["Mage", "Tank", "Fighter", "Assassin", "Marksman", "Support"];

export default function ChampionsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["champions"],
    // @ts-ignore
    queryFn: ({ signal }) => fetchChampions(signal),
  });

  const champions = useMemo(() => {
    const fetchedChampions = data?.champions || [];
    let _champions = [...fetchedChampions];

    if (activeFilters.length !== 0) {
      _champions = _champions.filter((c) =>
        activeFilters.every((filter) => c.tags.includes(filter))
      );
    }

    if (searchText.trim() !== "") {
      _champions = _champions.filter((c) =>
        c.name.toLowerCase().startsWith(searchText.toLowerCase())
      );
    }
    return _champions;
  }, [data, activeFilters, searchText]);

  const onTagClickHandler = useCallback(
    (tagType: string) => {
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
    },
    [searchText]
  );

  const onSearchHandler = useCallback(
    (name: string) => {
      if (activeFilters.length > 0) setActiveFilters([]);
      setSearchText(name);
    },
    [activeFilters]
  );

  const showFilter = useMemo(() => {
    return (
      champions.length > 0 ||
      (champions.length === 0 &&
        (activeFilters.length > 0 || searchText.trim() !== ""))
    );
  }, [champions, activeFilters, searchText]);

  const getChampionsInfo = useMemo(() => {
    const fetchedChampions = data?.champions || [];
    return fetchedChampions.map((c: any) => ({
      imgUrl: getChampionSuggestionImgUrl(c.id),
      name: c.name,
    }));
  }, [data]);

  return (
    <>
      {isError && (
        <div className={classes.error}>
          <h1>Couldnt fetch champhions info</h1>
        </div>
      )}
      {isLoading && (
        <div className={classes.loading}>
          <h1>Loading champions..</h1>
        </div>
      )}
      {showFilter && (
        <div
          className={classes["filters-container"]}
          style={{ display: !isError ? "flex" : "none" }}
        >
          <div className={classes["searchbar-container"]}>
            <SearchBar
              championsInfo={getChampionsInfo}
              onSearchHandler={onSearchHandler}
            />
          </div>
          <span>{t("or")}</span>
          <div className={classes["tags-container"]}>
            {tags.map((tag) => (
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
      )}

      {champions.length > 0 && (
        <div className={classes["champions-container"]}>
          {champions.map((champion: any) => (
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
      )}
      {!(champions.length > 0) &&
        (activeFilters.length > 0 || searchText.trim() !== "") && (
          <div className={classes["no-champions"]}>
            <h1 style={{ textAlign: "center" }}>{t("no_champions_found")}</h1>
          </div>
        )}
    </>
  );
}
