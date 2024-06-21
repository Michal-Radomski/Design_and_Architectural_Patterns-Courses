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

//* Exercise
class Generator {
  generate(count) {
    let result = [];
    for (let i = 0; i < count; ++i) result.push(Math.floor(Math.random() * 6 + 1));
    return result;
  }
}

class Splitter {
  split(array) {
    let result = [];

    let rowCount = array.length;
    let colCount = array[0].length;

    // get the rows
    for (let r = 0; r < rowCount; ++r) {
      let theRow = [];
      for (let c = 0; c < colCount; ++c) theRow.push(array[r][c]);
      result.push(theRow);
    }

    // get the columns
    for (let c = 0; c < colCount; ++c) {
      let theCol = [];
      for (let r = 0; r < rowCount; ++r) theCol.push(array[r][c]);
      result.push(theCol);
    }

    // now the diagonals
    let diag1 = [];
    let diag2 = [];
    for (let c = 0; c < colCount; ++c) {
      for (let r = 0; r < rowCount; ++r) {
        if (c === r) diag1.push(array[r][c]);
        let r2 = rowCount - r - 1;
        if (c === r2) diag2.push(array[r][c]);
      }
    }

    result.push(diag1);
    result.push(diag2);

    return result;
  }
}

class Verifier {
  verify(array) {
    if (array.length < 1) return false;
    let adder = function (p, c) {
      return p + c;
    };
    let expected = array[0].reduce(adder);
    let ok = true;
    array.forEach(function (subarray) {
      if (subarray.reduce(adder) !== expected) {
        ok = false;
      }
    });
    return ok;
  }
}

class MagicSquareGenerator {
  generate(size) {
    let g = new Generator();
    let s = new Splitter();
    let v = new Verifier();

    let square;

    do {
      square = [];
      for (let i = 0; i < size; ++i) square.push(g.generate(size));
    } while (!v.verify(s.split(square)));

    return square;
  }
}
