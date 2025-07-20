import { useState } from "react";
import axios from "axios";
import ErrorAlert from "./ErrorAlert";
import style from "../styles/EditLink.module.css";

const EditLink = ({ setEdit, urlData, updateData }) => {
  const [newTitle, setNewTitle] = useState(urlData.title);
  const [newDestinationUrl, setNewDestinationUrl] = useState(
    urlData.destinationUrl
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {};
      if (newTitle.trim()) {
        data.newTitle = newTitle;
      }

      if (newDestinationUrl.trim()) {
        data.newDestinationUrl = newDestinationUrl;
      }

      const res = await axios.patch(`/url/update/${urlData._id}`, data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log(res);
        updateData(res.data.data.url.title, res.data.data.url.destinationUrl);
        setEdit();
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  };
  return (
    <>
      <div className={style.mainConatiner}>
        <div className={style.msgConatiner}>
          {errorMsg ? <ErrorAlert message={errorMsg} /> : <></>}
        </div>
        <div className={style.formContainer}>
          <div className={style.closeBtn} onClick={setEdit}>
            X
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.inputField}>
              <p>Title</p>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className={style.inputField}>
              <p>Destination URL</p>
              <input
                type="text"
                value={newDestinationUrl}
                onChange={(e) => setNewDestinationUrl(e.target.value)}
              />
            </div>

            <div className={style.btnContainer}>
              <button type="submit">Done</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditLink;
