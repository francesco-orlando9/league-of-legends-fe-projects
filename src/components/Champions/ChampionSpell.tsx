import {
  getChampionPassiveImgUrl,
  getChampionSpellImgUrl,
} from "../../utils/urlUtils";
import classes from "./ChampionSpell.module.css";

interface ChampionSpellProps {
  isPassive?: boolean;
  id: string;
  name: string;
  description: string;
}
const passiveRegex = /<[^>]+>.*?<\/[^>]+>/g;

const ChampionSpell = ({
  id,
  name,
  description: ogDescription,
  isPassive = false,
}: ChampionSpellProps) => {
  let description = isPassive
    ? ogDescription.replace(passiveRegex, "")
    : ogDescription;
  return (
    <div className={classes.spell}>
      <div className={classes["spell-image"]}>
        <img
          src={
            isPassive
              ? getChampionPassiveImgUrl(id)
              : getChampionSpellImgUrl(id)
          }
          alt={`${name} Spell`}
        />
      </div>

      <div className={classes["spell-text"]}>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ChampionSpell;
