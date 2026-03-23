"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 80;
const CONNECTION_DISTANCE = 2.5;

function Nodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const vel = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(NODE_COUNT * NODE_COUNT * 6),
    []
  );
  const lineColors = useMemo(
    () => new Float32Array(NODE_COUNT * NODE_COUNT * 6),
    []
  );

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      for (let d = 0; d < 3; d++) {
        const bound = d === 0 ? 6 : d === 1 ? 4 : 3;
        if (Math.abs(positions[i * 3 + d]) > bound) {
          velocities[i * 3 + d] *= -1;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const intensity = alpha * 0.5;

          linePositions[lineIdx * 6] = positions[i * 3];
          linePositions[lineIdx * 6 + 1] = positions[i * 3 + 1];
          linePositions[lineIdx * 6 + 2] = positions[i * 3 + 2];
          linePositions[lineIdx * 6 + 3] = positions[j * 3];
          linePositions[lineIdx * 6 + 4] = positions[j * 3 + 1];
          linePositions[lineIdx * 6 + 5] = positions[j * 3 + 2];

          const r = 0.39 * intensity;
          const g = 0.4 * intensity;
          const b = 0.95 * intensity;
          lineColors[lineIdx * 6] = r;
          lineColors[lineIdx * 6 + 1] = g;
          lineColors[lineIdx * 6 + 2] = b;
          lineColors[lineIdx * 6 + 3] = r;
          lineColors[lineIdx * 6 + 4] = g;
          lineColors[lineIdx * 6 + 5] = b;

          lineIdx++;
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.setDrawRange(0, lineIdx * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={NODE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#6366f1"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={NODE_COUNT * NODE_COUNT * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={NODE_COUNT * NODE_COUNT * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.8} />
      </lineSegments>
    </>
  );
}

export default function NodeNetwork({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Nodes />
      </Canvas>
    </div>
  );
}
