"use client";
import { useState, useRef, useEffect } from "react";
import Tesseract from "tesseract.js";
import chemicalTriggersData from "../../public/data/ChemicalTriggers.json";
import foodTriggersData from "../../public/data/FoodTriggers.json";

function Page() {
  const [selectedImage, setImage] = useState(null);
  const [text, setText] = useState("Your label text will appear here");
  const [change, setChange] = useState(false);
  const [progress, setProgress] = useState<any>("Analyze Label");
  const [inputValue, setInputValue] = useState<any>("Analyze Label");
  const [showProgress, setShowProgress] = useState(false);
  const [triggers, setTriggers] = useState<any>([]);

  const textareaRef = useRef(null);

  const handleChange = (e: any) => {
    setImage(e.target.files[0]);
    setChange(!change);
    console.log("change catch");
  };

  const handleSubmit = async () => {
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
    3;
  };

  useEffect(() => {
    console.log(text);
    const chemicalTriggers = chemicalTriggersData.filter((chemical: any) => {
      const foodItems = chemical.foods.toUpperCase().split(", ");
      return (
        text.includes(chemical.name.toUpperCase()) ||
        foodItems.some((food: any) => text.includes(food))
      );
    });
    // const foodTriggers = foodTriggersData.foods.filter((food) => {
    //   return text.includes(food.name.toUpperCase());
    // });
    // console.log(foodTriggers);
    setTriggers([...chemicalTriggers]);

    // , ...foodTriggers
  }, [text]);
  console.log(triggers);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 min-h-screen">
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-8">Ingredient Label Reader</h1>
          <div className="flex justify-center items-center mb-8">
            <label
              htmlFor="upload"
              className="mr-4 bg-gray-200 py-2 px-4 rounded"
            >
              Upload
            </label>
            <input
              type="file"
              name=""
              id="upload"
              onChange={handleChange}
              className="hidden"
            />
            <input
              type="button"
              onClick={handleSubmit}
              className={
                showProgress
                  ? "bg-gray-200 border border-gray-500 px-4 py-2 rounded show ml-4"
                  : "bg-gray-200 border border-gray-500 px-4 py-2 rounded ml-4"
              }
              value={inputValue}
            />
            {showProgress && (
              <progress
                value={progress}
                max="100"
                className="ml-4 rounded-lg h-8 w-48"
              >
                {progress}
              </progress>
            )}
          </div>
          <div className="result">
            {selectedImage && (
              <div className="box-image mb-8">
                <img src={URL.createObjectURL(selectedImage)} alt="img" />
              </div>
            )}
            {triggers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Migraine Triggers:</h2>
                <ul>
                  {triggers.map((trigger: { name: string; id: number }) => (
                    <li
                      key={trigger.id}
                      className="bg-gray-200 px-4 py-2 rounded-lg mb-2"
                    >
                      {trigger.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
