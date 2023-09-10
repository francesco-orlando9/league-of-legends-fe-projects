import { useState } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";

import { GiRelicBlade, GiCheckedShield } from "react-icons/gi";
import { IoExtensionPuzzle } from "react-icons/io5";
import {
  FaStar,
  FaRegStar,
  FaRegStarHalfStroke,
  FaWandSparkles,
  FaRotate,
  FaArrowRight,
} from "react-icons/fa6";

import ChampionCard from "../../layout/ChampionCard";
import Tag from "../../layout/Tag";

import classes from "./ChampionsGeneric.module.css";
import { getChampionCardImgUrl } from "../../utils/urlUtils";

interface ChampionsGenericProps {
  id: string;
  name: string;
  title: string;
  info: StatInfo;
  tags: string[];
  blurb: string;
}

interface StatInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

enum POSSIBLE_DIFFICULT {
  ZERO = 0,
  HALF = 0.5,
  ONE = 1,
}

// UTILITIES FUNCTIONS

const reduceBlurb = (blurb: string) => {
  return blurb.slice(0, blurb.length / 2).concat("...");
};

// Since info.difficulty is 1-10 scale
// and we want only max 5 start
// we convert into a 1-5 scale.
const convertScale = (difficulty: number): POSSIBLE_DIFFICULT => {
  const customRound = (value: number): POSSIBLE_DIFFICULT => {
    let decimal = value % 1;
    if (decimal >= 0.3 && decimal <= 0.7) {
      return Math.floor(value) + 0.5;
    } else if (decimal < 0.3) {
      return Math.floor(value);
    } else {
      return Math.ceil(value);
    }
  };

  let convertedValue = (4 / 9) * difficulty + 5 / 9;
  return customRound(convertedValue);
};

// Tranform difficult into an array so we can map it later and get stars.
// Ex. 3 => [1,1,1,0,0] - 3.5 => [1,1,1,0.5,0] and so on.
const getDifficultyArray = (difficulty: number): POSSIBLE_DIFFICULT[] => {
  const splitValue = () => {
    let result = [];
    let _difficulty = convertScale(difficulty);
    for (let i = 0; i < 5; i++) {
      if (_difficulty >= 1) {
        result.push(1);
        _difficulty -= 1;
      } else if (_difficulty === 0.5) {
        result.push(0.5);
        _difficulty -= 0.5;
      } else {
        result.push(0);
      }
    }
    return result;
  };

  return splitValue();
};

//

const ChampionsGeneric = ({
  id,
  name,
  title,
  info,
  tags,
  blurb,
}: ChampionsGenericProps) => {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const isMobile = window.innerWidth <= 768;

  const blurbText = isMobile ? reduceBlurb(blurb) : blurb;

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  const getStars = (statistic: number) => {
    let difficulty = getDifficultyArray(statistic);

    return difficulty.map((diff: POSSIBLE_DIFFICULT, index: number) => {
      if (diff === POSSIBLE_DIFFICULT.ZERO) return <FaRegStar key={index} />;
      if (diff === POSSIBLE_DIFFICULT.HALF)
        return <FaRegStarHalfStroke key={index} />;
      return <FaStar key={index} />;
    });
  };

  const getTag = () => {
    return tags.map((tagType: string, index: number) => (
      <Tag key={index} tagType={tagType}>
        {t(tagType)}
      </Tag>
    ));
  };

  return (
    <ChampionCard>
      <h1 className={classes.name}>{name}</h1>
      {/* <div className={classes.tags}>{getTag()}</div> */}
      <div className={classes.container} onClick={handleRotate}>
        <div
          className={classes.tags}
          style={{
            transform: isRotated ? "rotateY(180deg)" : "rotateY(0deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {getTag()}
        </div>
        <div
          className={classes.flip}
          style={{
            transform: isRotated ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <FaRotate color="#ffffff" />
        </div>
        <img
          className={classes["champion-image"]}
          style={{
            transform: isRotated ? "rotateY(180deg)" : "rotateY(0deg)",
            backfaceVisibility: "hidden",
          }}
          src={getChampionCardImgUrl(id)}
          alt={t("champion")}
        />
        <div
          className={classes["container-back"]}
          style={{
            transform: isRotated ? "rotateY(0deg)" : "rotateY(-180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <h3 className={classes.subname}>{title}</h3>
            <p className={classes.blurb}>{blurbText}</p>
          </div>
          <div className={classes.stats}>
            <p className={classes.stat}>
              {t("difficulty")} <IoExtensionPuzzle />: <br />{" "}
              {getStars(info.difficulty)}
            </p>
            <p className={classes.stat}>
              {t("attack")} <GiRelicBlade />: <br /> {getStars(info.attack)}
            </p>
            <p className={classes.stat}>
              {t("magic")} <FaWandSparkles />: <br /> {getStars(info.magic)}
            </p>
            <p className={classes.stat}>
              {t("defense")} <GiCheckedShield />: <br />{" "}
              {getStars(info.defense)}
            </p>
          </div>
        </div>
      </div>
      <Link to={""}>
        {t("go_detail")} <FaArrowRight />
      </Link>
    </ChampionCard>
  );
};

export default ChampionsGeneric;
