import { useState } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImagelinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Sigin";
import ParticlesBg from "particles-bg";
import "./App.css";
import globalconfig from "./config";

const setupClarifai = (imageUrl) => {
  const PAT = globalconfig.keys.clarifai.pat;
  const USER_ID = globalconfig.keys.clarifai.user_id;
  const APP_ID = globalconfig.keys.clarifai.app_id;
  const MODEL_ID = "face-detection";
  const IMAGE_URL = imageUrl;
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

/*    APP COMPONENT    */

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const newBox = [];
    console.log(clarifaiFace);
    clarifaiFace.map((element) => {
      newBox.push({
        leftCol: element.region_info.bounding_box.left_col * width,
        topRow: element.region_info.bounding_box.top_row * height,
        rightCol: width - element.region_info.bounding_box.right_col * width,
        bottomRow: height - element.region_info.bounding_box.bottom_row * height,
      });
    });
    setBox(newBox);
  };

  const onInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const onButtonSubmit = () => {
    console.log("button clicked");
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", setupClarifai(imageUrl))
      .then((response) => response.json())
      .then((result) => {
        console.log(result.outputs[0].data.regions[0].region_info.bounding_box);
        calculateFaceLocation(result);
        /*const regions = result.outputs[0].data.regions;

        regions.forEach((region) => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach((concept) => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);

            console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
          });
        });
      */
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    setRoute(route);
  };

  return (
    <>
      <Navigation onRouteChange={onRouteChange} />
      <ParticlesBg num={100} type="cobweb" bg={true} />
      {route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      )}
    </>
  );
}

export default App;

