import "./App.css";
import React from "react";
import Section from "./component/section/section.jsx";
import Sarchbar from "./component/Searchbar/Searchbar.jsx";
import ImageGallery from "./component/ImageGalleryItem/ImageGallery.jsx";
import Modalwindow from "./component/Modal/Modal.jsx";
import { useState } from "react";

const App = () => {
  const [imageName, setimageName] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [option, setOption] = useState({});

  const handelFormSubmit = (imageName) => {
    setimageName(imageName);
  };

  const togglemodal = (src, alt) => {
    setshowModal(!showModal);
    setOption({ imageSrc: src, imageAlt: alt });
  };

  return (
    <>
      <Section>
        <Sarchbar onSubmit={handelFormSubmit} />
      </Section>
      <Section>
        <ImageGallery imageName={imageName} onClick={togglemodal} />
      </Section>
      {showModal && (
        <Modalwindow
          onClose={togglemodal}
          src={option.imageSrc}
          alt={option.imageAlt}
        />
      )}
    </>
  );
};
export default App;
