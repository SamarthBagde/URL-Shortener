import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/RedirectUrl.css";

export default function RedirectUrl() {
  const { shortId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
    const redirectTorignal = async () => {
      try {
        const resp = await axios.get(`/${shortId}`);
        console.log(resp);
        if (resp.status === 200) {
          window.location.href = resp.data.originalUrl;
        } else {
          setErrorMsg(resp.data.error);
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
    };
    redirectTorignal();
  }, [shortId]);
  return errorMsg ? (
    <div className={`error-container`}>
      <div className={`error-code`}>404</div>
      <div className={`error-msg`}>{errorMsg}</div>
    </div>
  ) : (
    <div></div>
  );
}
