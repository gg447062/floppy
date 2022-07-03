import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Record = ({ image }) => {
  const map = useLoader(TextureLoader, image);

  const recordMesh = useRef();

  useFrame(({ clock }) => {
    recordMesh.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <group>
      <mesh ref={recordMesh}>
        <boxGeometry args={[4, 4, 0.05]} />
        <meshStandardMaterial attach="material" transparent={true} map={map} />
      </mesh>
    </group>
  );
};

const MainCanvas = ({ image }) => {
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight intenstiy={2} position={[0, 5, 0]} />
        <Record image={image} />
      </Suspense>
    </Canvas>
  );
};

export default MainCanvas;
