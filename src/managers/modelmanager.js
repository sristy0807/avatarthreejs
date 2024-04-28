import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as CANNON from "cannon";

class ModelManager {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.loader = new GLTFLoader();
    this.model = null;
    this.mixer = null;
    this.animationsMap = new Map();
    this.physicsBody = null;
  }

  loadModel(url, callback) {
    this.loader.load(
      url,
      (gltf) => {
        this.model = gltf.scene;
        this.model.position.set(0, 3, 0);
        this.model.scale.set(1, 1, 1);
        this.scene.add(this.model);

        const modelShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        const modelBody = new CANNON.Body({
          mass: 100,
          shape: modelShape,
        });
        modelBody.position.set(0, 3, 0);
        this.world.addBody(modelBody);
        this.physicsBody = modelBody;

        this.mixer = new THREE.AnimationMixer(this.model);
        gltf.animations.forEach((anim) => {
          if (anim.name !== "TPose") {
            this.animationsMap.set(anim.name, this.mixer.clipAction(anim));
          }
        });
        if (callback) callback(this.model, this.animationsMap);
      },
      undefined,
      (error) => console.error(error)
    );
  }
}

export default ModelManager;
