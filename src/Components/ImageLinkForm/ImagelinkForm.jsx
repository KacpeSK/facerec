import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="tc">
      <p className="f3">{"This Magic Brain detect faces in your pictures. Git it a try."}</p>
      <div className="container w-80-m w-50-l pa4 br3 shadow-5">
        <input className="f4 pa2 w-70 centered" type="text" onChange={onInputChange} />
        <button onClick={onButtonSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
