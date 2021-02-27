import "./styles.css";
import { useState, useCallback, useEffect } from "react";
import clx from "classnames";

const CELLS_COUNT = 12;

function generateArray(count) {
  return new Array(count).fill(0).map((v) => v);
}

function generateRandomNumber(elementsLength) {
  return Math.round(Math.random() * (elementsLength - 1));
}

const cells = generateArray(CELLS_COUNT);

export default function App() {
  const [gameFinished, setGameFinished] = useState(false);
  const [chosen, setChosen] = useState([]);
  const [winner, setWinner] = useState(generateRandomNumber(CELLS_COUNT));

  useEffect(() => {
    if (chosen.includes(winner)) {
      setGameFinished(true);
    }
  }, [chosen, winner]);

  const handleRestart = useCallback(() => {
    setChosen([]);
    setWinner(generateRandomNumber(CELLS_COUNT));
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
      <button className="restart" onClick={handleRestart}>
        Начать заново!
      </button>
      <div className="field" onClick={handleClick}>
        {cells.map((_, i) => (
          <button key={i} data-idx={i}>
            <span className={clx("icon", { chosen: chosen.includes(i) })}>
              {i === winner ? "🏆️" : "😜"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}