import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Record = ({ image }) => {
  const map = useLoader(TextureLoader, image);
  // const map = useLoader(TextureLoader, 'assets/test_26.png');
  // const normalMap = useLoader(TextureLoader, 'assets/NormalMap.png');
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
