import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Voxel building templates
import { VoxelTemple, VoxelTower, VoxelWorkshop, VoxelLab, VoxelPortal, VoxelHall, VoxelGarden } from './VoxelAssets';

export default function MathBiome() {
  const crystalMeshRef = useRef();
  const equationRef = useRef();

  // Rotate crystals and equations gently
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (crystalMeshRef.current) {
      crystalMeshRef.current.rotation.y = elapsed * 0.15;
    }
    if (equationRef.current) {
      equationRef.current.rotation.y = elapsed * -0.1;
      equationRef.current.position.y = Math.sin(elapsed * 0.5) * 0.5 + 4;
    }
  });

  // Create procedural voxel hills
  const gridSize = 24;
  const blockSize = 1.5;
  const blocks = [];

  for (let x = -gridSize; x <= gridSize; x += 2) {
    for (let z = -gridSize; z <= gridSize; z += 2) {
      // Math formula for terrain height (undulating curves)
      const dist = Math.sqrt(x * x + z * z);
      let y = Math.sin(x * 0.25) * Math.cos(z * 0.25) * 1.5;
      
      // Flatten the center area for the temple
      if (dist < 8) y = -0.5;

      // Color gradation based on coordinates
      const color = new THREE.Color();
      color.setHSL(0.55 + (y * 0.05), 0.8, 0.15 + (Math.sin(dist * 0.1) * 0.05));

      blocks.push({
        position: [x * blockSize, y, z * blockSize],
        color: color
      });
    }
  }

  // Floating equations coordinates
  const mathSymbols = [
    { text: "E = mc²", pos: [-6, 6, 8] },
    { text: "f(x) = ax² + bx + c", pos: [0, 8, -6] },
    { text: "π ≈ 3.1415", pos: [8, 5, 8] },
    { text: "a² + b² = c²", pos: [-10, 7, -8] },
    { text: "∫ e^x dx = e^x", pos: [12, 6, -10] }
  ];

  return (
    <group>
      {/* Voxel Terrain */}
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} receiveShadow castShadow>
          <boxGeometry args={[blockSize * 0.98, 2.5, blockSize * 0.98]} />
          <meshStandardMaterial 
            color={block.color} 
            roughness={0.9} 
            metalness={0.1}
            flatShading
          />
        </mesh>
      ))}

      {/* Volumetric Glowing Crystal Caves (Instanced representation) */}
      <group position={[0, -0.5, 0]}>
        {Array.from({ length: 45 }).map((_, i) => {
          const angle = (i / 45) * Math.PI * 2;
          const radius = 18 + Math.sin(i * 3) * 6;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const height = 1 + Math.random() * 3.5;
          return (
            <mesh key={i} position={[x, height / 2 - 0.5, z]} castShadow>
              <coneGeometry args={[0.5, height, 5]} />
              <meshStandardMaterial 
                color="#06b6d4" 
                emissive="#0891b2" 
                emissiveIntensity={1.8} 
                roughness={0.2}
                transparent
                opacity={0.95}
              />
            </mesh>
          );
        })}
      </group>

      {/* Floating Constellation Equations */}
      <group ref={equationRef}>
        {mathSymbols.map((sym, i) => (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={sym.pos}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={3} />
            </mesh>
            {/* Display Symbol Label in 3D */}
            <Html position={[sym.pos[0], sym.pos[1] + 0.8, sym.pos[2]]} center distanceFactor={8}>
              <div className="font-outfit text-cyan-300 font-bold bg-[#030712]/90 border border-cyan-500/30 px-3 py-1.5 rounded-full text-xs whitespace-nowrap shadow-lg select-none pointer-events-none backdrop-blur-sm animate-pulse-slow">
                {sym.text}
              </div>
            </Html>
          </Float>
        ))}
      </group>

      {/* Ambient Math Particle field */}
      <group>
        {Array.from({ length: 80 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 60;
          const z = (Math.random() - 0.5) * 60;
          const y = Math.random() * 12;
          return (
            <mesh key={i} position={[x, y, z]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial color="#67e8f9" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* Buildings rendered in Voxel style */}
      <VoxelTemple position={[0, 0.25, 0]} color="#1e3a8a" accentColor="#22d3ee" />
      <VoxelTower position={[15, 0.25, -15]} color="#1e3a8a" accentColor="#22d3ee" />
      <VoxelWorkshop position={[-18, 0.25, 10]} color="#1e3a8a" accentColor="#22d3ee" />
      <VoxelLab position={[15, 0.25, 15]} color="#1e3a8a" accentColor="#22d3ee" />
      <VoxelPortal position={[-10, 0.25, -15]} color="#1e3a8a" accentColor="#22d3ee" />
      <VoxelHall position={[0, 0.25, -18]} color="#1e3a8a" accentColor="#22d3ee" />
      <VoxelGarden position={[-16, 0.25, -2]} color="#1e3a8a" accentColor="#22d3ee" />
    </group>
  );
}
