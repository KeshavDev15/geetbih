'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.005;
    
    // Subtle float based on mouse
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 100]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color={new THREE.Color("oklch(85% 0.16 170)")}
          speed={3}
          distort={0.4}
          radius={1}
          emissive={new THREE.Color("oklch(85% 0.16 170)")}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="white" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="oklch(85% 0.16 170)" />
        <AnimatedCore />
      </Canvas>
    </div>
  );
}
