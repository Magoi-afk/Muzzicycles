if (!globalThis.DOMException) {
  globalThis.DOMException = class DOMException extends Error {
    constructor(message, name = "Error") {
      super(message);
      this.name = name;
    }
  };
}

module.exports = globalThis.DOMException;
