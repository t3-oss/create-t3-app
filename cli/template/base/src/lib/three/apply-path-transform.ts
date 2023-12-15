import { Camera, CurvePath, Group, Object3D, Vector3 } from 'three'

export interface ApplyPathTransformParams {
  /** The object to transform */
  object: Camera | Object3D | Group
  /** Progress from 0 to 1 */
  progress: number
  /** If true, the object will move along the path */
  positionPath?: CurvePath<Vector3>
  /** If true, the object will look at the path */
  lookAtPath?: CurvePath<Vector3>
  /** If true, the object will rotate to follow the path tangent */
  followTanget?: boolean
  /** -1 or 1, use it to modify the direction of the rotation */
  tangentDirection?: number
}

export const applyPathTransform = ({
  object,
  progress,
  positionPath,
  lookAtPath,
  tangentDirection = 1,
  followTanget
}: ApplyPathTransformParams) => {
  if (positionPath) {
    const point = positionPath.getPointAt(progress)

    object.position.set(point.x, point.y, point.z)

    if (followTanget) {
      const tangent = positionPath
        .getTangentAt(progress)
        .multiplyScalar(tangentDirection)
      object.rotation.y = Math.atan2(tangent.x, tangent.z)
    }
  }
  if (lookAtPath) {
    const lookAtPoint = lookAtPath.getPointAt(progress)
    object.lookAt(lookAtPoint)
  }
}
