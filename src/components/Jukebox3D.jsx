import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function JukeboxModel({ mood, setMood, activity, setActivity, showStart, onStart }) {
  const { scene } = useGLTF("/src/assets/jukebox.glb");
  return (
    <primitive object={scene} scale={1.5} />
  );
}

export default function Jukebox3D({ mood, setMood, activity, setActivity, showStart, onStart }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }}>
        <ambientLight color={0x404040} intensity={1} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <hemisphereLight
          skyColor={0xffffff}
          groundColor={0x444444}
          intensity={0.6}
          position={[0, 10, 0]}
        />
        <Suspense fallback={null}>
          <JukeboxModel
            mood={mood}
            setMood={setMood}
            activity={activity}
            setActivity={setActivity}
            showStart={showStart}
            onStart={onStart}
          />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/src/assets/jukebox.glb");
