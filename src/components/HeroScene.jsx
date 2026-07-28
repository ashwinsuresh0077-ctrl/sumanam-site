import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 *  MEP · BIM cutaway tower — a detailed procedural high-rise showing a
 *  glass office block with lit interior floors and the exposed
 *  mechanical / electrical / plumbing services (ducts + colour-coded
 *  pipe runs) threading up and around it, sitting on a blueprint plaza
 *  with landscaping and a night skyline behind. Generated fully in code.
 * ------------------------------------------------------------------ */

const FLOORS = 8
const FLOOR_H = 0.72
const W = 3.6 // footprint width
const D = 3.6 // footprint depth
const TOTAL = FLOORS * FLOOR_H

// deterministic pseudo-random (keeps render pure for the lint rule)
const rand = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/* One office floor: structural slab, warm-lit interior plate, glass shell */
function Floor({ y, index }) {
  const slab = useMemo(() => new THREE.BoxGeometry(W + 0.16, 0.1, D + 0.16), [])
  const interior = useMemo(() => new THREE.BoxGeometry(W * 0.92, FLOOR_H * 0.62, D * 0.92), [])
  const glass = useMemo(() => new THREE.BoxGeometry(W, FLOOR_H * 0.9, D), [])
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W, FLOOR_H, D)), [])

  // vary the warm interior brightness per floor so windows look occupied
  const warm = 0.5 + rand(index * 3.3) * 1.3

  return (
    <group position={[0, y, 0]}>
      <mesh geometry={slab} position={[0, -FLOOR_H / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2a3a58" metalness={0.4} roughness={0.7} />
      </mesh>
      {/* warm lit interior seen through the glass */}
      <mesh geometry={interior}>
        <meshStandardMaterial color="#3a3320" emissive="#ffc879" emissiveIntensity={warm} />
      </mesh>
      {/* glazed curtain wall */}
      <mesh geometry={glass}>
        <meshPhysicalMaterial
          color="#122a4d"
          transparent
          opacity={0.3}
          roughness={0.06}
          metalness={0.25}
          transmission={0.55}
          thickness={0.6}
          ior={1.35}
          emissive="#123a72"
          emissiveIntensity={0.18}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#5aa6ff" transparent opacity={0.5} />
      </lineSegments>
    </group>
  )
}

/* Curtain-wall mullions on all four faces */
function Mullions() {
  const bars = useMemo(() => {
    const arr = []
    const cols = 7
    const cy = TOTAL / 2 - FLOOR_H / 2
    for (let i = 0; i <= cols; i++) {
      const x = -W / 2 + (i / cols) * W
      arr.push([x, cy, D / 2 + 0.02])
      arr.push([x, cy, -D / 2 - 0.02])
      const z = -D / 2 + (i / cols) * D
      arr.push([W / 2 + 0.02, cy, z])
      arr.push([-W / 2 - 0.02, cy, z])
    }
    return arr
  }, [])
  const geo = useMemo(() => new THREE.BoxGeometry(0.035, TOTAL, 0.035), [])
  return (
    <group>
      {bars.map((p, i) => (
        <mesh key={i} geometry={geo} position={p}>
          <meshStandardMaterial color="#7fb0e6" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* A rectangular sheet-metal HVAC duct */
function Duct({ position, size, color = '#8fa3bd' }) {
  const [sx, sy, sz] = size
  const geo = useMemo(() => new THREE.BoxGeometry(sx, sy, sz), [sx, sy, sz])
  return (
    <mesh position={position} geometry={geo} castShadow>
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.32} />
    </mesh>
  )
}

/* An L-shaped service pipe: a vertical run that elbows into a horizontal run */
function ElbowPipe({ base, up, over, radius, color, emissive, axis = 'x', phase = 0 }) {
  const pulse = useRef()
  const vert = useMemo(() => new THREE.CylinderGeometry(radius, radius, up, 12), [radius, up])
  const horiz = useMemo(() => new THREE.CylinderGeometry(radius, radius, over, 12), [radius, over])
  const joint = useMemo(() => new THREE.SphereGeometry(radius * 1.25, 12, 12), [radius])
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(radius * 1.9, 10, 10), [radius])
  const mat = (
    <meshStandardMaterial color={color} metalness={0.5} roughness={0.28} emissive={emissive || color} emissiveIntensity={0.85} />
  )
  const overDir = axis === 'x' ? [over / 2, 0, 0] : [0, 0, over / 2]
  const overRot = axis === 'x' ? [0, 0, Math.PI / 2] : [Math.PI / 2, 0, 0]

  useFrame((state) => {
    if (!pulse.current) return
    const t = (state.clock.elapsedTime * 0.5 + phase) % 1
    pulse.current.position.set(0, -up / 2 + t * up, 0)
    pulse.current.material.opacity = Math.sin(t * Math.PI)
  })

  return (
    <group position={base}>
      <mesh geometry={vert} position={[0, up / 2, 0]} castShadow>
        {mat}
      </mesh>
      <mesh geometry={joint} position={[0, up, 0]}>{mat}</mesh>
      <mesh geometry={horiz} position={[overDir[0], up + overDir[1], overDir[2]]} rotation={overRot} castShadow>
        {mat}
      </mesh>
      <mesh ref={pulse} geometry={pulseGeo}>
        <meshBasicMaterial color={emissive || color} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

/* The exposed MEP network wrapping the tower */
/* A straight vertical service pipe run with a flowing energy pulse */
function Pipe({ position, height, radius, color, emissive, phase = 0 }) {
  const pulse = useRef()
  const geo = useMemo(() => new THREE.CylinderGeometry(radius, radius, height, 12), [radius, height])
  const collar = useMemo(() => new THREE.CylinderGeometry(radius * 1.35, radius * 1.35, radius * 0.8, 12), [radius])
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(radius * 1.8, 10, 10), [radius])
  useFrame((state) => {
    if (!pulse.current) return
    const t = (state.clock.elapsedTime * 0.5 + phase) % 1
    pulse.current.position.y = position[1] - height / 2 + t * height
    pulse.current.material.opacity = Math.sin(t * Math.PI)
  })
  return (
    <group>
      <mesh geometry={geo} position={position} castShadow>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.28} emissive={emissive || color} emissiveIntensity={0.9} />
      </mesh>
      {/* pipe collars top & bottom */}
      <mesh geometry={collar} position={[position[0], position[1] + height / 2, position[2]]}>
        <meshStandardMaterial color="#c9d6e6" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh geometry={collar} position={[position[0], position[1] - height / 2, position[2]]}>
        <meshStandardMaterial color="#c9d6e6" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh ref={pulse} geometry={pulseGeo} position={[position[0], position[1], position[2]]}>
        <meshBasicMaterial color={emissive || color} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

// colour-coded services distributed around all four faces so the MEP
// network always reads no matter how the tower is rotated
const PIPES = (() => {
  const palette = [
    ['#2f7dff', '#5aa6ff'], // HVAC chilled supply (blue)
    ['#38e5ff', '#7ff0ff'], // chilled return (cyan)
    ['#ff4d4d', '#ff7a7a'], // fire (red)
    ['#7CFC00', '#a6ff5c'], // electrical (green)
    ['#ffb020', '#ffcf6b'], // gas / plumbing (amber)
  ]
  const out = []
  const faceOffset = 0.16
  let k = 0
  const push = (x, z) => {
    const [c, e] = palette[k % palette.length]
    out.push({
      pos: [x, TOTAL * 0.45, z],
      h: TOTAL * (0.62 + rand(k * 4.7) * 0.28),
      r: 0.06 + rand(k * 2.3) * 0.045,
      c,
      e,
      phase: rand(k * 9.1),
    })
    k++
  }
  // front (+z) and back (-z) faces
  for (const zc of [D / 2 + faceOffset, -D / 2 - faceOffset]) {
    for (let i = 1; i <= 3; i++) push(-W / 2 + (i / 4) * W, zc)
  }
  // right (+x) and left (-x) faces
  for (const xc of [W / 2 + faceOffset, -W / 2 - faceOffset]) {
    for (let i = 1; i <= 3; i++) push(xc, -D / 2 + (i / 4) * D)
  }
  return out
})()

function MEP() {
  return (
    <group>
      {/* large sheet-metal HVAC ducts standing off two corners */}
      <Duct position={[W / 2 + 0.28, TOTAL / 2, D / 2 + 0.28]} size={[0.36, TOTAL * 0.96, 0.36]} color="#aebdd2" />
      <Duct position={[-W / 2 - 0.3, TOTAL / 2, -D / 2 - 0.24]} size={[0.3, TOTAL * 0.9, 0.3]} color="#8b9db6" />

      {/* horizontal duct bands wrapping the tower on two faces */}
      <Duct position={[0, 1.55, D / 2 + 0.2]} size={[W * 0.98, 0.24, 0.24]} color="#aebdd2" />
      <Duct position={[W / 2 + 0.2, 3.7, 0]} size={[0.22, 0.22, D * 0.9]} color="#9fb0c8" />

      {/* colour-coded vertical service risers on every face */}
      {PIPES.map((p, i) => (
        <Pipe key={i} position={p.pos} height={p.h} radius={p.r} color={p.c} emissive={p.e} phase={p.phase} />
      ))}

      {/* a couple of elbowed risers feeding into the floors for depth */}
      <ElbowPipe base={[W / 2 + 0.16, 0, D / 2 - 0.6]} up={TOTAL * 0.8} over={0.9} radius={0.08} axis="x" color="#2f7dff" emissive="#5aa6ff" phase={0.0} />
      <ElbowPipe base={[-W / 2 - 0.16, 0, D / 2 - 1.2]} up={TOTAL * 0.66} over={0.9} radius={0.07} axis="x" color="#ff4d4d" emissive="#ff7a7a" phase={0.5} />
    </group>
  )
}

/* Rooftop mechanical plant */
function Rooftop() {
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const cyl = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.55, 20), [])
  const y = TOTAL - FLOOR_H / 2
  return (
    <group position={[0, y, 0]}>
      <mesh geometry={box} scale={[W + 0.08, 0.14, D + 0.08]} castShadow>
        <meshStandardMaterial color="#1f2e48" metalness={0.4} roughness={0.7} />
      </mesh>
      {[
        [-0.85, 0.2, 0.95, 0.62, 0.85],
        [0.9, -0.5, 1.0, 0.55, 0.8],
        [0.2, 0.9, 0.7, 0.45, 0.7],
      ].map((u, i) => (
        <mesh key={i} geometry={box} position={[u[0], 0.38, u[1]]} scale={[u[2], u[3], u[4]]} castShadow>
          <meshStandardMaterial color="#8697ad" metalness={0.85} roughness={0.35} />
        </mesh>
      ))}
      {[
        [-0.55, -0.85],
        [0.6, 0.55],
      ].map((p, i) => (
        <mesh key={i} geometry={cyl} position={[p[0], 0.4, p[1]]} castShadow>
          <meshStandardMaterial color="#9db2cc" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
      {/* connecting rooftop duct */}
      <mesh geometry={box} position={[0.1, 0.4, 0.05]} scale={[1.6, 0.16, 0.16]}>
        <meshStandardMaterial color="#8fa3bd" metalness={0.85} roughness={0.32} />
      </mesh>
      {/* neon spire */}
      <mesh position={[W / 2 - 0.2, 0.9, D / 2 - 0.2]} geometry={box} scale={[0.05, 1.3, 0.05]}>
        <meshStandardMaterial color="#38e5ff" emissive="#38e5ff" emissiveIntensity={2.4} />
      </mesh>
    </group>
  )
}

/* Corner structural columns */
function Columns() {
  const geo = useMemo(() => new THREE.BoxGeometry(0.14, TOTAL, 0.14), [])
  const cx = W / 2 - 0.07
  const cz = D / 2 - 0.07
  const cy = TOTAL / 2 - FLOOR_H / 2
  return (
    <group>
      {[
        [cx, cz],
        [-cx, cz],
        [cx, -cz],
        [-cx, -cz],
      ].map((c, i) => (
        <mesh key={i} geometry={geo} position={[c[0], cy, c[1]]} castShadow>
          <meshStandardMaterial color="#3a4d72" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/* Pulsing BIM wireframe cage around the massing */
function WireCage() {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(W + 0.6, TOTAL + 0.4, D + 0.6)),
    [],
  )
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.material.opacity = 0.18 + Math.sin(state.clock.elapsedTime * 1.4) * 0.1
  })
  return (
    <lineSegments ref={ref} geometry={edges} position={[0, TOTAL / 2 - FLOOR_H / 2, 0]}>
      <lineBasicMaterial color="#38e5ff" transparent opacity={0.22} />
    </lineSegments>
  )
}

/* Small landscaped trees around the plaza */
function Trees() {
  const trunk = useMemo(() => new THREE.CylinderGeometry(0.03, 0.04, 0.22, 6), [])
  const foliage = useMemo(() => new THREE.ConeGeometry(0.16, 0.4, 8), [])
  const spots = useMemo(() => {
    const arr = []
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + rand(i) * 0.4
      const r = 2.9 + rand(i * 2) * 1.1
      arr.push([Math.cos(a) * r, Math.sin(a) * r])
    }
    return arr
  }, [])
  return (
    <group position={[0, -FLOOR_H / 2 - 0.02, 0]}>
      {spots.map((p, i) => (
        <group key={i} position={[p[0], 0, p[1]]}>
          <mesh geometry={trunk} position={[0, 0.11, 0]}>
            <meshStandardMaterial color="#5a4633" roughness={0.9} />
          </mesh>
          <mesh geometry={foliage} position={[0, 0.42, 0]} castShadow>
            <meshStandardMaterial color="#1f5c3a" emissive="#0d3a22" emissiveIntensity={0.3} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* Distant night skyline silhouette */
function Skyline() {
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const towers = useMemo(() => {
    const arr = []
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2
      const r = 13 + rand(i) * 4
      const h = 2 + rand(i * 5) * 7
      arr.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, h, w: 0.8 + rand(i * 3) * 1.2 })
    }
    return arr
  }, [])
  return (
    <group position={[0, -FLOOR_H / 2, 0]}>
      {towers.map((t, i) => (
        <mesh key={i} geometry={box} position={[t.x, t.h / 2, t.z]} scale={[t.w, t.h, t.w]}>
          <meshStandardMaterial color="#0b1729" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

function Building() {
  const group = useRef()
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
  })
  const floors = useMemo(() => Array.from({ length: FLOORS }, (_, i) => i * FLOOR_H), [])
  return (
    <group ref={group} position={[0, -TOTAL / 2 + 0.4, 0]}>
      <Columns />
      {floors.map((y, i) => (
        <Floor key={i} y={y} index={i} />
      ))}
      <Mullions />
      <Rooftop />
      <MEP />
      <WireCage />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      shadows="percentage"
      camera={{ position: [11.5, 6.5, 12.5], fov: 34 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#050a16']} />
      <fog attach="fog" args={['#050a16', 16, 34]} />

      <hemisphereLight args={['#9fc4ff', '#0a1424', 0.7]} />
      <ambientLight intensity={0.35} color="#7fb2ff" />
      <directionalLight
        position={[7, 12, 6]}
        intensity={2.4}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <pointLight position={[-7, 3, -5]} intensity={2.6} color="#2f7dff" distance={26} />
      <pointLight position={[5, 1.5, 6]} intensity={1.8} color="#38e5ff" distance={22} />
      <spotLight position={[0, 14, 2]} angle={0.6} penumbra={1} intensity={1.6} color="#bcd8ff" />

      {/* blueprint plaza */}
      <group position={[0, -TOTAL / 2 + 0.34, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#07101f" metalness={0.2} roughness={0.9} />
        </mesh>
        <gridHelper args={[26, 40, '#2f7dff', '#16345f']} position={[0, 0.01, 0]} />
      </group>

      <Skyline />
      <Trees />

      <Float speed={0.9} rotationIntensity={0.06} floatIntensity={0.18}>
        <Building />
      </Float>

      <ContactShadows position={[0, -TOTAL / 2 + 0.36, 0]} opacity={0.6} scale={20} blur={2.4} far={8} color="#01060d" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        target={[0, 0.2, 0]}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  )
}
