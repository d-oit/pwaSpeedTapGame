import React, { useEffect, useState } from 'react';
import './PerformanceMonitor.css';

const PerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();

    const updateFps = () => {
      frameCount++;
      const now = performance.now();
      const elapsed = now - startTime;

      if (elapsed >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        startTime = now;
      }

      requestAnimationFrame(updateFps);
    };

    requestAnimationFrame(updateFps);
  }, []);

  return (
    <div className="performance-monitor">
      FPS: {fps}
    </div>
  );
};

export default PerformanceMonitor;