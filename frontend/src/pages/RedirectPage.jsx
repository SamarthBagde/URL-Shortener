// RedirectPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "../styles/RedirectPage.module.css";

const RedirectPage = () => {
  const { shortId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUrl = async () => {
      try {
        const res = await axios.get(`/url/${shortId}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          window.location.href = res.data.destinationUrl;
        }
      } catch (error) {
        console.log("💥💥", error);
        const message =
          error.response?.data?.message ||
          "Failed to redirect. Please try again.";
        setErrorMsg(message);
        setLoading(false);
      }
    };

    getUrl();
  }, [shortId]);

  return (
    <div className={style.mainContainer}>
      {loading && !errorMsg && <p className={style.message}>Redirecting...</p>}
      {errorMsg && <p className={style.error}>{errorMsg}</p>}
    </div>
  );
};

export default RedirectPage;
