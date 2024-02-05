import { useState } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImagelinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
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
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  console.log(user);

  const onUserChange = (user) => {
    const { id, name, email, entries, joined } = user;
    setUser({
      id,
      name,
      email,
      entries,
      joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const newBox = [];
    clarifaiFace.map((element) => {
      newBox.push({
        leftCol: element.region_info.bounding_box.left_col * width,
        topRow: element.region_info.bounding_box.top_row * height,
        rightCol: width - element.region_info.bounding_box.right_col * width,
        bottomRow:
          height - element.region_info.bounding_box.bottom_row * height,
      });
    });
    setBox(newBox);
  };

  const onInputChange = (e) => {
    setImageUrl(e.target.value);
    setBox([]);
  };

  const onButtonSubmit = () => {
    fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      setupClarifai(imageUrl)
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:4001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data > 0) {
                setUser({ ...user, entries: data });
              }
            });
        }
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
    switch (route) {
      case "signin":
        setIsSignIn(false);
        break;
      case "register":
        setIsSignIn(false);
        break;
      case "home":
        setIsSignIn(true);
        break;

      default:
        setIsSignIn(false);
        break;
    }
    setRoute(route);
  };

  const renderComponents = (currentRoute) => {
    switch (currentRoute) {
      case "signin":
        return (
          <Signin
            onRouteChange={onRouteChange}
            loadUser={onUserChange}
          />
        );
      case "register":
        return (
          <Register
            onRouteChange={onRouteChange}
            loadUser={onUserChange}
          />
        );
      case "home":
        return (
          <>
            <Logo />
            <Rank
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
            />
          </>
        );

      default:
        return (
          <Signin
            onRouteChange={onRouteChange}
            loadUser={onUserChange}
          />
        );
    }
  };

  return (
    <>
      <Navigation
        onRouteChange={onRouteChange}
        isSignIn={isSignIn}
      />
      <ParticlesBg
        num={100}
        type="cobweb"
        bg={true}
      />
      {renderComponents(route)}
    </>
  );
}

export default App;

