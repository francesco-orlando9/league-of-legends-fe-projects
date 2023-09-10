import classes from "./Card.module.css";

const ChampionCard = (props: any) => {
  return <div className={classes["champion-card"]}>{props.children}</div>;
};

export default ChampionCard;
