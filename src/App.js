import "./App.css";
import React from "react";
import nvision from "@nipacloud/nvision/dist/browser/nvision";
import Navar from "./component/Navar";
import Upload from "./component/Upload";
import Analyzed from "./component/Analyzed";
import CameraTakePhoto from "./component/Camera_TakePhoto"

function App() {

  const [baseURLimg, setBaseURLimg] = React.useState("");
  const [compData, setCompData] = React.useState();
  const [boundingBox, setBoundingBox] = React.useState({});
  const [OpenCamera, setOpenCamera] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const objectDetectionService = nvision.objectDetection({
    apiKey:
      "cdb29f355cb4059995e05420dc8d963f657898bf3a5f2f5e7a88c58279f5e4a0a1c4c4cf874594b42e413fc45c425425ac",
  });

  const detectObj = (baseURL_detect) => {
    setLoading(true);

    objectDetectionService
      .predict({
        rawData: baseURL_detect,
      })
      .then((result) => {
        setLoading(false);
        setBoundingBox(result.detected_objects);
        //console.log(result.detected_objects);
      });
  };

  React.useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);

    Object.keys(boundingBox).forEach((box) => {
      var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

      ctx.beginPath();
      ctx.font = "22px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(
        boundingBox[box].name,
        boundingBox[box].bounding_box.left + 10,
        boundingBox[box].bounding_box.top + 20
      );
      ctx.strokeStyle = randomColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(
        boundingBox[box].bounding_box.left,
        boundingBox[box].bounding_box.top,
        boundingBox[box].bounding_box.right -
          boundingBox[box].bounding_box.left,
        boundingBox[box].bounding_box.bottom - boundingBox[box].bounding_box.top
      );
      ctx.stroke();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(boundingBox).length]);

  const handleTakePhoto = (dataUri) => {

    let baseURLarr = dataUri.split(",");
    let baseURL = baseURLarr[1];

    setBaseURLimg(dataUri);
    detectObj(baseURL);
  };

  const cameraOn = () => {
    setOpenCamera(true);
  };

  const cameraOff = () => {
    setOpenCamera(false);
  };

  return (
    <div className="App">
      <Navar />
      <Upload
        compData={compData}
        setBaseURLimg={setBaseURLimg}
        detectObj={detectObj}
        setCompData={setCompData}
        baseURLimg={baseURLimg}
        loading={loading}
      />
      <Analyzed boundingBox={boundingBox}/>
      <hr></hr>
      <CameraTakePhoto handleTakePhoto={handleTakePhoto} cameraOn={cameraOn} 
      cameraOff={cameraOff} OpenCamera={OpenCamera}/>
    </div>
  );
}

export default App;
