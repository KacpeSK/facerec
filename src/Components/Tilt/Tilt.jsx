import { useEffect } from "react";
import React from "react";
import "./tilt.css";

const Tilt = ({ source }) => {
  const useMountEffect = (fun) => useEffect(fun, []);

  const drawImage = () => {
    useMountEffect(tiltImage);
    return (
      <img
        className="tilt"
        src={source}
        alt=""
      />
    );
  };

  const tiltImage = () => {
    const image = document.querySelector(".tilt");
    if (image) {
      image.addEventListener("mousemove", (event) => {
        const { top, bottom, left, right } =
          event.target.getBoundingClientRect();

        const middleX = (right - left) / 1.5;
        const middleY = (bottom - top) / 1.5;

        const clientX = event.clientX;
        const clientY = event.clientY;

        const offsetX = (clientX - middleX) / middleX;
        const offsetY = (middleY - clientY) / middleY;

        event.target.style.transform = `perspective(1000px) rotateY(${
          offsetX * 20
        }deg) rotateX(${offsetY * 20}deg) scale3d(1, 1, 1)`;
      });

      image.addEventListener("mouseleave", () => {
        image.style.transform = "";
      });
    } else {
      console.log("image is not found");
    }
  };

  return drawImage();
};

export default Tilt;
