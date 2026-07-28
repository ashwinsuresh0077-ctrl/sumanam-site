import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 *  MEP · BIM building — a procedural high-rise showing the mechanical,
 *  electrical & plumbing services threading through a glass tower, with
 *  a cyan BIM wireframe overlay. Everything is generated in code so no
 *  external GLB asset is required.
 * ------------------------------------------------------------------ */

const FLOORS = 9
const FLOOR_H = 0.62
const W = 3 // footprint width
const D = 3 // footprint depth

/* A single glazed floor: slab + tinted glass volume + edge wireframe */
function Floor({ y }) {
  const glass = useMemo(() => new THREE.BoxGeometry(W, FLOOR_H * 0.82, D), [])
  const slab = useMemo(() => new THREE.BoxGeometry(W + 0.12, 0.08, D + 0.12), [])
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W, FLOOR_H, D)), [])

  return (
    <group position={[0, y, 0]}>
      {/* concrete slab */}
      <mesh geometry={slab} position={[0, -FLOOR_H / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#25344f" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* glass curtain wall */}
      <mesh geometry={glass}>
        <meshPhysicalMaterial
          color="#0e2748"
          transparent
          opacity={0.32}
          roughness={0.08}
          metalness={0.2}
          transmission={0.6}
          thickness={0.5}
          ior={1.3}
          emissive="#0b2f63"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* structural wireframe */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#4d9fff" transparent opacity={0.55} />
      </lineSegments>
    </group>
  )
}

/* Vertical curtain-wall mullions for a glassy skyscraper look */
function Mullions() {
  const bars = useMemo(() => {
    const arr = []
    const total = FLOORS * FLOOR_H
    const cols = 6
    for (let i = 0; i <= cols; i++) {
      const x = -W / 2 + (i / cols) * W
      arr.push({ pos: [x, total / 2 - FLOOR_H / 2, D / 2 + 0.01], h: total })
      arr.push({ pos: [x, total / 2 - FLOOR_H / 2, -D / 2 - 0.01], h: total })
    }
    for (let i = 0; i <= cols; i++) {
      const z = -D / 2 + (i / cols) * D
      arr.push({ pos: [W / 2 + 0.01, total / 2 - FLOOR_H / 2, z], h: total })
      arr.push({ pos: [-W / 2 - 0.01, total / 2 - FLOOR_H / 2, z], h: total })
    }
    return arr
  }, [])

  const geo = useMemo(() => new THREE.BoxGeometry(0.03, 1, 0.03), [])

  return (
    <group>
      {bars.map((b, i) => (
        <mesh key={i} geometry={geo} position={b.pos} scale={[1, b.h, 1]}>
          <meshStandardMaterial color="#6da8e6" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* Rooftop mechanical plant: AHUs, cooling towers, spire */
function Rooftop({ y }) {
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const cyl = useMemo(() => new THREE.CylinderGeometry(0.28, 0.28, 0.5, 20), [])

  return (
    <group position={[0, y, 0]}>
      {/* roof deck */}
      <mesh geometry={box} scale={[W + 0.05, 0.12, D + 0.05]} castShadow>
        <meshStandardMaterial color="#1c2a42" metalness={0.4} roughness={0.7} />
      </mesh>

      {/* two air-handling units */}
      {[
        [-0.7, 0.15],
        [0.75, -0.4],
      ].map((p, i) => (
        <mesh key={i} geometry={box} position={[p[0], 0.34, p[1]]} scale={[0.9, 0.5, 0.7]} castShadow>
          <meshStandardMaterial color="#7f8fa6" metalness={0.85} roughness={0.35} />
        </mesh>
      ))}

      {/* cooling towers */}
      {[
        [0.2, 0.7],
        [-0.5, -0.7],
      ].map((p, i) => (
        <mesh key={i} geometry={cyl} position={[p[0], 0.34, p[1]]} castShadow>
          <meshStandardMaterial color="#8ea3bd" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}

      {/* rooftop neon spire */}
      <mesh position={[0.9, 0.7, 0.9]} geometry={box} scale={[0.04, 1.2, 0.04]}>
        <meshStandardMaterial color="#38e5ff" emissive="#38e5ff" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

/* An animated MEP riser — a vertical pipe with an energy pulse flowing up it */
function Riser({ x, z, color, radius = 0.05, phase = 0, emissive }) {
  const pulse = useRef()
  const total = FLOORS * FLOOR_H
  const cyl = useMemo(() => new THREE.CylinderGeometry(radius, radius, total, 14), [radius, total])
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(radius * 2.1, 12, 12), [radius])

  useFrame((state) => {
    if (!pulse.current) return
    const t = (state.clock.elapsedTime * 0.6 + phase) % 1
    pulse.current.position.y = -total / 2 + t * total
    pulse.current.material.opacity = Math.sin(t * Math.PI)
  })

  return (
    <group position={[x, total / 2 - FLOOR_H / 2, z]}>
      <mesh geometry={cyl}>
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={emissive || color}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={pulse} geometry={pulseGeo}>
        <meshBasicMaterial color={emissive || color} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

/* Horizontal duct runs threading across a couple of floors */
function DuctRun({ y, color }) {
  const duct = useMemo(() => new THREE.BoxGeometry(W * 0.9, 0.14, 0.14), [])
  const duct2 = useMemo(() => new THREE.BoxGeometry(0.14, 0.14, D * 0.7), [])
  return (
    <group position={[0, y, 0]}>
      <mesh geometry={duct} position={[0, 0, 0.6]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.35} emissive={color} emissiveIntensity={0.15} />
      </mesh>
      <mesh geometry={duct2} position={[0.7, 0, 0.25]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.35} emissive={color} emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

/* The full BIM wireframe cage that surrounds the massing */
function WireCage() {
  const total = FLOORS * FLOOR_H
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(W + 0.28, total + 0.3, D + 0.28)),
    [total],
  )
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.material.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 1.5) * 0.12
  })
  return (
    <lineSegments ref={ref} geometry={edges} position={[0, total / 2 - FLOOR_H / 2, 0]}>
      <lineBasicMaterial color="#38e5ff" transparent opacity={0.3} />
    </lineSegments>
  )
}

function Building() {
  const group = useRef()
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  const floors = useMemo(() => Array.from({ length: FLOORS }, (_, i) => i * FLOOR_H), [])
  const roofY = FLOORS * FLOOR_H - FLOOR_H / 2 + 0.06

  const colGeo = useMemo(() => new THREE.BoxGeometry(0.12, FLOORS * FLOOR_H, 0.12), [])
  const cornerX = W / 2 - 0.06
  const cornerZ = D / 2 - 0.06

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      {/* structural columns */}
      {[
        [cornerX, cornerZ],
        [-cornerX, cornerZ],
        [cornerX, -cornerZ],
        [-cornerX, -cornerZ],
      ].map((c, i) => (
        <mesh key={i} geometry={colGeo} position={[c[0], (FLOORS * FLOOR_H) / 2 - FLOOR_H / 2, c[1]]} castShadow>
          <meshStandardMaterial color="#33456a" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}

      {floors.map((y, i) => (
        <Floor key={i} y={y} />
      ))}

      <Mullions />
      <Rooftop y={roofY} />
      <WireCage />

      {/* MEP service risers — colour coded like the legend */}
      <Riser x={0.55} z={0.55} color="#2f7dff" emissive="#4d9fff" phase={0} />
      <Riser x={-0.6} z={0.5} color="#38e5ff" emissive="#38e5ff" phase={0.3} />
      <Riser x={0.6} z={-0.55} color="#ff4d4d" emissive="#ff6b6b" phase={0.6} radius={0.045} />
      <Riser x={-0.55} z={-0.6} color="#7CFC00" emissive="#9dff4d" phase={0.15} radius={0.04} />
      <Riser x={0} z={0.7} color="#ffb020" emissive="#ffc857" phase={0.85} radius={0.04} />

      {/* horizontal duct runs */}
      <DuctRun y={2.1} color="#2f7dff" />
      <DuctRun y={4.0} color="#38e5ff" />
      <DuctRun y={5.4} color="#ff4d4d" />
    </group>
  )
}

/* Slowly drifting data motes around the tower */
function Particles() {
  const points = useRef()
  const count = 180
  const positions = useMemo(() => {
    // deterministic pseudo-random so the field is stable across renders
    const rand = (n) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
      return x - Math.floor(x)
    }
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand(i) - 0.5) * 12
      pos[i * 3 + 1] = rand(i + 0.3) * 9 - 2
      pos[i * 3 + 2] = (rand(i + 0.7) - 0.5) * 12
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.03
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#38e5ff" size={0.035} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [6.5, 3.5, 7.5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#050a16']} />
      <fog attach="fog" args={['#050a16', 12, 26]} />

      <ambientLight intensity={0.6} color="#7fb2ff" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-6, 3, -4]} intensity={2.4} color="#2f7dff" distance={20} />
      <pointLight position={[4, 1, 5]} intensity={1.6} color="#38e5ff" distance={18} />
      <spotLight position={[0, 12, 0]} angle={0.6} penumbra={1} intensity={1.4} color="#8ecbff" />

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <Building />
      </Float>

      <Particles />

      <ContactShadows
        position={[0, -1.68, 0]}
        opacity={0.55}
        scale={16}
        blur={2.6}
        far={6}
        color="#010912"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}
