import React from 'react'
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const Camera_TakePhoto = ({onHandleTakePhoto, onCameraOn, onCameraOff, OpenCamera}) => {

    return (
        <div className="camera">
        {OpenCamera === false ? (
          <button onClick={onCameraOn}>OPEN CAMERA</button>
        ) : (
          <div className="camera_steam">
            <Camera
              onTakePhoto={(dataUri) => {
                onHandleTakePhoto(dataUri);
              }}
              idealResolution={{ width: 720, height: 480 }}
            />
            <button onClick={onCameraOff}>CLOSE CAMERA</button>
          </div>
        )}
      </div>
    )
}

export default Camera_TakePhoto
