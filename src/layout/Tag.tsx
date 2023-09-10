import classes from "./Tag.module.css";

const Tag = (props: any) => {
  return (
    <span className={`${classes.tag} ${classes[props.tagType]}`}>
      {props.children}
    </span>
  );
};

export default Tag;
