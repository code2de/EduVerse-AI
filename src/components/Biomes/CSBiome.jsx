import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Voxel building templates
import { VoxelTemple, VoxelTower, VoxelWorkshop, VoxelLab, VoxelPortal, VoxelHall, VoxelGarden } from './VoxelAssets';

export default function CSBiome() {
  const binaryRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Animate falling binary particles
    if (binaryRef.current) {
      binaryRef.current.children.forEach((child, index) => {
        child.position.y -= 0.05;
        if (child.position.y < 0) {
          child.position.y = 12 + Math.sin(index) * 2;
        }
      });
    }
  });

  // Dark metallic grid terrain with glowing lines
  const gridSize = 24;
  const blockSize = 1.5;
  const blocks = [];

  for (let x = -gridSize; x <= gridSize; x += 2) {
    for (let z = -gridSize; z <= gridSize; z += 2) {
      const dist = Math.sqrt(x * x + z * z);
      let y = 0;
      
      // Let's create stepped digital server columns on the boundaries
      if (Math.abs(x) > 16 || Math.abs(z) > 16) {
        y = 1.5 + Math.sin(x * z) * 0.8;
      } else if (dist < 8) {
        y = -0.5;
      }

      const color = new THREE.Color();
      // Tech slate dark grey/blue color palette
      color.setHSL(0.6, 0.4, 0.1 + (Math.sin(dist * 0.2) * 0.03));

      blocks.push({
        position: [x * blockSize, y, z * blockSize],
        color: color,
        isTower: y > 1
      });
    }
  }

  // Floating binary items
  const binaryStrings = [
    { text: "01101001", pos: [-7, 6, 8] },
    { text: "const search = (arr) => {", pos: [0, 8, -6] },
    { text: "O(log N)", pos: [8, 5, 8] },
    { text: "system.io.open()", pos: [-10, 7, -8] }
  ];

  return (
    <group>
      {/* Voxel Grid Terrain */}
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} receiveShadow castShadow>
          <boxGeometry args={[blockSize * 0.96, block.isTower ? 3.5 : 2.5, blockSize * 0.96]} />
          <meshStandardMaterial 
            color={block.color} 
            roughness={0.4} 
            metalness={0.8}
            flatShading
          />
        </mesh>
      ))}

      {/* Cyber Grid Lines (glowing wireframe) */}
      <gridHelper args={[70, 35, "#3b82f6", "#1e293b"]} position={[0, 0.8, 0]} />

      {/* Falling Binary Code Rain */}
      <group ref={binaryRef}>
        {Array.from({ length: 100 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 50;
          const z = (Math.random() - 0.5) * 50;
          const y = Math.random() * 12;
          const val = Math.random() > 0.5 ? "1" : "0";
          return (
            <Html key={i} position={[x, y, z]} distanceFactor={8} zIndexRange={[10, 20]}>
              <div className="font-mono text-[10px] text-green-400 font-extrabold select-none opacity-40">
                {val}
              </div>
            </Html>
          );
        })}
      </group>

      {/* Floating Code Structures */}
      <group>
        {binaryStrings.map((bin, i) => (
          <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
            <mesh position={bin.pos}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={2.5} />
            </mesh>
            <Html position={[bin.pos[0], bin.pos[1] + 0.7, bin.pos[2]]} center distanceFactor={8}>
              <div className="font-mono text-cyan-400 bg-black/90 border border-cyan-500/50 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap shadow-lg select-none pointer-events-none backdrop-blur-sm animate-pulse-slow">
                {bin.text}
              </div>
            </Html>
          </Float>
        ))}
      </group>

      {/* Neon Cyber Biome Buildings */}
      <VoxelTemple position={[0, 0.25, 0]} color="#1e1e2d" accentColor="#3b82f6" />
      <VoxelTower position={[15, 0.25, -15]} color="#1e1e2d" accentColor="#3b82f6" />
      <VoxelWorkshop position={[-18, 0.25, 10]} color="#1e1e2d" accentColor="#3b82f6" />
      <VoxelLab position={[15, 0.25, 15]} color="#1e1e2d" accentColor="#3b82f6" />
      <VoxelPortal position={[-10, 0.25, -15]} color="#1e1e2d" accentColor="#3b82f6" />
      <VoxelHall position={[0, 0.25, -18]} color="#1e1e2d" accentColor="#3b82f6" />
      <VoxelGarden position={[-16, 0.25, -2]} color="#1e1e2d" accentColor="#3b82f6" />
    </group>
  );
}
