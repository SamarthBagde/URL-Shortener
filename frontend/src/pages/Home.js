import React, { useState } from "react";
import "../styles/Home.css";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorFlag(false);
    if (!url.trim()) {
      return;
    }
    let param;
    if (shortId.trim()) {
      param = {
        url,
        shortId,
      };
    } else {
      param = { url };
    }

    try {
      const resp = await axios.post("/shortUrl", param);
      if (resp.status === 200) {
        setShortUrl(resp.data.shortUrl);
        setErrorMsg("");
      } else {
        errorFlag(true);
        setErrorMsg(resp.data.error);
      }
      console.log(resp);

      setShortId("");
      setUrl("");
    } catch (error) {
      setErrorFlag(true);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div className={`main`}>
      <div className={`container`}>
        <form className={`input-filed`} onSubmit={onSubmit}>
          <div className={`title-1`}>Destination URL</div>
          <input
            className={`input-1`}
            type="text"
            name="urlInput"
            shortId="urlInput"
            placeholder="https://example.com/short-url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            autoComplete="off"
            required
            pattern="https?://.*"
          />
          <div className={`title-1`}>Custom back-half (optional)</div>
          <input
            className={`input-2`}
            type="text"
            name="urlInput"
            shortId="urlInput"
            placeholder="Ex. XYZ"
            value={shortId}
            onChange={(e) => {
              setShortId(e.target.value);
            }}
            autoComplete="off"
          />
          <div className={`submit-btn-container`}>
            <button className={`submit-btn`} type="submit">
              Create link
            </button>
          </div>
        </form>
        <div className={`output-filed`}>
          {errorFlag ? (
            <div>
              <div className={`heading red-text`}>Error!!</div>
              <div className={`text red-text`}>{errorMsg ? errorMsg : ""}</div>
            </div>
          ) : (
            <div>
              <div className={`heading white-text`}>Short URL</div>
              <div className={`text white-text`}>
                {shortUrl ? shortUrl : ""}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
