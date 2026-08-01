import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Voxel building templates
import { VoxelTemple, VoxelTower, VoxelWorkshop, VoxelLab, VoxelPortal, VoxelHall, VoxelGarden } from './VoxelAssets';

export default function HistoryBiome() {
  const birdsRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (birdsRef.current) {
      birdsRef.current.rotation.y = elapsed * 0.1;
      birdsRef.current.position.y = Math.sin(elapsed * 0.2) * 1.5 + 8;
    }
  });

  // Sandstone block terrain with carved canal waterways
  const gridSize = 24;
  const blockSize = 1.5;
  const blocks = [];

  for (let x = -gridSize; x <= gridSize; x += 2) {
    for (let z = -gridSize; z <= gridSize; z += 2) {
      const dist = Math.sqrt(x * x + z * z);
      let y = Math.sin(x * 0.08) * Math.sin(z * 0.08) * 1.0;

      // Define water canal coordinates running in a T-shape or cross
      const isCanal = Math.abs(x) < 2 || Math.abs(z) < 2;
      
      if (isCanal) {
        y = -1.0;
      } else if (dist < 8) {
        y = -0.5; // Main flat square
      }

      const color = new THREE.Color();
      if (isCanal) {
        color.setHSL(0.55, 0.8, 0.22); // Canal water bottom
      } else {
        // Sandstone/terracotta gradients
        color.setHSL(0.08 + (y * 0.02), 0.5, 0.35 + (Math.sin(dist * 0.08) * 0.05));
      }

      blocks.push({
        position: [x * blockSize, y, z * blockSize],
        color: color,
        isCanal: isCanal
      });
    }
  }

  // Floating ancient maps / scrolls
  const scrolls = [
    { text: "📜 Code of Hammurabi", pos: [-8, 6, 7] },
    { text: "🗺️ Fertile Crescent Map", pos: [7, 8, -7] },
    { text: "🏛️ Ziggurat of Ur", pos: [9, 5, 8] },
    { text: "⛵ Tigris Trade Routes", pos: [-10, 6, -8] }
  ];

  return (
    <group>
      {/* Voxel Terrain */}
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} receiveShadow castShadow>
          <boxGeometry args={[blockSize * 0.98, block.isCanal ? 1.0 : 2.5, blockSize * 0.98]} />
          <meshStandardMaterial 
            color={block.color} 
            roughness={0.9} 
            flatShading
          />
        </mesh>
      ))}

      {/* Canal Water Overlay */}
      {Array.from({ length: 24 }).map((_, i) => {
        const coord = (i - 12) * 2;
        return (
          <group key={i}>
            {/* Horizontal Canal Overlay */}
            <mesh position={[coord * blockSize, -0.4, 0]} receiveShadow>
              <boxGeometry args={[blockSize * 2, 0.2, blockSize * 3.5]} />
              <meshStandardMaterial color="#0284c7" transparent opacity={0.65} roughness={0.1} />
            </mesh>
            {/* Vertical Canal Overlay */}
            <mesh position={[0, -0.4, coord * blockSize]} receiveShadow>
              <boxGeometry args={[blockSize * 3.5, 0.2, blockSize * 2]} />
              <meshStandardMaterial color="#0284c7" transparent opacity={0.65} roughness={0.1} />
            </mesh>
          </group>
        );
      })}

      {/* Stone Arch Bridge across the canal */}
      <group position={[0, 0.35, 6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.5, 1.2, 2.5]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[2.5, 0.8, 2.7]} />
          <meshStandardMaterial color="#292524" roughness={0.9} />
        </mesh>
      </group>

      {/* Floating Ancient Scrolls / Records */}
      <group>
        {scrolls.map((scr, i) => (
          <Float key={i} speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
            <mesh position={scr.pos}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="#d97706" emissive="#b45309" emissiveIntensity={1.8} />
            </mesh>
            <Html position={[scr.pos[0], scr.pos[1] + 0.7, scr.pos[2]]} center distanceFactor={8}>
              <div className="font-outfit text-amber-100 font-semibold bg-[#292524]/95 border border-amber-600/40 px-3 py-1.5 rounded-full text-xs whitespace-nowrap shadow-lg select-none pointer-events-none backdrop-blur-sm animate-pulse-slow">
                {scr.text}
              </div>
            </Html>
          </Float>
        ))}
      </group>

      {/* Flocks of birds circling the city */}
      <group ref={birdsRef} position={[0, 8, 0]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 8 + Math.random() * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
              <boxGeometry args={[0.3, 0.05, 0.15]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          );
        })}
      </group>

      {/* Voxel Ancient Ruins/Columns */}
      <group>
        {[
          [-12, -12], [-14, -10], [14, 12], [12, 14], [-15, 12], [14, -12]
        ].map((pos, i) => (
          <group key={i} position={[pos[0], 0, pos[1]]}>
            {/* Broken columns */}
            <mesh position={[0, 1.0, 0]} castShadow>
              <boxGeometry args={[0.6, 2.0, 0.6]} />
              <meshStandardMaterial color="#a8a29e" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow>
              <boxGeometry args={[0.7, 0.4, 0.7]} />
              <meshStandardMaterial color="#78716c" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Sandstone/History biomes buildings */}
      <VoxelTemple position={[0, 0.25, 0]} color="#d97706" accentColor="#fb923c" />
      <VoxelTower position={[15, 0.25, -15]} color="#d97706" accentColor="#fb923c" />
      <VoxelWorkshop position={[-18, 0.25, 10]} color="#d97706" accentColor="#fb923c" />
      <VoxelLab position={[15, 0.25, 15]} color="#d97706" accentColor="#fb923c" />
      <VoxelPortal position={[-10, 0.25, -15]} color="#d97706" accentColor="#fb923c" />
      <VoxelHall position={[0, 0.25, -18]} color="#d97706" accentColor="#fb923c" />
      <VoxelGarden position={[-16, 0.25, -2]} color="#d97706" accentColor="#fb923c" />
    </group>
  );
}
