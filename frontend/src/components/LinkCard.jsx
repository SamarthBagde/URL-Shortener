import axios from "axios";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import style from "../styles/LinkCard.module.css";
import EditLink from "./EditLink";

const LinkCard = ({ urldata, setMessage, removeUrlFromList }) => {
  const [isEditLink, setIsEditLink] = useState(false);
  const shortUrl = `http://localhost:5173/${urldata.shortId}`;

  const setEdit = () => {
    setIsEditLink(!isEditLink);
  };

  const updateData = (newTitle, newDestinationUrl) => {
    urldata.title = newTitle;
    urldata.destinationUrl = newDestinationUrl;
  };

  const deleteLink = async () => {
    const conf = confirm("You want to delete this link?");

    if (conf) {
      try {
        const res = await axios.delete(`/url/delete/${urldata._id}`, {
          withCredentials: true,
        });

        if (res.status === 204) {
          console.log("Delete");

          setMessage("Short url deleted successfully");
          removeUrlFromList(urldata._id);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(shortUrl);
    setMessage("Link copied to clipboard");
  };

  return (
    <>
      {isEditLink ? (
        <EditLink setEdit={setEdit} urlData={urldata} updateData={updateData} />
      ) : (
        <></>
      )}
      <div className={style.mainConatiner}>
        <div className={style.secondaryConatiner}>
          <div className={style.leftSide}>
            <div className={style.title}>{urldata.title}</div>
          </div>
          <div className={style.rightSide}>
            <div onClick={copyToClipBoard}>
              <ContentCopyOutlinedIcon />
            </div>
            <div onClick={setEdit}>
              <EditOutlinedIcon />
            </div>
            <div onClick={deleteLink} className={style.try}>
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        </div>
        <div className={style.shortLink}>{shortUrl}</div>
        <div className={style.destinationUrl}>{urldata.destinationUrl}</div>
      </div>
    </>
  );
};

export default LinkCard;
