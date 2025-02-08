import React, { useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [backHalf, setBackHalf] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
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
            id="urlInput"
            placeholder="https://example.com/short-url"
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
            id="urlInput"
            placeholder="Ex. XYZ"
            onChange={(e) => {
              setBackHalf(e.target.value);
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
          <div className={`heading white-text`}>Heading</div>
          <div className={`text white-text`}>text</div>
        </div>
      </div>
    </div>
  );
}
