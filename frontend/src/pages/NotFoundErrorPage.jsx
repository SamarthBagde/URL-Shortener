import { useNavigate } from "react-router-dom";
import style from "../styles/NotFoundErrorPage.module.css"; // CSS module

const NotFoundErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>404</h1>
        <p className={style.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <button className={style.button} onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundErrorPage;
