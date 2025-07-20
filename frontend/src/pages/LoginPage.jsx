import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import style from "../styles/LoginAndRegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please provide email and password correctly");
      return;
    }

    try {
      const res = await axios.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setErrorMsg("");
        navigate("/");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.leftContainer}></div>
        <div className={style.rightContainer}>
          <div className={style.formConatiner}>
            <div className={style.messageConatiner}>
              {errorMsg ? <ErrorAlert message={errorMsg} /> : <></>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.inputFiled}>
                <p>Email </p>
                <input
                  type="text"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.inputFiled}>
                <p>Password </p>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                className={style.passwordShowBtn}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon sx={{ color: "black" }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ color: "black" }} />
                )}
              </div>

              <button className={style.logRegBtn} type="submit">
                Login
              </button>
            </form>
            <div className={style.switchMsg}>
              Don't have an account?{" "}
              <Link className={style.switcBtn} to="/register">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
