import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="flex justify-center ma">
      <div className="absolute mt2">
        {imageUrl ? (
          <img
            id="inputImage"
            alt="input image"
            src={imageUrl}
            width="500px"
            height="auto"
          />
        ) : (
          <div></div>
        )}
        {box.map((e, i) => {
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: e.topRow,
                right: e.rightCol,
                bottom: e.bottomRow,
                left: e.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
