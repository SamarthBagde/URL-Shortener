import { useState } from "react";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";
import NavBar from "../components/NavBar";
import SuccessMsg from "../components/SuccessMsg";
import style from "../styles/HomePage.module.css";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [backHalf, setBackHalf] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setmsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setmsg("");

    if (!title.trim() || !destinationUrl.trim()) {
      setErrorMsg("Please provide tile and destination url");
      return;
    }

    try {
      const res = await axios.post(
        "/url/shortUrl",
        {
          destinationUrl,
          title,
          backHalf,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setErrorMsg("");
        setmsg(
          `Short url create successfully. You can access through "${res.data.data.shortUrl}"`
        );

        setTimeout(() => {
          setmsg("");
        }, 10 * 1000);
      } else {
        console.log(res);
      }
      setTitle("");
      setDestinationUrl("");
      setBackHalf("");
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <>
      <NavBar title={"Shortly"} />
      <div className={style.infoContainer}>
        <h2>Create short URL</h2>
        <p>
          Turn long, complex links into short and simple ones that are easier to
          share, track, and manage. Perfect for social media, marketing, or just
          keeping things tidy.
        </p>
      </div>

      <div className={style.urlCreateForm}>
        <div className={style.messageConatiner}>
          {errorMsg ? <ErrorAlert message={errorMsg} /> : <></>}

          {msg ? <SuccessMsg message={msg} /> : <></>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={style.inputField}>
            <p>Title</p>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={style.inputField}>
            <p>Enter your destination URL</p>
            <input
              type="text"
              value={destinationUrl}
              required
              placeholder="https://example.com/my/very/long/link"
              onChange={(e) => setDestinationUrl(e.target.value)}
            />
          </div>
          <div className={style.inputField}>
            <p>Custom back-half (optional)</p>
            <input
              type="text"
              value={backHalf}
              placeholder="e.g. my-cool-link"
              onChange={(e) => setBackHalf(e.target.value)}
            />
          </div>

          <button className={style.generateBtn} type="submit">
            Generate Your short url
          </button>
        </form>
      </div>
    </>
  );
};

export default HomePage;
