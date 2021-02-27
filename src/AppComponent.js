import "./styles.css";
import { useState, useCallback, useEffect } from "react";
import clx from "classnames";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const CELLS_COUNT = 12;

function generateArray(count) {
  return new Array(count).fill(0).map((v) => v);
}

function generateRandomNumber(elementsLength) {
  return Math.round(Math.random() * (elementsLength - 1));
}

function generateRandomImage(count) {
  return `https://picsum.photos/id/${generateRandomNumber(1025)}/146`;
}

function generateRandomColors(count) {
  return new Array(count).fill(0).map((v) => generateRandomRGBA());
}

function generateRandomImages(count) {
  return new Array(count).fill(0).map((v) => generateRandomImage());
}

function generateRandomRGBA() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

const cells = generateArray(CELLS_COUNT);

export default function App() {
  const [images, setImages] = useState(generateRandomImages(CELLS_COUNT));
  const [gameFinished, setGameFinished] = useState(false);
  const [chosen, setChosen] = useState([]);
  const [winner, setWinner] = useState(generateRandomNumber(CELLS_COUNT));
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (chosen.includes(winner)) {
      setGameFinished(true);
    }
  }, [chosen, winner]);

  const handleRestart = useCallback(() => {
    setChosen([]);
    setWinner(generateRandomNumber(CELLS_COUNT));
    setImages(generateRandomImages(CELLS_COUNT));
    setGameFinished(false);
  }, []);

  const handleClick = useCallback(
    function (e) {
      if (chosen.includes(winner)) {
        return;
      }
      if (e.target.nodeName === "BUTTON") {
        const idx = Number(e.target.dataset.idx);
        setChosen((chosen) => [...chosen, idx]);
      }
    },
    [chosen, winner]
  );

  return (
    <div className={clx("container", { finished: gameFinished })}>
      {gameFinished ? <Confetti width={width} height={height} /> : null}
      <button className="restart" onClick={handleRestart}>
        Начать заново!
      </button>
      <div className="field" onClick={handleClick}>
        {cells.map((_, i) => {
          const isChosen = chosen.includes(i);
          return (
            <button
              key={i}
              data-idx={i}
              style={{
                backgroundImage: isChosen ? "none" : `url(${images[i]})`
              }}
            >
              <span className={clx("icon", { chosen: isChosen })}>
                {i === winner ? "🏆️" : "😜"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
