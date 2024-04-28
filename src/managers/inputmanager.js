class InputManager {
  constructor() {
    this.keys = { w: false, a: false, s: false, d: false, shift: false };
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onKeyDown(event) {
    const key = event.key;
    if (key in this.keys) this.keys[key] = true;
  }

  onKeyUp(event) {
    const key = event.key;
    if (key in this.keys) this.keys[key] = false;
  }
}

export default InputManager;
