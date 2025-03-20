import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsRunning(true);
  };

  const handleTap = () => {
    if (isRunning) {
      setScore((score) => score + 1);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  return (
    <>
      <div className="game-board">
        <div className="score">Score: {score}</div>
        <div className="timer">Time Left: {timeLeft}</div>
        <button className="target" onClick={handleTap}>
          Tap Me!
        </button>
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </>
  );
}

export default App;
