import * as THREE from "three";

class CameraController {
  constructor(camera, target, offset = new THREE.Vector3(0, 2, 5)) {
    this.camera = camera;
    this.target = target;
    this.offset = offset;
  }

  update() {
    const targetPosition = this.target.getWorldPosition(new THREE.Vector3());
    this.camera.position.copy(targetPosition.add(this.offset));
    this.camera.lookAt(this.target.position);
  }
}

export default CameraController;
