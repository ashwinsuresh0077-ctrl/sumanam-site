import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function GlassTower() {
  const group = useRef()

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.12
  })

  const floors = useMemo(() => {
    const arr = []
    const count = 10
    for (let i = 0; i < count; i++) {
      const w = 1.6 - i * 0.04 + Math.sin(i * 0.7) * 0.05
      arr.push({
        y: i * 0.42 - 2,
        w,
        d: w * 0.8,
        h: 0.38,
      })
    }
    return arr
  }, [])

  return (
    <group ref={group}>
      {floors.map((f, i) => (
        <group key={i} position={[0, f.y, 0]}>
          <mesh>
            <boxGeometry args={[f.w, f.h, f.d]} />
            <meshStandardMaterial
              color="#c9a14a"
              transparent
              opacity={0.22}
              roughness={0.25}
              metalness={0.6}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(f.w, f.h, f.d)]} />
            <lineBasicMaterial color="#e3c878" transparent opacity={0.5} />
          </lineSegments>
        </group>
      ))}
    </group>
  )
}

function Particles() {
  const points = useRef()
  const count = 250

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    points.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#c9a14a" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [4, 1.5, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-5, 2, -5]} intensity={0.8} color="#c9a14a" />
      <pointLight position={[3, -3, 4]} intensity={0.4} color="#ffffff" />
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
        <GlassTower />
      </Float>
      <Particles />
    </Canvas>
  )
}
