import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Updated to 30 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 }); // Added target position state

  const startGame = () => {
    setScore(0);
    setTimeLeft(30); // Updated to 30 seconds
    setIsRunning(true);
  };

  const handleTap = () => {
    if (isRunning) {
      setScore((score) => score + 1);
      moveTarget(); // Move target after each tap
    }
  };

  const moveTarget = () => {
    // Logic to move the target to a new random position
    const newPosition = getRandomPosition();
    // Update the target's position
    // This is a placeholder; actual implementation will depend on your UI framework
    // For example, you might update a state variable that controls the target's position
    setTargetPosition(newPosition); // Update the target's position
  };

  const getRandomPosition = () => {
    // Logic to generate a random position within the game board
    // This is a placeholder; actual implementation will depend on your game board dimensions
    const x = Math.floor(Math.random() * 300); // Example: 300px width
    const y = Math.floor(Math.random() * 300); // Example: 300px height
    return { x, y };
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
        <button
          className="target"
          onClick={handleTap}
          style={{ transform: `translate(${targetPosition.x}px, ${targetPosition.y}px)` }}
        >
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
