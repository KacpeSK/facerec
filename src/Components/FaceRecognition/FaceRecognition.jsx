import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, imageUrl }) => {
  console.log(box);
  return (
    <div className="flex justify-center ma">
      <div className="absolute mt2">
        {imageUrl ? <img id="inputImage" alt="input image" src={imageUrl} width="500px" height="auto" /> : <div></div>}
        {box.map((e) => {
          return (
            <div
              className="bounding-box"
              style={{ top: e.topRow, right: e.rightCol, bottom: e.bottomRow, left: e.leftCol }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
