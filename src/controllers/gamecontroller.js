import * as THREE from "three";

import * as CANNON from "cannon";

import SceneManager from "../managers/scenemanager";
import ModelManager from "../managers/modelmanager";
import InputManager from "../managers/inputmanager";
import AnimationManager from "../managers/animationmanager";
import CameraController from "./cameracoltroller";

class GameController {
  constructor() {
    this.sceneManager = new SceneManager();
    this.modelManager = new ModelManager(
      this.sceneManager.getScene(),
      this.sceneManager.getWorld()
    );
    this.inputManager = new InputManager();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1, 3);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.animationManager = null;
    this.cameraController = null;

    this.modelManager.loadModel(
      "assets/Soldier.glb",
      (model, animationsMap) => {
        this.animationManager = new AnimationManager(this.modelManager.mixer);
        this.cameraController = new CameraController(this.camera, model);
        this.start();
      }
    );
  }

  updateMovement(delta) {
    if (!this.modelManager.model) return;
    let direction = new THREE.Vector3();
    let speed = this.inputManager.keys.shift ? 0.2 : 0.1;
    if (this.inputManager.keys.w) direction.z -= 10;
    if (this.inputManager.keys.s) direction.z += 10;
    if (this.inputManager.keys.a) direction.x -= 10;
    if (this.inputManager.keys.d) direction.x += 10;
    direction.applyQuaternion(this.camera.quaternion);
    direction.y = 0;
    this.modelManager.model.position.addScaledVector(direction, speed * delta);
    if (direction.lengthSq() > 0) {
      this.modelManager.model.rotation.y = Math.atan2(
        -direction.x,
        -direction.z
      );
    }
    let animName = this.inputManager.keys.shift ? "Run" : "Walk";
    if (direction.lengthSq() > 0) {
      this.animationManager.playAnimation(
        animName,
        this.modelManager.animationsMap
      );
    } else {
      this.animationManager.playAnimation(
        "Idle",
        this.modelManager.animationsMap
      );
    }
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta();
      this.sceneManager.getWorld().step(delta);
      if (this.modelManager.model && this.modelManager.physicsBody) {
        this.modelManager.model.position.copy(
          this.modelManager.physicsBody.position
        );
        this.modelManager.model.quaternion.copy(
          this.modelManager.physicsBody.quaternion
        );
      }

      this.updateModelPhysics();

      if (this.modelManager.mixer) this.modelManager.mixer.update(delta);
      this.updateMovement(delta);
      this.cameraController.update();
      this.renderer.render(this.sceneManager.getScene(), this.camera);
    });
  }

  updateModelPhysics() {
    if (this.modelManager.model && this.modelManager.physicsBody) {
      this.modelManager.model.position.copy(
        this.modelManager.physicsBody.position
      );
      this.modelManager.model.quaternion.copy(
        this.modelManager.physicsBody.quaternion
      );
    }
  }
}

export default GameController;
