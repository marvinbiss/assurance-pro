'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group, Mesh, Points as PointsType } from 'three'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  EdgesGeometry,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Vector3,
} from 'three'

// ──────────────────────────────────────────────────────────────
// Dense particle field — reacts to camera / time
// ──────────────────────────────────────────────────────────────
function ParticleField({ count = 1800 }: { count?: number }) {
  const ref = useRef<PointsType>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#FBE5D1"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
        opacity={0.85}
      />
    </Points>
  )
}

// ──────────────────────────────────────────────────────────────
// Connected lines mesh (cyber-net look)
// ──────────────────────────────────────────────────────────────
function ConnectedNet({ count = 80 }: { count?: number }) {
  const groupRef = useRef<Group>(null)
  const { lineSegments, points } = useMemo(() => {
    const pts: Vector3[] = []
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pts.push(
        new Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      )
    }
    const positions: number[] = []
    const maxDist = 1.6
    for (let i = 0; i < pts.length; i++) {
      const pi = pts[i]
      if (!pi) continue
      for (let j = i + 1; j < pts.length; j++) {
        const pj = pts[j]
        if (!pj) continue
        if (pi.distanceTo(pj) < maxDist) {
          positions.push(pi.x, pi.y, pi.z, pj.x, pj.y, pj.z)
        }
      }
    }
    const posArr = new Float32Array(positions)
    const geom = new BufferGeometry()
    geom.setAttribute('position', new BufferAttribute(posArr, 3))
    const mat = new LineBasicMaterial({
      color: new Color('#E86B4B'),
      transparent: true,
      opacity: 0.35,
      blending: AdditiveBlending,
      depthWrite: false,
    })
    const seg = new LineSegments(geom, mat)
    return { lineSegments: seg, points: pts }
  }, [count])

  // Suppress unused warning while preserving structure for future per-node animation
  void points

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.18
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
  })

  return (
    <group ref={groupRef}>
      <primitive object={lineSegments} />
    </group>
  )
}

// ──────────────────────────────────────────────────────────────
// Wireframe shield core
// ──────────────────────────────────────────────────────────────
function WireShield() {
  const ref = useRef<Mesh>(null)
  const geometry = useMemo(() => {
    const ico = new IcosahedronGeometry(1.4, 1)
    return new EdgesGeometry(ico)
  }, [])

  useFrame((_state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.3
    ref.current.rotation.z += delta * 0.08
  })

  return (
    <lineSegments ref={ref as never} geometry={geometry}>
      <lineBasicMaterial color="#E8960A" transparent opacity={0.85} />
    </lineSegments>
  )
}

// ──────────────────────────────────────────────────────────────
// Solid inner core glowing
// ──────────────────────────────────────────────────────────────
function GlowCore() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06
    ref.current.scale.set(s, s, s)
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.7, 1]} />
      <meshBasicMaterial color="#E86B4B" transparent opacity={0.55} blending={AdditiveBlending} />
    </mesh>
  )
}

export interface HeroSceneProps {
  className?: string
}

export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div className={className ?? 'absolute inset-0 h-full w-full'} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#0f0e0c', 6, 14]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#E8960A" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#E86B4B" />

        <ParticleField count={1800} />
        <ConnectedNet count={70} />
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.4}>
          <WireShield />
          <GlowCore />
        </Float>
      </Canvas>
    </div>
  )
}
