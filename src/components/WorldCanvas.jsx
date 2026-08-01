import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sky, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Biome components
import MathBiome from './Biomes/MathBiome';
import ScienceBiome from './Biomes/ScienceBiome';
import EnglishBiome from './Biomes/EnglishBiome';
import HistoryBiome from './Biomes/HistoryBiome';
import CSBiome from './Biomes/CSBiome';

// Camera controller that handles transitions and player fly-by
function CameraController({ targetPosition, targetLookAt, isTransitioning, setIsTransitioning }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (!targetPosition) return;

    setIsTransitioning(true);

    // Stop active controller damping during fly-by
    if (controls) controls.enabled = false;

    // Animate camera position
    gsap.to(camera.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 2.2,
      ease: 'power3.inOut',
    });

    // Animate camera target (where it's looking)
    if (controls) {
      gsap.to(controls.target, {
        x: targetLookAt[0],
        y: targetLookAt[1],
        z: targetLookAt[2],
        duration: 2.2,
        ease: 'power3.inOut',
        onComplete: () => {
          controls.enabled = true;
          setIsTransitioning(false);
        }
      });
    }
  }, [targetPosition, targetLookAt, camera, controls, setIsTransitioning]);

  return null;
}

// Moving volumetric cloud particles
function Clouds() {
  const cloudRef = useRef();
  
  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={cloudRef} position={[0, 25, 0]}>
      {Array.from({ length: 15 }).map((_, i) => {
        const x = Math.sin(i) * 35;
        const z = Math.cos(i) * 35;
        const y = Math.sin(i * 2) * 4;
        return (
          <mesh key={i} position={[x, y, z]}>
            <dodecahedronGeometry args={[4 + Math.random() * 3, 1]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.15} 
              flatShading 
              roughness={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Environmental lighting and sun controller
function Lighting({ subject }) {
  const isNight = subject === 'Mathematics';
  const isSunset = subject === 'English' || subject === 'History';
  
  let sunColor = "#ffffff";
  let intensity = 1.2;
  let ambientColor = "#778899";
  
  if (isNight) {
    sunColor = "#38bdf8";
    intensity = 0.3;
    ambientColor = "#0f172a";
  } else if (isSunset) {
    sunColor = "#fb923c";
    intensity = 1.0;
    ambientColor = "#4c0519";
  }

  return (
    <>
      <ambientLight intensity={isNight ? 0.2 : 0.4} color={ambientColor} />
      <directionalLight 
        position={[40, 50, 40]} 
        intensity={intensity} 
        color={sunColor} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <hemisphereLight skyColor={sunColor} groundColor="#000000" intensity={0.3} />
    </>
  );
}

export default function WorldCanvas({ subject, focusTarget, isTransitioning, setIsTransitioning }) {
  // Map navigation items to world positions
  const getCoordinates = (target) => {
    switch (target) {
      case 'Knowledge Temple':
        return { pos: [0, 8, 20], look: [0, 2, 0] };
      case 'Challenge Tower':
        return { pos: [22, 10, -15], look: [15, 4, -15] };
      case 'Crafting Workshop':
        return { pos: [-24, 7, 10], look: [-18, 2, 10] };
      case 'Innovation Lab':
        return { pos: [20, 8, 20], look: [15, 3, 15] };
      case 'Language Portal':
        return { pos: [-15, 6, -20], look: [-10, 2, -15] };
      case 'Village Hall':
        return { pos: [0, 7, -25], look: [0, 2, -18] };
      case 'Reflection Garden':
        return { pos: [-22, 5, -2], look: [-16, 1, -2] };
      case 'Learning Progress':
        return { pos: [0, 15, 35], look: [0, 2, 0] }; // Overhead view
      default: // Welcome entry view
        return { pos: [0, 15, 45], look: [0, 0, 0] };
    }
  };

  const currentView = getCoordinates(focusTarget);

  // Fog & Sky parameters based on biome
  const getFogParams = () => {
    switch (subject) {
      case 'Mathematics':
        return { color: '#090916', near: 10, far: 90 };
      case 'Science':
        return { color: '#021810', near: 15, far: 80 };
      case 'English':
        return { color: '#1a0d1a', near: 10, far: 85 };
      case 'History':
        return { color: '#2b1b0b', near: 15, far: 90 };
      case 'Computer Science':
        return { color: '#030712', near: 15, far: 75 };
      default:
        return { color: '#050510', near: 10, far: 100 };
    }
  };

  const fog = getFogParams();

  return (
    <div className="w-full h-full relative">
      <Canvas 
        shadows 
        camera={{ position: [0, 15, 45], fov: 45 }}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
      >
        {/* Dynamic Fog */}
        <fog attach="fog" args={[fog.color, fog.near, fog.far]} />

        {/* Ambient background colors */}
        <color attach="background" args={[fog.color]} />

        {/* Lighting system */}
        <Lighting subject={subject} />

        {/* Stars and Sky configurations */}
        {subject === 'Mathematics' ? (
          <Stars radius={100} depth={50} count={3500} factor={6} saturation={0.5} fade speed={2} />
        ) : (
          <Sky 
            distance={450000} 
            sunPosition={subject === 'English' || subject === 'History' ? [0.1, 0.05, 1] : [0, 1, 0]} 
            inclination={subject === 'English' ? 0.6 : 0.4} 
            azimuth={0.25} 
          />
        )}

        {/* Clouds floating */}
        {subject !== 'Mathematics' && <Clouds />}

        {/* Render Biome Worlds based on selected Subject */}
        {subject === 'Mathematics' && <MathBiome />}
        {subject === 'Science' && <ScienceBiome />}
        {subject === 'English' && <EnglishBiome />}
        {subject === 'History' && <HistoryBiome />}
        {subject === 'Computer Science' && <CSBiome />}

        {/* Camera and Control configuration */}
        <CameraController 
          targetPosition={currentView.pos} 
          targetLookAt={currentView.look}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
        />

        <OrbitControls 
          makeDefault 
          maxPolarAngle={Math.PI / 2.05} // Lock camera above ground plane
          minDistance={5}
          maxDistance={65}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Floating Instructions HUD */}
      <div className="absolute bottom-6 left-6 pointer-events-none glass px-4 py-2.5 rounded-2xl border border-white/5 text-[11px] text-gray-400 font-sans tracking-wide space-y-1 select-none">
        <div className="flex items-center gap-1.5 text-white/90 font-bold uppercase tracking-widest text-[9px] mb-1">
          <span className="material-icons text-[12px] text-cyan-400">explore</span> Navigation Controls
        </div>
        <div>🖱️ Left-Click + Drag: Look / Orbit Around</div>
        <div>🖱️ Right-Click + Drag: Pan Camera</div>
        <div>📜 Scroll Mouse Wheel: Zoom In / Out</div>
        <div>✨ Click navigation items to fly to temples</div>
      </div>
    </div>
  );
}
