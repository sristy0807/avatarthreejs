import * as THREE from "three";
import * as CANNON from "cannon";

class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfd1ef);

    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.81, 0);

    this.addLights();
    this.addGround();
  }

  addLights() {
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2, 2, 5);
    this.scene.add(light);
  }

  addGround() {
    const geometry = new THREE.BoxGeometry(3, 0.2, 3);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, 0, 0);
    this.scene.add(ground);

    const groundShape = new CANNON.Box(new CANNON.Vec3(3, 0.2, 3));
    const groundBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -1, 0),
    });
    groundBody.addShape(groundShape);
    this.world.addBody(groundBody);
  }

  getScene() {
    return this.scene;
  }

  getWorld() {
    return this.world;
  }
}

export default SceneManager;
