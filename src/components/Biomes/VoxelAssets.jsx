import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. KNOWLEDGE TEMPLE (Grand columns and step roofs)
export function VoxelTemple({ position, color = "#4c1d95", accentColor = "#a855f7" }) {
  return (
    <group position={position}>
      {/* Foundation Platform */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.5, 6]} />
        <meshStandardMaterial color="#2d2d35" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.5, 5]} />
        <meshStandardMaterial color="#1e1e24" roughness={0.8} flatShading />
      </mesh>

      {/* Pillars */}
      {[-2, 2].map((x) => 
        [-2, 2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 2.25, z]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 2.5, 0.7]} />
            <meshStandardMaterial color={color} roughness={0.6} flatShading />
          </mesh>
        ))
      )}

      {/* Roof structure (stepped pyramid style) */}
      <mesh position={[0, 3.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 0.5, 5.2]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 4.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.7, 3.8]} />
        <meshStandardMaterial color={color} roughness={0.7} flatShading />
      </mesh>

      {/* Glowing Temple Core */}
      <Float speed={3} floatIntensity={1.5}>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial 
            color={accentColor} 
            emissive={accentColor} 
            emissiveIntensity={1.8} 
            roughness={0.1} 
          />
        </mesh>
      </Float>
    </group>
  );
}

// 2. CHALLENGE TOWER (Tall stacked voxel tower)
export function VoxelTower({ position, color = "#1e3a8a", accentColor = "#3b82f6" }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 1, 4.5]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} flatShading />
      </mesh>

      {/* Main Body Segments */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 3, 3.5]} />
        <meshStandardMaterial color={color} roughness={0.7} flatShading />
      </mesh>
      
      {/* Decorative banding */}
      <mesh position={[0, 4.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.5, 3.8]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} roughness={0.6} />
      </mesh>

      {/* Upper Segment */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.7} flatShading />
      </mesh>

      {/* Beacon Roof */}
      <mesh position={[0, 7.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.5, 1.5]} />
        <meshStandardMaterial color="#4b5563" roughness={0.7} flatShading />
      </mesh>
      
      {/* Glowing Peak */}
      <mesh position={[0, 8.4, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.6]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

// 3. CRAFTING WORKSHOP (Pitched roof hut shape)
export function VoxelWorkshop({ position, color = "#b45309", accentColor = "#f59e0b" }) {
  return (
    <group position={position}>
      {/* Base Foundation */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.5, 4]} />
        <meshStandardMaterial color="#2d2219" roughness={0.8} flatShading />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 2, 3.4]} />
        <meshStandardMaterial color={color} roughness={0.8} flatShading />
      </mesh>

      {/* Roof - Left Slope */}
      <mesh position={[-1.2, 3.0, 0]} rotation={[0, 0, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.4, 4.2]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} flatShading />
      </mesh>

      {/* Roof - Right Slope */}
      <mesh position={[1.2, 3.0, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.4, 4.2]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} flatShading />
      </mesh>

      {/* Glow Window */}
      <mesh position={[0, 1.6, 1.72]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.15]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// 4. INNOVATION LAB (Radar, antenna dome shape)
export function VoxelLab({ position, color = "#065f46", accentColor = "#10b981" }) {
  const antennaRef = useRef();

  return (
    <group position={position}>
      {/* Foundation */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.5, 5]} />
        <meshStandardMaterial color="#111827" roughness={0.8} />
      </mesh>

      {/* Circular base block */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2.2, 1.8, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} flatShading />
      </mesh>

      {/* Lab Dome */}
      <mesh position={[0, 2.7, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} metalness={0.2} transparent opacity={0.8} />
      </mesh>

      {/* Rotating Antenna / Receiver */}
      <group position={[0, 3.8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 1.0, 0.2]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.2, 0.8]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.2} />
        </mesh>
      </group>
    </group>
  );
}

// 5. LANGUAGE PORTAL (Floating ring arches)
export function VoxelPortal({ position, color = "#0f172a", accentColor = "#ec4899" }) {
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (ringRef1.current) {
      ringRef1.current.rotation.z = elapsed * 0.8;
      ringRef1.current.rotation.x = elapsed * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -elapsed * 0.6;
      ringRef2.current.rotation.y = elapsed * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Stone Pedestal base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.6, 4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} flatShading />
      </mesh>

      {/* Pillars holding portal frame */}
      <mesh position={[-1.7, 1.8, 0]} castShadow>
        <boxGeometry args={[0.5, 2.5, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[1.7, 1.8, 0]} castShadow>
        <boxGeometry args={[0.5, 2.5, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 3.25, 0]} castShadow>
        <boxGeometry args={[3.9, 0.5, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>

      {/* Animated Portal Gate Rings */}
      <group position={[0, 1.8, 0]}>
        <mesh ref={ringRef1}>
          <torusGeometry args={[1.2, 0.12, 6, 12]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.5} />
        </mesh>
        <mesh ref={ringRef2} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.9, 0.08, 6, 12]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} />
        </mesh>
        
        {/* Core vortex particles */}
        <mesh>
          <sphereGeometry args={[0.4, 6, 6]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3.0} />
        </mesh>
      </group>
    </group>
  );
}

// 6. VILLAGE HALL (Meeting building with columns and wide roof)
export function VoxelHall({ position, color = "#0369a1", accentColor = "#38bdf8" }) {
  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 0.5, 4.5]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Front Columns */}
      {[-2.5, -0.85, 0.85, 2.5].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 1.8]} castShadow>
          <boxGeometry args={[0.4, 2, 0.4]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
        </mesh>
      ))}

      {/* Main walls */}
      <mesh position={[0, 1.5, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 2, 3.2]} />
        <meshStandardMaterial color={color} roughness={0.7} flatShading />
      </mesh>

      {/* Top Roof */}
      <mesh position={[0, 2.75, 0]} castShadow>
        <boxGeometry args={[6.8, 0.6, 4.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      
      {/* Light at entry */}
      <mesh position={[0, 2.1, 1.8]}>
        <boxGeometry args={[0.5, 0.2, 0.2]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

// 7. REFLECTION GARDEN (Serene Voxel tree, glowing pool, boundary rocks)
export function VoxelGarden({ position, color = "#166534", accentColor = "#4ade80" }) {
  return (
    <group position={position}>
      {/* Zen Ground ring */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.3, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Serene Water Pool */}
      <mesh position={[-0.8, 0.25, 0.5]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.2, 8]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>

      {/* Bonsai / Voxel Tree */}
      <group position={[0.8, 0.3, -0.6]}>
        {/* Trunk */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.3, 1.6, 0.3]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        
        {/* Foliage Blocks */}
        <mesh position={[0, 1.9, 0]} castShadow>
          <boxGeometry args={[1.6, 1.0, 1.6]} />
          <meshStandardMaterial color={color} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0.4, 2.5, 0.2]} castShadow>
          <boxGeometry args={[1.0, 0.7, 1.0]} />
          <meshStandardMaterial color={accentColor} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[-0.3, 2.3, -0.4]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color={color} roughness={0.7} flatShading />
        </mesh>
      </group>

      {/* Decorative Rocks */}
      <mesh position={[-1.8, 0.4, -1.0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
      <mesh position={[1.8, 0.3, 1.2]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>
    </group>
  );
}
