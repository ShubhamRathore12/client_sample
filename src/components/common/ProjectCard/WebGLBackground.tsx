import React, { useEffect, useRef, useState } from 'react';

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{x: number, y: number, size: number, speedX: number, speedY: number}>>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvasSize.current = {
          width: canvas.parentElement.offsetWidth,
          height: canvas.parentElement.offsetHeight
        };
        canvas.width = canvasSize.current.width * window.devicePixelRatio;
        canvas.height = canvasSize.current.height * window.devicePixelRatio;
        canvas.style.width = `${canvasSize.current.width}px`;
        canvas.style.height = `${canvasSize.current.height}px`;
      }
    };

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.floor((canvasSize.current.width * canvasSize.current.height) / 10000);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvasSize.current.width,
          y: Math.random() * canvasSize.current.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        mouse.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    const animate = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      const particles = particlesRef.current;
      const mousePos = mouse.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvasSize.current.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvasSize.current.height) p.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(
          p.x * window.devicePixelRatio,
          p.y * window.devicePixelRatio,
          p.size * window.devicePixelRatio,
          0,
          Math.PI * 2
        );
        
        // Calculate distance to mouse
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Draw connection lines to nearby particles and mouse
        if (distance < 150) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 150})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(
            p.x * window.devicePixelRatio,
            p.y * window.devicePixelRatio
          );
          ctx.lineTo(
            mousePos.x * window.devicePixelRatio,
            mousePos.y * window.devicePixelRatio
          );
          ctx.stroke();
        }
        
        // Draw particle
        ctx.fillStyle = '#6366f1';
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Setup
    resizeCanvas();
    initParticles();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Only render on client-side to avoid SSR issues
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      opacity: 0.3,
      pointerEvents: 'none',
      overflow: 'hidden',
      borderRadius: 'inherit'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default WebGLBackground;
