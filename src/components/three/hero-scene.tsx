'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Mesh } from 'three'
import { Color, IcosahedronGeometry, MeshStandardMaterial } from 'three'

function ShieldMesh() {
  const ref = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.18
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
  })
  const geometry = useMemo(() => new IcosahedronGeometry(1.2, 1), [])
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color('#E86B4B'),
        metalness: 0.35,
        roughness: 0.28,
        flatShading: true,
      }),
    []
  )
  return <mesh ref={ref} geometry={geometry} material={material} castShadow />
}

function HelmetRing() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.25
  })
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[1.8, 0.04, 16, 100]} />
      <meshStandardMaterial color="#E8960A" metalness={0.6} roughness={0.25} />
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
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} color="#FBE5D1" />
        <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#E8960A" />
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
          <ShieldMesh />
        </Float>
        <HelmetRing />
        <Sparkles
          count={45}
          scale={[6, 4, 4]}
          size={2.5}
          speed={0.4}
          color="#FBE5D1"
          opacity={0.7}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}
