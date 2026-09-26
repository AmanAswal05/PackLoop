"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, RoundedBox } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function PackagingBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox
        ref={meshRef}
        args={[2, 2.5, 1.5]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#e0d1b8" // Kraft paper color
          roughness={0.7}
          metalness={0.1}
          clearcoat={0.1}
          transmission={0.2}
          thickness={0.5}
        />
      </RoundedBox>
    </Float>
  );
}

export default function HeroPackaging() {
  return (
    <div className="h-[400px] w-full lg:h-[600px] absolute right-0 top-1/2 -translate-y-1/2 -z-10 opacity-70 lg:opacity-100 mix-blend-multiply dark:mix-blend-lighten pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <spotLight position={[-10, 10, -10]} intensity={1} color="#117140" />
          <PresentationControls
            global
            
            
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <PackagingBox />
          </PresentationControls>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
