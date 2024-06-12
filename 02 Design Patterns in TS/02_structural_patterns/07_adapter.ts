export {};
//* Adapter Design Pattern
// Sometimes classes have been written, and you don't have the option of modifying their interface to suit your needs. This happens if the method you are calling is on a different system across a network, a library that you may import or generally something that is not viable to modify directly for your particular needs.

// Adapter Concept Sample Code

interface IA {
  methodA(): void;
}

class ClassA implements IA {
  methodA() {
    console.log("method A");
  }
}

interface IB {
  methodB(): void;
}

class ClassB implements IB {
  methodB() {
    console.log("method B");
  }
}

class ClassBAdapter implements IA {
  // ClassB does not have a methodA, so we can create an adapter

  #classB: ClassB;

  constructor() {
    this.#classB = new ClassB();
  }

  methodA() {
    "calls the class b method_b instead";
    this.#classB.methodB();
  }
}

// The Client
// Before the adapter I need to test the objects class to know which
// method to call.
const ITEMS = [new ClassA(), new ClassB()];
ITEMS.forEach((item) => {
  if (item instanceof ClassB) {
    item.methodB();
  } else {
    item.methodA();
  }
});

// After creating an adapter for ClassB I can reuse the same method
// signature as ClassA (preferred)
const ADAPTED = [new ClassA(), new ClassBAdapter()];
ADAPTED.forEach((item) => {
  item.methodA();
});

//* Adapter Example Use Case
interface ICubeB {
  create(top_left_front: [number, number, number], bottom_right_back: [number, number, number]): boolean;
}

class CubeB implements ICubeB {
  static last_time = Date.now();

  create(top_left_front: [number, number, number], bottom_right_back: [number, number, number]): boolean {
    // if not busy, then manufacture a cube with coords
    const now = Date.now();
    if (now > CubeB.last_time + 3000) {
      console.log(
        `Company B built Cube with coords [${top_left_front[0]},${top_left_front[1]},${top_left_front[2]}],[${bottom_right_back[0]},${bottom_right_back[1]},${bottom_right_back[2]}]`
      );

      CubeB.last_time = now;
      return true;
    } else {
      return false; // busy
    }
  }
}

interface ICubeA {
  manufacture(width: number, height: number, depth: number): boolean;
}

class CubeA implements ICubeA {
  static last_time = Date.now();

  manufacture(width: number, height: number, depth: number): boolean {
    // if not busy, then manufacture a cube with dimensions
    const now = Date.now();
    if (now > CubeA.last_time + 1500) {
      console.log(`Company A built Cube with dimensions ${width}x${height}x${depth}`);
      CubeA.last_time = now;
      return true;
    }
    return false; // busy
  }
}

class CubeBAdapter implements ICubeA {
  #cube: CubeB;

  constructor() {
    this.#cube = new CubeB();
  }

  manufacture(width: number, height: number, depth: number): boolean {
    const success = this.#cube.create(
      [0 - width / 2, 0 - height / 2, 0 - depth / 2],
      [0 + width / 2, 0 + height / 2, 0 + depth / 2]
    );
    return success;
  }
}

const totalCubes = 5;
let counter = 0;

const manufactureCube = () => {
  // produce 5 cubes from which ever supplier can manufacture it first
  const width = Math.floor(Math.random() * 10) + 1;
  const height = Math.floor(Math.random() * 10) + 1;
  const depth = Math.floor(Math.random() * 10) + 1;
  let cube = new CubeA();
  let success = cube.manufacture(width, height, depth);
  if (success) {
    counter = counter + 1;
  } else {
    // try other manufacturer
    console.log("Company A was busy, so trying company B");
    cube = new CubeBAdapter();
    success = cube.manufacture(width, height, depth);
    if (success) {
      counter = counter + 1;
    } else {
      console.log("Company B was busy, so trying company A");
    }
  }
};

// wait some time between manufacturing each cube
const interval = setInterval(() => {
  manufactureCube();
  if (counter >= totalCubes) {
    clearInterval(interval);
    console.log(`${totalCubes} cubes have been manufactured`);
  }
}, 1000);
