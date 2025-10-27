// src/components/ui/globe.tsx
"use client";
import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";

const Dots = () => {
  const graticule = geoGraticule10();
  const projection = geoOrthographic().fitSize([2, 2], { type: "Sphere" });
  const dots: THREE.Vector3[] = [];

  // geoGraticule10() returns a MultiLineString GeoJSON object
  if (graticule.coordinates && Array.isArray(graticule.coordinates)) {
    graticule.coordinates.forEach((lineString: any) => {
      if (Array.isArray(lineString)) {
        lineString.forEach((coord: [number, number]) => {
          const projected = projection(coord);
          if (projected) {
            const [x, y] = projected;
            dots.push(new THREE.Vector3(x, y, 0));
          }
        });
      }
    });
  }

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={dots.length}
          array={new Float32Array(dots.flatMap((p) => p.toArray()))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.005}
        color="#888"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const World = (props: any) => {
  const { globeConfig } = props;
  const {
    polygonColor,
    emissive,
    emissiveIntensity,
  } = globeConfig;
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.5}>
      <meshStandardMaterial
        color={polygonColor}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        metalness={0.9}
        roughness={0.2}
      />
    </Sphere>
  );
};

export const Globe = ({ data, globeConfig }: { data: any, globeConfig: any }) => {
    return (
        <Canvas>
            <ambientLight color="#888" />
            <directionalLight position={[1, 1, 1]} color="white" />
            <World data={data} globeConfig={globeConfig} />
            <Dots />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    )
}
