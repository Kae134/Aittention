import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <shaderMaterial
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          // Simplex-like noise (2D)
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) +
                   (c - a) * u.y * (1.0 - u.x) +
                   (d - b) * u.x * u.y;
          }

          void main() {
            vec2 center = vUv - 0.5;
            float angle = atan(center.y, center.x);
            float baseRadius = length(center);

            // Bruit cyclique sur l'angle pour éviter la coupure
            float deform = noise(vec2(cos(angle), sin(angle)) * 0.7 + uTime * 0.25) * 0.16;
            float blobRadius = 0.38 + deform;

            float mask = smoothstep(blobRadius, blobRadius - 0.03, baseRadius);

            // Utilise la distance au centre rapportée au rayon déformé pour le gradient
            float heat = baseRadius / blobRadius;

            vec3 color;
            if (heat < 0.45) {
              color = mix(vec3(1.0,0.18,0.18), vec3(1.0,0.8,0.0), smoothstep(0.0,0.45,heat));
            } else if (heat < 0.7) {
              color = mix(vec3(1.0,0.8,0.0), vec3(0.0,1.0,0.3), smoothstep(0.45,0.7,heat));
            } else {
              color = mix(vec3(0.0,1.0,0.3), vec3(0.0,0.6,1.0), smoothstep(0.7,0.95,heat));
            }

            // Ajoute un grain premium
            float grain = noise(vUv * 40.0 + uTime * 0.5) * 0.04;
            color += grain;

            gl_FragColor = vec4(color, mask);
          }
        `}
        transparent
      />
    </mesh>
  );
}

export default function AnimatedHeatmapLogo(props: {
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ width: 72, height: 72, ...props.style }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Blob />
      </Canvas>
    </div>
  );
}
