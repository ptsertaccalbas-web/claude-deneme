import { PerspectiveCamera, Vector3 } from "three"

const _pos = new Vector3()

export type CameraRigConfig = {
  distance?: number
  lookAt?: [number, number, number]
  damping?: number
}

export function createCameraRig(
  camera: PerspectiveCamera,
  { distance = 6, lookAt = [0, 0, 0], damping = 0.08 }: CameraRigConfig = {}
) {
  const target = { z: distance }
  const current = { z: distance }
  const origin = new Vector3(...lookAt)

  return {
    update(scrollProgress: number) {
      target.z = distance - scrollProgress * (distance * 1.5)
      current.z += (target.z - current.z) * damping
      camera.position.set(0, 0, current.z)
      camera.lookAt(origin)
    },
    reset() {
      current.z = distance
      target.z = distance
    },
  }
}
