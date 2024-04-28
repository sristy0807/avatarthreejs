import { World, RigidBody, RigidBodyType, Collider } from "@dimforge/rapier3d";

class PhysicsManager {
  constructor() {
    this.world = new World({ gravity: { x: 0, y: -9.81, z: 0 } });
  }

  addGround() {
    const groundBody = this.world.createRigidBody(RigidBody.newStatic());
    const groundCollider = Collider.newPlane();
    this.world.createCollider(groundCollider, groundBody.handle);
  }

  createDynamicCollider(model) {
    const bodyDesc = RigidBody.newDynamic();
    const body = this.world.createRigidBody(bodyDesc);
    const shape = Collider.newBall(0.5);
    this.world.createCollider(shape, body.handle);

    body.setTranslation(
      model.position.x,
      model.position.y,
      model.position.z,
      true
    );

    return body;
  }

  update(deltaTime) {
    this.world.step();
  }
}

export default PhysicsManager;
