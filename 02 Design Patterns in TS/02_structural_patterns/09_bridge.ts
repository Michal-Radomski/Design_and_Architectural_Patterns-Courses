export {};
//* Bridge Design Pattern
// The Bridge pattern is similar to the Adapter except in the intent that you developed it.

interface IAbstraction {
  method(value: string[]): void;
}

class RefinedAbstractionA implements IAbstraction {
  #implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.#implementer = implementer;
  }

  method(value: string[]) {
    this.#implementer.method(value);
  }
}

class RefinedAbstractionB implements IAbstraction {
  #implementer: IImplementer;

  constructor(implementer: IImplementer) {
    this.#implementer = implementer;
  }

  method(value: string[]) {
    this.#implementer.method(value);
  }
}

interface IImplementer {
  method(value: string[]): void;
}

class ConcreteImplementerA implements IImplementer {
  method(value: string[]) {
    console.log(JSON.stringify(value));
  }
}

class ConcreteImplementerB implements IImplementer {
  method(value: string[]) {
    value.forEach((v) => console.log("v:", v));
  }
}

// The Client
const VALUES = ["a", "b", "c"];

const REFINED_ABSTRACTION_A = new RefinedAbstractionA(new ConcreteImplementerA());
REFINED_ABSTRACTION_A.method(VALUES);

const REFINED_ABSTRACTION_B = new RefinedAbstractionB(new ConcreteImplementerB());
REFINED_ABSTRACTION_B.method(VALUES);

//* Bridge Pattern use case
interface IShapeImplementor {
  drawImplementation(): void;
}

interface IShape {
  draw(): void;
}

interface IShapeImplementer {
  drawImplementation(): void;
}

class CircleImplementer implements IShapeImplementor {
  drawImplementation(): void {
    console.log("    ******");
    console.log("  **      **");
    console.log(" *          *");
    console.log("*            *");
    console.log("*            *");
    console.log(" *          *");
    console.log("  **      **");
    console.log("    ******");
  }
}

class SquareImplementer implements IShapeImplementer {
  drawImplementation(): void {
    console.log("**************");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("*            *");
    console.log("**************");
  }
}

class Circle implements IShape {
  #implementer: IShapeImplementor;

  constructor(implementer: IShapeImplementor) {
    this.#implementer = implementer;
  }

  draw(): void {
    this.#implementer.drawImplementation();
  }
}

class Square implements IShape {
  #implementer: IShapeImplementor;

  constructor(implementer: IShapeImplementor) {
    this.#implementer = implementer;
  }

  draw(): void {
    this.#implementer.drawImplementation();
  }
}

const CIRCLE = new Circle(new CircleImplementer());
CIRCLE.draw();

const SQUARE = new Square(new SquareImplementer());
SQUARE.draw();
