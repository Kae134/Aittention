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

            // Déformation animée du rayon du blob
            float deform = noise(vec2(cos(angle), sin(angle)) * 0.7 + uTime * 0.25) * 0.16;
            float blobRadius = 0.38 + deform;

            // Normalisation pour le gradient
            float heat = baseRadius / blobRadius;

            // Palette heatmap
            vec3 c1 = vec3(1.0, 0.18, 0.18);   // rouge
            vec3 c2 = vec3(1.0, 0.8, 0.0);     // jaune
            vec3 c3 = vec3(0.0, 1.0, 0.3);     // vert
            vec3 c4 = vec3(0.0, 0.6, 1.0);     // bleu
            vec3 c5 = vec3(0.0, 0.0, 0.0);     // noir

            // Interpolation smooth
            vec3 color = c1;
            color = mix(color, c2, smoothstep(0.0, 0.3, heat));
            color = mix(color, c3, smoothstep(0.35, 0.48, heat));
            color = mix(color, c4, smoothstep(0.5, 0.85, heat));
            color = mix(color, c5, smoothstep(0.8, 1.0, heat));

            // Grain
            float grain = noise(vUv * 400.0 + uTime * 0.5) * 0.10;
            color += grain;

            // Masque du blob animé
            float mask = smoothstep(blobRadius, blobRadius - 0.03, baseRadius);
            gl_FragColor = vec4(color, mask * 0.9);
          }
        `}
        transparent
      />
    </mesh>
  );
}

export default function AnimatedHeatmapLogo(props: {
  size?: number; // Taille en pixels (optionnelle)
  style?: React.CSSProperties;
}) {
  const { size = 72, style } = props;
  return (
    <div style={{ width: size, height: size, ...style }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Blob />
      </Canvas>
    </div>
  );
}
