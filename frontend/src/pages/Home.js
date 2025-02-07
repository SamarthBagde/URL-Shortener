import React from "react";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className={`main`}>
      <div className={`container`}>
        <div className={`input-filed`}>
          <div className={`title-1`}>Destination URL</div>
          <input
            className={`input-1`}
            type="text"
            name="urlInput"
            id="urlInput"
            placeholder="https://example.com/short-url"
          />
          <div className={`title-1`}>Custom back-half (optional)</div>
          <input
            className={`input-2`}
            type="text"
            name="urlInput"
            id="urlInput"
            placeholder="Ex. XYZ"
          />
          <div className={`submit-btn-container`}>
            <button className={`submit-btn`} type="submit">
              Create link
            </button>
          </div>
        </div>
        <div className={`output-filed`}>
          <div className={`heading white-text`}>Heading</div>
          <div className={`text white-text`}>text</div>
        </div>
      </div>
    </div>
  );
}
