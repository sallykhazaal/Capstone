"use client";
import { useState, useEffect, useRef } from "react";
import Tesseract from "tesseract.js";

function App() {
  const [selectedImage, setImage] = useState(null);
  const [text, setText] = useState("Your label text will appear here");
  const [change, setChange] = useState(false);
  const [progress, setProgress] = useState<any>("Analyze Label");
  const [inputValue, setInputValue] = useState<any>("Analyze Label");
  const [showProgress, setShowProgress] = useState(false);

  const textareaRef = useRef(null);

  const handleChange = (e: any) => {
    setImage(e.target.files[0]);
    setChange(!change);
    console.log("change catch");
  };
  const handleSubmit = () => {
    console.log("handle submit");

    if (selectedImage)
      Tesseract.recognize(selectedImage, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            if (inputValue === "Analyze Label") {
              if (Math.floor(m.progress * 100) === 100) {
                setInputValue("Analyze Label");
                setShowProgress(false);
              } else {
                setInputValue(Math.floor(m.progress * 100));
                console.log(inputValue);
                setShowProgress(!showProgress);
                setProgress(Math.floor(m.progress * 100));
              }
            }
          }
        },
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result: any) => {
          setText(result.data.text);
        });
  };
  return (
    <div>
      <h1>Label Reader</h1>
      <div className="input-wrapper">
        <label htmlFor="upload">upload</label>
        <input type="file" name="" id="upload" onChange={handleChange} />
        <input
          type="button"
          onClick={handleSubmit}
          className={
            showProgress
              ? "border border-gray-500 show btn"
              : "border border-gray-500 btn"
          }
          value={inputValue}
        />
        {showProgress && (
          <>
            {"\t"}
            <progress value={progress} max="100">
              {progress}
            </progress>
          </>
        )}
      </div>
      <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="img" />
          </div>
        )}
        {text && (
          <textarea
            className="box-text"
            rows={30}
            value={text}
            ref={textareaRef}
          />
        )}
      </div>
    </div>
  );
}
export default App;
