import "./App.css";
import React from "react";
import nvision from "@nipacloud/nvision/dist/browser/nvision";
import Compress from "compress.js";

function App() {
  //const [image, setImage] = React.useState();
  const [base64, setBase64] = React.useState();
  //const [file, setFile] = React.useState({});
  const [baseURLimg, setBaseURLimg] = React.useState("");
  const [compData, setCompData] = React.useState();
  const [boundingBox, setBoundingBox] = React.useState({});
  const [Count, setCount] = React.useState(0);
  const [Count2, setCount2] = React.useState(0);

  const objectDetectionService = nvision.objectDetection({
    apiKey:
      "cdb29f355cb4059995e05420dc8d963f657898bf3a5f2f5e7a88c58279f5e4a0a1c4c4cf874594b42e413fc45c425425ac",
  });

  const compress = new Compress();

  const resizeImageFn = (evt) => {
    const files = [...evt.target.files];
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
        console.log(data[0]);
      });
  };

  const detectObj = (baseURL_detect) => {
    
    objectDetectionService
      .predict({
        rawData: baseURL_detect,
      })
      .then((result) => {
        console.log(result.detected_objects);
        setBoundingBox(result.detected_objects);
        setCount(Count + 1);
      });
  };

  React.useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);

    Object.keys(boundingBox).map((box, index) => {

      var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    
      ctx.beginPath();
      ctx.font = "22px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(boundingBox[box].name + index, boundingBox[box].bounding_box.left + 10, boundingBox[box].bounding_box.top + 20);
      ctx.strokeStyle = randomColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(
        boundingBox[box].bounding_box.left,
        boundingBox[box].bounding_box.top,
        boundingBox[box].bounding_box.right - boundingBox[box].bounding_box.left,
        boundingBox[box].bounding_box.bottom - boundingBox[box].bounding_box.top
      );
      ctx.stroke();
    });
  },[Object.keys(boundingBox).length])

  // if (Object.keys(boundingBox).length !== 0) {

  //   const canvas = document.getElementById("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const img = document.getElementById("image");
  //   ctx.drawImage(img, 0, 0);

  //   Object.keys(boundingBox).map((box, index) => {

  //     var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  //     console.log(randomColor)

  //     ctx.beginPath();
  //     ctx.font = "22px Arial";
  //     ctx.fillStyle = "white";
  //     ctx.fillText(boundingBox[box].name + index, boundingBox[box].bounding_box.left + 10, boundingBox[box].bounding_box.top + 20);
  //     ctx.strokeStyle = randomColor;
  //     ctx.lineWidth = 3;
  //     ctx.strokeRect(
  //       boundingBox[box].bounding_box.left,
  //       boundingBox[box].bounding_box.top,
  //       boundingBox[box].bounding_box.right - boundingBox[box].bounding_box.left,
  //       boundingBox[box].bounding_box.bottom - boundingBox[box].bounding_box.top
  //     );
  //     ctx.stroke();
  //   });
  // }

  return (
    <div className="App">
      <br></br>
      <input
        id="file"
        name="file"
        type="file"
        accept="image/*"
        onChange={(file) => resizeImageFn(file)}
      ></input>
      <br></br>
      <div>
        <canvas
          className="myCanvas"
          id="canvas"
          width={compData == null ? "720" : compData.endWidthInPx}
          height={compData == null ? "480" : compData.endHeightInPx}
        ></canvas>
        <img className="image_img" src={baseURLimg} id="image"></img>
      </div>
      <div>
        <h1>Test</h1>
        <ul>
          {Object.keys(boundingBox).map((box, index) => {
            return <li key={index}>{boundingBox[box].bounding_box.left}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
//{compData.endWidthInPx} initialHeightInPx
export default App;
