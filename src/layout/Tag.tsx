import classes from "./Tag.module.css";

interface TagProps {
  tagType: string;
  onClickHandler?: any;
  children: any;
  isActive?: boolean;
}

const Tag = (props: TagProps) => {
  return (
    <span
      className={`${classes.tag} ${classes[props.tagType]} ${
        props.isActive ? classes.active : ""
      }`}
      onClick={
        props.onClickHandler
          ? props.onClickHandler.bind(null, props.tagType)
          : null
      }
    >
      {props.children}
    </span>
  );
};

export default Tag;
