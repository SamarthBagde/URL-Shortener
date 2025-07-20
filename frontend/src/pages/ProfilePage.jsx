import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import Avatar from "../components/Avatar";
import NavBar from "../components/NavBar";
import style from "../styles/ProfilePage.module.css";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const username =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const res = await axios.get("/user/logout", { withCredentials: true });

      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar title={"User Profile"} />
      <div className={style.infoConatiner}>
        <Avatar letter={username[0]} />
        <div className={style.usernameConatiner}>Welcome, {username}!</div>
        <div className={style.emailConatiner}>{user.email}</div>
        <hr />
        <div className={style.btnContainer}>
          <button className={style.logOutBtn} onClick={onClick}>
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
