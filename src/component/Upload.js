import React from "react";
import Compress from "compress.js";

const Upload = ({
  compData,
  setBaseURLimg,
  detectObj,
  setCompData,
  baseURLimg,
  loading
}) => {
  const compress = new Compress();

  const uploadImage = (evt) => {
    const files = [...evt.target.files];
    if (Object.keys(files).length !== 0) {
      compress
        .compress(files, {
          size: 4,
          quality: 1,
          maxWidth: 720,
          resize: true,
        })
        .then((data) => {
          detectObj(data[0].data);
          setBaseURLimg(data[0].prefix + data[0].data);
          setCompData(data[0]);

          //console.log(data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="upload_page">
      <div className="header_page">
        <h1>Object Detection</h1>
      </div>
      {loading === true ? (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      ) : (
        <div/>
      )}
        <div className="canvas_field">
          <canvas
            className="myCanvas"
            id="canvas"
            width={compData == null ? "720" : compData.endWidthInPx}
            height={compData == null ? "405" : compData.endHeightInPx}
          ></canvas>
          <img
            className="image_img"
            src={baseURLimg}
            id="image"
            alt="your_img"
          ></img>
        </div>
      <div className="input_field">
        <div className="button-wrapper">
          <span className="label">Upload File</span>
          <input
            id="upload"
            name="upload"
            type="file"
            className="upload-box"
            placeholder="Upload File"
            accept="image/*"
            onChange={(file) => uploadImage(file)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Upload;
