import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("");
  const [randomColor1, setRandomColor1] = useState("");
  const [randomColor2, setRandomColor2] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [shuffledColors, setShuffledColors] = useState([]);

  useEffect(() => {
    randomColor();
  }, []);

  useEffect(() => {
    // This useEffect watches for changes to color, randomColor1, and randomColor2,
    // ensuring shuffledColors is updated only when these colors change.
    setShuffledColors(shuffle([color, randomColor1, randomColor2]));
  }, [color, randomColor1, randomColor2]);

  const onClick = (e) => {
    setSelectedColor(e.target.value);
    setShowResult(true); // setShowResult now explicitly set to true here.
  };

  useEffect(() => {
    if (selectedColor === color) {
      setTimeout(() => {
        randomColor();
      }, 1000);
    }
  }, [selectedColor,color]);

  const shuffle = (array:[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const randomColor = () => {
    // Generate and set new colors.
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    setRandomColor1(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    setRandomColor2(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    setShowResult(false); // Reset the showResult state.
  };

  return (
    <div className="App">
      <div className="color-box" style={{ backgroundColor: color }}>
        {color}
      </div>
      <div className="buttons">
        {shuffledColors.map((color, index) => (
          <button key={index} value={color} onClick={onClick}>
            {color}
          </button>
        ))}
      </div>
      <div>
        {showResult && <p>{selectedColor === color ? "Correct" : "Wrong"}</p>}
      </div>
    </div>
  );
}

export default App;
