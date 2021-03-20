export default class InputManager {
  constructor() {
    this.commands = new Map();
    this.keys = new Map();
  }

  configKeyboard(actions) {
    for (const key in actions) {
      const command = actions[key];
      this.commands.set(command, false);
      this.keys.set(key, command);
    }

    const that = this;
    addEventListener("keydown", function (evt) {
      const command = that.keys.get(evt.key);
      if (command) {
        that.commands.set(command, true);
      }
    });
    addEventListener("keyup", function (evt) {
      const command = that.keys.get(evt.key);
      if (command) {
        that.commands.set(command, false);
      }
    });
  }
}
