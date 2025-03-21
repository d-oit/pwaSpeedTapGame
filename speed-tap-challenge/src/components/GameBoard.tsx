import React, { useState, useEffect } from 'react';

const GameBoard: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsRunning(true);
  };

  const handleTap = () => {
    if (isRunning) {
      setScore((score) => score + 1);
      moveTarget();
    }
  };

  const moveTarget = () => {
    const newPosition = getRandomPosition();
    setTargetPosition(newPosition);
  };

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 300);
    const y = Math.floor(Math.random() * 300);
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
    <div className="game-board">
      <div className="score" data-testid="score">Score: {score}</div>
      <div className="timer" data-testid="timer">Time Left: {timeLeft}</div>
      <button
        className="target"
        data-testid="target"
        onClick={handleTap}
        style={{ transform: `translate(${targetPosition.x}px, ${targetPosition.y}px)` }}
      >
        Tap Me!
      </button>
      <button className="start-button" data-testid="start-button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default GameBoard;