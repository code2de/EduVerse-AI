import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Voxel building templates
import { VoxelTemple, VoxelTower, VoxelWorkshop, VoxelLab, VoxelPortal, VoxelHall, VoxelGarden } from './VoxelAssets';

export default function EnglishBiome() {
  const petalsRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Animate falling blossom petals (swirling motion)
    if (petalsRef.current) {
      petalsRef.current.rotation.y = elapsed * 0.05;
      petalsRef.current.children.forEach((child, index) => {
        child.position.y -= 0.02;
        // Reset when falling past ground
        if (child.position.y < 0) {
          child.position.y = 12;
        }
        child.position.x += Math.sin(elapsed + index) * 0.005;
      });
    }
  });

  // Procedural Cherry Blossom pink/warm sand Voxel Terrain
  const gridSize = 24;
  const blockSize = 1.5;
  const blocks = [];

  for (let x = -gridSize; x <= gridSize; x += 2) {
    for (let z = -gridSize; z <= gridSize; z += 2) {
      const dist = Math.sqrt(x * x + z * z);
      let y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 1.2;
      
      // Flatten the center area
      if (dist < 8) y = -0.5;

      const color = new THREE.Color();
      // Warm salmon, cherry blossom pinks and sunset golden colors
      color.setHSL(0.96 + (y * 0.02), 0.6, 0.35 + (Math.sin(dist * 0.1) * 0.05));

      blocks.push({
        position: [x * blockSize, y, z * blockSize],
        color: color
      });
    }
  }

  // Floating poetry text fragments
  const poems = [
    { text: "Shall I compare thee...", pos: [-8, 6, 6] },
    { text: "An old silent pond...", pos: [0, 8, -8] },
    { text: "Road less traveled by...", pos: [8, 5, 8] },
    { text: "In a station of the metro...", pos: [-10, 7, -6] }
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
            flatShading
          />
        </mesh>
      ))}

      {/* Cherry Blossom falling petals */}
      <group ref={petalsRef}>
        {Array.from({ length: 90 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 55;
          const z = (Math.random() - 0.5) * 55;
          const y = Math.random() * 12;
          return (
            <mesh key={i} position={[x, y, z]}>
              <boxGeometry args={[0.18, 0.05, 0.18]} />
              <meshStandardMaterial color="#f472b6" roughness={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* Glowing Sunset Lanterns */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 12 + Math.sin(i) * 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = 3 + Math.sin(i * 2) * 1.5;
          return (
            <group key={i} position={[x, y, z]}>
              {/* String hanging */}
              <mesh position={[0, 0.8, 0]}>
                <boxGeometry args={[0.02, 0.8, 0.02]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
              </mesh>
              {/* Lantern body */}
              <mesh position={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[0.4, 0.6, 0.4]} />
                <meshStandardMaterial 
                  color="#ea580c" 
                  emissive="#f59e0b" 
                  emissiveIntensity={2.5} 
                />
              </mesh>
              {/* Bottom tassel */}
              <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[0.1, 0.2, 0.1]} />
                <meshBasicMaterial color="#dc2626" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Floating Poetry Fragments */}
      <group>
        {poems.map((poem, i) => (
          <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
            <mesh position={poem.pos}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={2} />
            </mesh>
            <Html position={[poem.pos[0], poem.pos[1] + 0.7, poem.pos[2]]} center distanceFactor={8}>
              <div className="font-outfit text-amber-200 font-medium italic bg-[#1e1b4b]/95 border border-pink-500/30 px-3 py-1.5 rounded-full text-xs whitespace-nowrap shadow-lg select-none pointer-events-none backdrop-blur-sm animate-pulse-slow">
                "{poem.text}"
              </div>
            </Html>
          </Float>
        ))}
      </group>

      {/* Cherry Blossom Pagoda Trees */}
      <group>
        {[
          [-15, 8], [14, -14], [-12, -15], [10, 15], [18, -6], [-15, -4]
        ].map((pos, i) => (
          <group key={i} position={[pos[0], 0, pos[1]]}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow>
              <boxGeometry args={[0.4, 3, 0.4]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            {/* Pink Leaves */}
            <mesh position={[0, 3.5, 0]} castShadow>
              <boxGeometry args={[2.5, 2.2, 2.5]} />
              <meshStandardMaterial color="#f472b6" roughness={0.7} flatShading />
            </mesh>
          </group>
        ))}
      </group>

      {/* English/Cherry Blossom styled buildings */}
      <VoxelTemple position={[0, 0.25, 0]} color="#b91c1c" accentColor="#f59e0b" />
      <VoxelTower position={[15, 0.25, -15]} color="#b91c1c" accentColor="#f59e0b" />
      <VoxelWorkshop position={[-18, 0.25, 10]} color="#b91c1c" accentColor="#f59e0b" />
      <VoxelLab position={[15, 0.25, 15]} color="#b91c1c" accentColor="#f59e0b" />
      <VoxelPortal position={[-10, 0.25, -15]} color="#b91c1c" accentColor="#f59e0b" />
      <VoxelHall position={[0, 0.25, -18]} color="#b91c1c" accentColor="#f59e0b" />
      <VoxelGarden position={[-16, 0.25, -2]} color="#b91c1c" accentColor="#f59e0b" />
    </group>
  );
}
