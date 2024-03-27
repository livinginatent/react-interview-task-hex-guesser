import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");
  const shuffle = (array: string[]) => {
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

  const generateColors = () => {
    const randomColor = () => {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };
    const actualAnswer = randomColor();
    setColor(actualAnswer);
    setAnswers(shuffle([actualAnswer, randomColor(), randomColor()]));
    setIsCorrect(false);
    setShowResult(false);
  };
  useEffect(() => {
    generateColors();
  }, []);

  const handleClick = (answer: string) => {
    setShowResult(true);
    if (answer === color) {
      setIsCorrect(true);
      setTimeout(() => {
        generateColors();
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="App">
      <div className="color-box" style={{ backgroundColor: color }}></div>
      <div className="buttons"></div>
      <div>
        {answers.map((answer, index) => (
          <button
            className="button"
            key={index}
            onClick={() => handleClick(answer)}
          >
            {answer}
          </button>
        ))}
        {showResult && (
          <div className="result">
            {isCorrect === true && <p>Correct</p>}
            {isCorrect === false && <p>Wrong</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
