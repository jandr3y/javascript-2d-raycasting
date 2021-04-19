class InputEvents {
  constructor(canvas) {
    window.addEventListener('keydown', e => this.handleKeyboard(e));
    window.addEventListener('keyup', e => this.handleKeyboard(e, true));

    this.keyboardMapping = this.resetKeyboardMapping();
  }

  resetKeyboardMapping() {
    return {
      left: false,
      right: false,
      up: false,
      down: false
    }
  }

  handleKeyboard(e, keyup = false) {
    if ( e.key == 'ArrowLeft' || e.key == 'a' ) {
      this.keyboardMapping.left = keyup ? false : true;
    }

    if ( e.key == 'ArrowRight' || e.key == 'd' ) {
      this.keyboardMapping.right = keyup ? false : true;
    }

    if ( e.key == 'ArrowDown' || e.key == 's' ) {
      this.keyboardMapping.down = keyup ? false : true;
    }

    if ( e.key == 'ArrowUp' || e.key == 'w' ) {
      this.keyboardMapping.up = keyup ? false : true;
    }
  }

}