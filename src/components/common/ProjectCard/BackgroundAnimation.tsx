import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const particleCount = 1000;
const particleSpeed = 0.2;

const Particles = () => {
  const points = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time * 0.3 + i) * 0.001;
      positions[i3] += Math.cos(time * 0.2 + i) * 0.001;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#4f46e5" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

const BackgroundAnimation = () => {
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
    }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
