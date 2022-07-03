import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import useSpline from '@splinetool/r3f-spline';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';

function Scene({ goToCrates, ...props }) {
  const { nodes, materials } = useSpline(
    'https://prod.spline.design/0YA61vB5flgIMIx0/scene.splinecode'
  );

  return (
    <>
      <color attach="background" args={['#585858']} />
      <fog attach="fog" args={['#fe0000', 2000, 2000]} />
      <group {...props} dispose={null}>
        <group name="Group" position={[-304.01, -28.06, 44.45]}>
          <mesh
            name="Plane"
            geometry={nodes.Plane.geometry}
            material={materials['Plane Material']}
            castShadow
            receiveShadow
            position={[35.8, -2.47, 11.6]}
            rotation={[0.04, 0.25, 0.14]}
            scale={[1.08, 0.55, 1.96]}
          />
          <group
            name="Diskette"
            position={[-123.46, -118.56, 7.03]}
            rotation={[1.67, 0.17, 0.3]}
            scale={[-0.06, 0.06, 0.06]}
          >
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={nodes.Cube.material}
              receiveShadow
              position={[-2921.05, -1124.28, -1664.42]}
              rotation={[Math.PI / 2, 0.55, -Math.PI]}
              scale={[-100, 100, 100]}
            />
          </group>
        </group>
        <group
          name="floppy balloonbaked2"
          position={[-10.08, 19.54, -15.03]}
          rotation={[0, 0.46, 0]}
        >
          <mesh
            name="CreepyPumpkinBalloon"
            geometry={nodes.CreepyPumpkinBalloon.geometry}
            material={nodes.CreepyPumpkinBalloon.material}
            receiveShadow
            position={[298.03, 69.38, 281.51]}
            rotation={[-1.42, -0.03, -3.73]}
            scale={3.74}
          />
        </group>
        <mesh
          name="Cube1"
          geometry={nodes.Cube1.geometry}
          material={materials['Cube1 Material']}
          receiveShadow
          position={[126.03, 268.6, -285.62]}
          rotation={[-Math.PI, 0.47, -Math.PI]}
          scale={[1.62, 1.62, 0.23]}
          onClick={goToCrates}
        />
        <group
          name="untitled1"
          position={[-525.26, 124.13, -212.18]}
          rotation={[0.11, -0.17, 0.02]}
        >
          <mesh
            name="Text"
            geometry={nodes.Text.geometry}
            material={nodes.Text.material}
            receiveShadow
            position={[-27.63, 150.26, 14.59]}
            rotation={[0, 0.09, 0]}
          />
        </group>
        <spotLight
          name="Spot Light"
          castShadow
          intensity={10}
          angle={Math.PI / 6}
          penumbra={0.7}
          decay={7.1}
          distance={6545}
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-fov={119.99999999999999}
          shadow-camera-near={100}
          shadow-camera-far={100000}
          position={[-463.98, 556.26, 675.78]}
          rotation={[-0.8, 1.1, 1.69]}
          scale={[0.69, 1, 0.63]}
        />
        <mesh
          name="Backdrop"
          geometry={nodes.Backdrop.geometry}
          material={materials['Backdrop Material']}
          castShadow
          receiveShadow
          position={[146.87, 143.5, 192]}
          scale={[5.44, 1.89, 1]}
        />
        <OrthographicCamera
          name="Default Camera"
          makeDefault={true}
          zoom={0.75}
          // zoom={1.51}
          far={50000}
          near={-50000}
          position={[-31, -60, 1420]}
          // position={[-31, 130, 992]}
        >
          <directionalLight
            name="Default Directional Light"
            castShadow
            intensity={0.75}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            position={[850000, 1300000, 1000000]}
          />
        </OrthographicCamera>
      </group>
    </>
  );
}

export default function SplashPage() {
  const navigate = useNavigate();

  const goToCrates = () => {
    navigate('/crates');
  };
  return (
    <Suspense fallback={null}>
      <Canvas shadows flat linear>
        <Scene goToCrates={goToCrates} />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
}
