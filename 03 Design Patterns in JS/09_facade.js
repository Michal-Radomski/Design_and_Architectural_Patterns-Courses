class Buffer extends Array {
  constructor(width = 30, height = 20) {
    super();
    this.width = width;
    this.height = height;
    // this.alloc(width * height); //* Pseudo code
  }

  write(_text, _position = 0) {
    // write to the buffer
  }
}

class Viewport {
  constructor(buffer = new Buffer()) {
    this.buffer = buffer;
    this.offset = 0;
  }

  // high-level
  append(text, pos) {
    this.buffer.write(text, pos + this.offset);
  }

  getCharAt(index) {
    return this.buffer[this.offset + index];
  }
}

class Console {
  constructor() {
    this.buffer = new Buffer();
    this.currentViewport = new Viewport(this.buffer);
    this.buffers = [this.buffer];
    this.viewports = [this.currentViewport];
  }

  // high-level
  write(text) {
    this.currentViewport.buffer.write(text);
  }

  // low-level
  getCharAt(index) {
    return this.currentViewport.getCharAt(index);
  }
}

const c = new Console();
c.write("hello");
const ch = c.getCharAt(0);
console.log({ ch });
