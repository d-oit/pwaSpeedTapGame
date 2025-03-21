import React, { useEffect, useRef } from 'react';

const ParticleSystem: React.FC<{ position: { x: number; y: number }; score: number }> = ({ position, score }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; color: string }[] = [];
    const particleCount = 50 + score * 5;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: position.x,
        y: position.y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        alpha: 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.01;

        ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        ctx.fillRect(particle.x, particle.y, 2, 2);
      });

      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [position, score]);

  return <canvas ref={canvasRef} width={300} height={300} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default ParticleSystem;