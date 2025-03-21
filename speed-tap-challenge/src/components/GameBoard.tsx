import React, { useState, useEffect } from 'react';
import ParticleSystem from './ParticleSystem';
import PerformanceMonitor from '../utils/PerformanceMonitor';

const GameBoard: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 });
  const [targetSize, setTargetSize] = useState(1);
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 });
  const [showParticles, setShowParticles] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsRunning(true);
  };

  const handleTap = () => {
    if (isRunning) {
      setScore((score) => score + 1);
      setParticlePosition(targetPosition);
      setShowParticles(true);
      setShakeIntensity(10);
      setRotationAngle((Math.random() - 0.5) * 30);
      moveTarget();
    }
  };

  const moveTarget = () => {
    const movementPatterns = [
      () => ({ x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 300), vx: 0, vy: 0, ax: 0, ay: 0 }),
      () => ({ x: Math.floor(Math.random() * 300), y: 0, vx: 0, vy: 0, ax: 0, ay: 0 }),
      () => ({ x: 0, y: Math.floor(Math.random() * 300), vx: 0, vy: 0, ax: 0, ay: 0 }),
      () => ({ x: 300, y: Math.floor(Math.random() * 300), vx: 0, vy: 0, ax: 0, ay: 0 }),
      () => ({ x: Math.floor(Math.random() * 300), y: 300, vx: 0, vy: 0, ax: 0, ay: 0 }),
      () => ({ x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 300), vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10, ax: 0, ay: 0 }),
      () => ({ x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 300), vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10, ax: (Math.random() - 0.5) * 0.1, ay: (Math.random() - 0.5) * 0.1 }),
    ];
    const sizeVariations = [1, 1.2, 1.5, 2];

    const pattern = movementPatterns[Math.floor(Math.random() * movementPatterns.length)];
    const size = sizeVariations[Math.floor(Math.random() * sizeVariations.length)];

    const newPosition = pattern();
    setTargetPosition(newPosition);
    setTargetSize(size);

    const updatePosition = () => {
      setTargetPosition((prev) => ({
        x: prev.x + prev.vx,
        y: prev.y + prev.vy,
        vx: prev.vx + prev.ax,
        vy: prev.vy + prev.ay,
        ax: prev.ax,
        ay: prev.ay,
      }));
    };

    const interval = setInterval(updatePosition, 16);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (shakeIntensity > 0) {
      const shakeInterval = setInterval(() => {
        setShakeIntensity((prev) => Math.max(0, prev - 1));
      }, 50);
      return () => clearInterval(shakeInterval);
    }
  }, [shakeIntensity]);

  useEffect(() => {
    if (rotationAngle !== 0) {
      const rotationInterval = setInterval(() => {
        setRotationAngle((prev) => prev * 0.9);
      }, 50);
      return () => clearInterval(rotationInterval);
    }
  }, [rotationAngle]);

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
    <div className="game-board" style={{ transform: `rotate(${rotationAngle}deg) translate(${shakeIntensity}px, ${shakeIntensity}px)` }}>
      <div className="score" data-testid="score">Score: {score}</div>
      <div className="timer" data-testid="timer">Time Left: {timeLeft}</div>
      <button
        className="target"
        data-testid="target"
        onClick={handleTap}
        style={{ transform: `translate(${targetPosition.x}px, ${targetPosition.y}px)`, fontSize: `${targetSize}em` }}
      >
        Tap Me!
      </button>
      <button className="start-button" data-testid="start-button" onClick={startGame}>
        Start Game
      </button>
      {showParticles && <ParticleSystem position={particlePosition} score={score} />}
      <PerformanceMonitor />
    </div>
  );
};

export default GameBoard;