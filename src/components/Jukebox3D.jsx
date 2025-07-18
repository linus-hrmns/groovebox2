import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import MoodActivityPanel from "./MoodActivityPanel";
import Draggable from "./Draggable";

const moodAnchor = [0, 1.2, 0.5]; // Centered horizontally

function JukeboxModel({ mood, setMood, activity, setActivity, showStart, onStart }) {
  const { scene } = useGLTF("/src/assets/jukebox.glb");
  return (
    <>
      <primitive object={scene} scale={1.5} />
      <Html position={moodAnchor} center zIndexRange={[10, 20]}>
        <Draggable defaultPosition={{ x: window.innerWidth / 2 - 180, y: 80 }}>
          <MoodActivityPanel
            mood={mood}
            setMood={setMood}
            activity={activity}
            setActivity={setActivity}
            showStart={showStart}
            onStart={onStart}
          />
        </Draggable>
      </Html>
    </>
  );
}

export default function Jukebox3D({ mood, setMood, activity, setActivity, showStart, onStart }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
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
