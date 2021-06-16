import React from 'react'
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const Camera_TakePhoto = ({handleTakePhoto, cameraOn, cameraOff, OpenCamera}) => {

    return (
        <div className="camera">
        {OpenCamera === false ? (
          <button onClick={cameraOn}>OPEN CAMERA</button>
        ) : (
          <div className="camera_steam">
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              idealResolution={{ width: 720, height: 480 }}
            />
            <button onClick={cameraOff}>CLOSE CAMERA</button>
          </div>
        )}
      </div>
    )
}

export default Camera_TakePhoto
