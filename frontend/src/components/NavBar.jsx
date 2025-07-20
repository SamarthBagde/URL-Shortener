import style from "../styles/NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = ({ title }) => {
  return (
    <>
      <div className={style.mainConatiner}>
        <div className={style.leftContainer}>{title}</div>
        <div className={style.rightContainer}>
          <Link className={style.item} to="/">
            Home
          </Link>

          <Link className={style.item} to="/links">
            Links
          </Link>

          <Link className={style.item} to="/profile">
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
