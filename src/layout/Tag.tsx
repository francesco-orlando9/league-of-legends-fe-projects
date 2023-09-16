import classes from "./Tag.module.css";

interface TagProps {
  tagType: string;
  onClickHandler?: any;
  children: any;
  isActive?: boolean;
  fromChampionCard?: boolean;
}

const Tag = (props: TagProps) => {
  return (
    <span
      className={`${classes.tag} ${classes[props.tagType]} ${
        props.isActive ? classes.active : ""
      } ${props.fromChampionCard ? classes["disable-hover"] : ""}`}
      onClick={
        props.onClickHandler
          ? props.onClickHandler.bind(null, props.tagType)
          : null
      }
      style={props.fromChampionCard ? { color: "#ffffff" } : undefined}
    >
      {props.children}
    </span>
  );
};

export default Tag;
