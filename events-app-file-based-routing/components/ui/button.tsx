import Link from "next/link";
import classes from "./button.module.css";
import { MouseEventHandler } from "react";

const Button: React.FC<{
  children: React.ReactNode;
  link?: string;
  onClickhandler?: (e: React.MouseEvent<HTMLElement>) => void;
}> = ({ children, link, onClickhandler }) => {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClickhandler!} className={classes.btn}>
      {children}
    </button>
  );
};

export default Button;
