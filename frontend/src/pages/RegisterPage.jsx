import { useState } from "react";
import style from "../styles/LoginAndRegisterPage.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMsg("Please provide all fields correctly");
      return;
    }

    try {
      const res = await axios.post(
        "/user/register",
        {
          username,
          email,
          password,
          confirmPassword,
        },
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
                <p>Username </p>
                <input
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              </div>{" "}
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
              <div className={style.inputFiled}>
                <p>Confirm Password </p>
                <input
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className={style.logRegBtn} type="submit">
                Register
              </button>
            </form>
            <div className={style.switchMsg}>
              Already have an account?{" "}
              <Link className={style.switcBtn} to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
