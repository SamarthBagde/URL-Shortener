import { useEffect, useState } from "react";
import axios from "axios";
import LinkCard from "../components/LinkCard";
import NavBar from "../components/NavBar";
import SuccessMsg from "../components/SuccessMsg";
import style from "../styles/LinksPage.module.css";

const LinksPage = () => {
  const [urls, setUrls] = useState([]);
  const [msg, setMsg] = useState("");

  const setMessage = (message) => {
    setMsg(message);
    setTimeout(() => {
      setMsg("");
    }, 10 * 1000); // remove msg after 10sec
  };

  const removeUrlFromList = (id) => {
    setUrls((prev) => prev.filter((url) => url._id !== id));
  };

  useEffect(() => {
    const getUrls = async () => {
      try {
        const res = await axios.get("/url/user-urls", {
          withCredentials: true,
        });

        if (res.status === 200) {
          // console.log(res.data.data.urls);
          console.log(res);
          setUrls(res.data.data.urls);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUrls();
  }, []);

  return (
    <>
      <NavBar title={"Short Links"} />
      <div className={style.msgConatiner}>
        {msg ? <SuccessMsg message={msg} /> : <></>}
      </div>
      <div className={style.optionsContainer}>
        <input type="text" placeholder="Search links" />
        <button>Search</button>
      </div>
      <div className={style.linksConatiner}>
        {urls && urls.length > 0 ? (
          urls.map((url) => (
            <LinkCard
              key={url._id}
              urldata={url}
              setMessage={setMessage}
              removeUrlFromList={removeUrlFromList}
            />
          ))
        ) : (
          <div className={style.noDataMsg}>
            You haven’t created any short URLs yet.
          </div>
        )}
      </div>
    </>
  );
};

export default LinksPage;
