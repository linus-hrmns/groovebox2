import { useThree } from '@react-three/fiber';
import { useFrame } from 'react';
import { useRef, useState, useEffect } from 'react';

// Utility to project 3D position to 2D screen coordinates
export function useProjectToScreen(point3D) {
  const { camera, size } = useThree();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const pointRef = useRef(point3D);

  useEffect(() => {
    pointRef.current = point3D;
  }, [point3D]);

  useFrame(() => {
    const vector = pointRef.current.clone().project(camera);
    setCoords({
      x: (vector.x * 0.5 + 0.5) * size.width,
      y: (-vector.y * 0.5 + 0.5) * size.height,
    });
  });

  return coords;
}
