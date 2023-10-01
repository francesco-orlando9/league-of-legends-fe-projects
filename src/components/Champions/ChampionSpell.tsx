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
  keyPress: number;
}
const passiveRegex = /<[^>]+>.*?<\/[^>]+>/g;

const spellKeys = ["P", "Q", "W", "E", "R"];

const ChampionSpell = ({
  id,
  name,
  description: ogDescription,
  isPassive = false,
  keyPress,
}: ChampionSpellProps) => {
  let description = isPassive
    ? ogDescription.replace(passiveRegex, "")
    : ogDescription;

  const spellKey = spellKeys[keyPress];
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

      <div className={`${classes["spell-text"]} spell-text`}>
        <h4>
          [{spellKey}] {name}
        </h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ChampionSpell;
