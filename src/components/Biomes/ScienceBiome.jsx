import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Voxel building templates
import { VoxelTemple, VoxelTower, VoxelWorkshop, VoxelLab, VoxelPortal, VoxelHall, VoxelGarden } from './VoxelAssets';

// A dynamic mathematically generated DNA double-helix
function DnaHelix({ position, scale = 1 }) {
  const helixRef = useRef();

  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  const nodeCount = 18;
  const nodes = [];
  
  for (let i = 0; i < nodeCount; i++) {
    const y = (i - nodeCount / 2) * 0.4;
    const angle = i * 0.5;
    const x1 = Math.sin(angle) * 1.5;
    const z1 = Math.cos(angle) * 1.5;
    const x2 = Math.sin(angle + Math.PI) * 1.5;
    const z2 = Math.cos(angle + Math.PI) * 1.5;

    nodes.push({ y, x1, z1, x2, z2, colorIndex: i % 3 });
  }

  return (
    <group ref={helixRef} position={position} scale={[scale, scale, scale]}>
      {nodes.map((node, i) => (
        <group key={i} position={[0, node.y, 0]}>
          {/* Strand 1 Node */}
          <mesh position={[node.x1, 0, node.z1]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial 
              color={node.colorIndex === 0 ? "#ff2a85" : node.colorIndex === 1 ? "#06b6d4" : "#eab308"} 
              emissive={node.colorIndex === 0 ? "#ff2a85" : node.colorIndex === 1 ? "#06b6d4" : "#eab308"}
              emissiveIntensity={1.5}
            />
          </mesh>

          {/* Strand 2 Node */}
          <mesh position={[node.x2, 0, node.z2]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial 
              color={node.colorIndex === 0 ? "#06b6d4" : node.colorIndex === 1 ? "#eab308" : "#ff2a85"} 
              emissive={node.colorIndex === 0 ? "#06b6d4" : node.colorIndex === 1 ? "#eab308" : "#ff2a85"}
              emissiveIntensity={1.5}
            />
          </mesh>

          {/* Connecting ladder rung */}
          <mesh 
            position={[(node.x1 + node.x2) / 2, 0, (node.z1 + node.z2) / 2]} 
            rotation={[0, 0, Math.atan2(node.z2 - node.z1, node.x2 - node.x1)]}
          >
            <boxGeometry args={[3.0, 0.05, 0.05]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function ScienceBiome() {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  // Procedural Green Voxel Terrain
  const gridSize = 24;
  const blockSize = 1.5;
  const blocks = [];

  for (let x = -gridSize; x <= gridSize; x += 2) {
    for (let z = -gridSize; z <= gridSize; z += 2) {
      const dist = Math.sqrt(x * x + z * z);
      let y = Math.sin(x * 0.15) * Math.sin(z * 0.15) * 1.8;
      
      // Carve out a path for a river through the biome
      const isRiver = Math.abs(x - z) < 3;
      if (isRiver) {
        y = -1.2;
      } else if (dist < 8) {
        y = -0.5; // Flatten core zone
      }

      const color = new THREE.Color();
      if (isRiver) {
        // Deep blue for river bottom
        color.setHSL(0.58, 0.9, 0.2);
      } else {
        // Vibrant forest green shades
        color.setHSL(0.33 + (y * 0.03), 0.75, 0.25 + (Math.sin(dist * 0.05) * 0.05));
      }

      blocks.push({
        position: [x * blockSize, y, z * blockSize],
        color: color,
        isRiver: isRiver
      });
    }
  }

  return (
    <group>
      {/* Voxel Terrain */}
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} receiveShadow castShadow>
          <boxGeometry args={[blockSize * 0.98, block.isRiver ? 1.0 : 2.5, blockSize * 0.98]} />
          <meshStandardMaterial 
            color={block.color} 
            roughness={0.8} 
            flatShading
          />
        </mesh>
      ))}

      {/* River water overlay */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (i - 7) * 4;
        const z = x;
        return (
          <mesh key={i} position={[x, -0.6, z]} receiveShadow>
            <boxGeometry args={[6.5, 0.2, 6.5]} />
            <meshStandardMaterial 
              color="#0284c7" 
              transparent 
              opacity={0.7} 
              roughness={0.1}
              metalness={0.6}
            />
          </mesh>
        );
      })}

      {/* Volumetric Waterfall falling into river */}
      <mesh position={[-16, 2, -16]}>
        <boxGeometry args={[3, 6, 0.5]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive="#0284c7"
          emissiveIntensity={0.6}
          transparent 
          opacity={0.8} 
          roughness={0.1}
        />
      </mesh>

      {/* Glowing DNA Structures in the sky */}
      <Float speed={2} floatIntensity={0.8}>
        <DnaHelix position={[-8, 6, 8]} scale={0.75} />
        <DnaHelix position={[8, 7, -8]} scale={0.75} />
      </Float>

      {/* Bioluminescent Flowers/Plants around forests */}
      <group>
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const radius = 10 + Math.sin(i * 5) * 4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const hue = i % 2 === 0 ? "#ec4899" : "#f59e0b"; // Pink or orange
          return (
            <mesh key={i} position={[x, 0.8, z]} castShadow>
              <sphereGeometry args={[0.25, 6, 6]} />
              <meshStandardMaterial 
                color={hue} 
                emissive={hue} 
                emissiveIntensity={1.5} 
              />
            </mesh>
          );
        })}
      </group>

      {/* Spawning Forest Trees */}
      <group>
        {[
          [-12, 10], [12, -10], [-10, -12], [8, 12], [18, 5], [-16, -2]
        ].map((pos, i) => (
          <group key={i} position={[pos[0], 0, pos[1]]}>
            {/* Trunk */}
            <mesh position={[0, 1.25, 0]} castShadow>
              <boxGeometry args={[0.5, 2.5, 0.5]} />
              <meshStandardMaterial color="#713f12" roughness={0.9} />
            </mesh>
            {/* Voxel leaves */}
            <mesh position={[0, 3.25, 0]} castShadow>
              <boxGeometry args={[2.0, 1.8, 2.0]} />
              <meshStandardMaterial color="#047857" roughness={0.75} flatShading />
            </mesh>
          </group>
        ))}
      </group>

      {/* Forest Fireflies */}
      <group ref={particlesRef}>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 50;
          const z = (Math.random() - 0.5) * 50;
          const y = Math.random() * 8;
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.06, 4, 4]} />
              <meshBasicMaterial color="#a7f3d0" transparent opacity={0.8} />
            </mesh>
          );
        })}
      </group>

      {/* Forest Biome Buildings */}
      <VoxelTemple position={[0, 0.25, 0]} color="#065f46" accentColor="#10b981" />
      <VoxelTower position={[15, 0.25, -15]} color="#065f46" accentColor="#10b981" />
      <VoxelWorkshop position={[-18, 0.25, 10]} color="#065f46" accentColor="#10b981" />
      <VoxelLab position={[15, 0.25, 15]} color="#065f46" accentColor="#10b981" />
      <VoxelPortal position={[-10, 0.25, -15]} color="#065f46" accentColor="#10b981" />
      <VoxelHall position={[0, 0.25, -18]} color="#065f46" accentColor="#10b981" />
      <VoxelGarden position={[-16, 0.25, -2]} color="#065f46" accentColor="#10b981" />
    </group>
  );
}
