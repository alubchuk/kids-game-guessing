import "./styles.css";
import { useState, useCallback } from "react";

const BUTTONS_COUNT = 12;
function generateArray(count) {
  return new Array(count).fill(0).map((v) => v);
}
function generateRandomNumber(elementsLength) {
  return Math.round(Math.random() * (elementsLength - 1));
}

function defineWinner(arr, winner) {
  return arr.map((num, idx) => (idx === winner ? 1 : 0));
}

export default function App() {
  const [arr, setArr] = useState(generateArray(BUTTONS_COUNT));
  const winner = generateRandomNumber(BUTTONS_COUNT);
  const arrWithWinner = defineWinner(arr, winner);
  const handleClick = useCallback(function (e) {
    console.log(e.target);
    if (e.target.nodeName === "BUTTON") {
      const val = Number(e.target.dataset.value);
      if (val === 1) {
        e.target.innerHTML = '<div style="transform: scale(2);">🏆️</div>';
        setArr(generateArray(BUTTONS_COUNT));
      } else {
        e.target.innerHTML = '<div style="transform: scale(2);">😜</div>';
      }
    }
  }, []);

  console.log({ arr, winner, arrWithWinner });
  return (
    <div className="container" onClick={handleClick}>
      {arrWithWinner.map((v, i) => (
        <button key={i} data-value={v}>
          {""}
        </button>
      ))}
    </div>
  );
}
