class AnimationManager {
  constructor(mixer) {
    this.mixer = mixer;
    this.currentAction = null;
  }

  playAnimation(name, animationsMap) {
    const action = animationsMap.get(name);
    if (this.currentAction) {
      this.currentAction.fadeOut(0.5);
    }
    if (action && this.currentAction !== action) {
      action.reset().fadeIn(0.5).play();
      this.currentAction = action;
    }
  }
}

export default AnimationManager;
