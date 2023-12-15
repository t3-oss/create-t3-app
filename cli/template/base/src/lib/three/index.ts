import * as THREE from 'three'

import { CURVE_DIVISIONS_PER_UNIT } from './constants'

export type Curve = {
  id: number
  px: number
  py: number
  pz: number
  hlx: number
  hly: number
  hlz: number
  hrx: number
  hry: number
  hrz: number
}

export const getBezierCurves = (
  curve: Curve[],
  mat: THREE.Matrix4 = new THREE.Matrix4(),
  invert = false
) => {
  const beziers: THREE.CubicBezierCurve3[] = []

  for (let i = 0; i < curve.length; i += 1) {
    const p1 = curve[i]!
    const p2 = curve[i + 1]

    if (!p2) break

    if (!invert) {
      beziers.push(
        new THREE.CubicBezierCurve3(
          new THREE.Vector3(p1.px, p1.pz, p1.py).applyMatrix4(mat),
          new THREE.Vector3(p1.hrx, p1.hrz, p1.hry).applyMatrix4(mat),
          new THREE.Vector3(p2.hlx, p2.hlz, p2.hly).applyMatrix4(mat),
          new THREE.Vector3(p2.px, p2.pz, p2.py).applyMatrix4(mat)
        )
      )
    } else {
      beziers.push(
        new THREE.CubicBezierCurve3(
          new THREE.Vector3(p1.px, p1.pz, p1.py).applyMatrix4(mat),
          new THREE.Vector3(p1.hlx, p1.hlz, p1.hly).applyMatrix4(mat),
          new THREE.Vector3(p2.hrx, p2.hrz, p2.hry).applyMatrix4(mat),
          new THREE.Vector3(p2.px, p2.pz, p2.py).applyMatrix4(mat)
        )
      )
    }
  }

  return beziers
}

export const disableSceneMipmaps = (scene: THREE.Scene | THREE.Group) => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.map?.generateMipmaps
        ? (child.material.map.generateMipmaps = false)
        : null
      child.material.map?.minFilter
        ? (child.material.map.minFilter = THREE.NearestFilter)
        : null
      child.material.map?.magFilter
        ? (child.material.map.magFilter = THREE.NearestFilter)
        : null
    }
  })
}

export const disableMipmaps = (materials: Record<string, THREE.Material>) => {
  Object.keys(materials).forEach((key) => {
    const material = materials[key]!

    if (material instanceof THREE.MeshBasicMaterial) {
      material.map?.generateMipmaps
        ? (material.map.generateMipmaps = false)
        : null
      material.map?.minFilter
        ? (material.map.minFilter = THREE.NearestFilter)
        : null
      material.map?.magFilter
        ? (material.map.magFilter = THREE.NearestFilter)
        : null
    }
  })
}

export const modulo = (n: number, m: number) => {
  return ((n % m) + m) % m
}

export const getClosestPointInCurvePath = (
  curvePath: THREE.CurvePath<THREE.Vector3>,
  point: THREE.Vector3
) => {
  const divisions = curvePath.getLength() * CURVE_DIVISIONS_PER_UNIT
  const points = curvePath.getSpacedPoints(divisions)
  let closestPoint = points[0]
  let closestDistance = closestPoint!.distanceTo(point)
  let closestT = 0

  for (let i = 1; i < points.length; i += 1) {
    const distance = points[i]?.distanceTo(point)

    if (!distance) {
      continue
    }

    if (distance < closestDistance) {
      closestDistance = distance
      closestPoint = points[i]
      closestT = i / divisions
    }
  }

  return { point: closestPoint, t: closestT }
}

export const replaceAllMaterialsWith = (
  newMaterial: THREE.Material,
  materials: Record<string, THREE.Material>
) => {
  Object.keys(materials).forEach((key) => {
    materials[key]?.dispose()
    materials[key] = newMaterial
  })
}

export const replaceAllWithBasicMaterial = (
  materials: Record<string, THREE.Material>
) => {
  Object.keys(materials).forEach((key) => {
    const newMaterial = new THREE.MeshBasicMaterial()

    newMaterial.copy(materials[key]!)

    materials[key]?.dispose()
    materials[key] = newMaterial
  })
}
