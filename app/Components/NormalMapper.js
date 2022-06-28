import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import RecordModel from './FLOPPY_LP';

const Record = () => {
  const map = useLoader(TextureLoader, 'assets/test_26.png');
  const normalMap = useLoader(TextureLoader, 'assets/NormalMap.png');
  const meshy = useRef();

  useFrame(({ clock }) => {
    meshy.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    // <RecordModel map={map} normal={normal} />
    <group>
      <mesh ref={meshy}>
        <boxGeometry args={[4, 4, 0.05]} />

        <meshStandardMaterial
          attach="material"
          transparent={true}
          map={map}
          normalMap={normalMap}
        />
      </mesh>
    </group>
  );
};

const MainCanvas = () => {
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight intenstiy={2} position={[0, 5, 0]} />
        <Record />
      </Suspense>
    </Canvas>
  );
};

export default MainCanvas;
