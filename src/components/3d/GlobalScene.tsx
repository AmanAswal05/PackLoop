"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-3, 1, -5]} scale={1.5}>
          <MeshDistortMaterial
            color="#117140"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[4, -2, -8]} scale={2}>
          <MeshDistortMaterial
            color="#22c55e"
            attach="material"
            distort={0.6}
            speed={1.5}
            roughness={0.1}
            metalness={0.5}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} position={[0, -5, -10]} scale={3}>
          <MeshDistortMaterial
            color="#f59e0b"
            attach="material"
            distort={0.3}
            speed={1}
            roughness={0.4}
            metalness={0.2}
            transparent
            opacity={0.05}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function GlobalScene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedShapes />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
