export {};
//* Decorator Design Pattern
// The decorator pattern is a structural pattern, that allows you to attach additional responsibilities to an object at runtime.

// Decorator Concept Sample Code

interface IComponent {
  method(): string;
}

class Component implements IComponent {
  method(): string {
    return "Component Method";
  }
}

class Decorator implements IComponent {
  #object: IComponent;

  constructor(object: IComponent) {
    this.#object = object;
  }

  method(): string {
    return `Decorator Method(${this.#object.method()})`;
  }
}

// The Client
const COMPONENT = new Component();
console.log("COMPONENT:", COMPONENT);

// The component can be decorated
const Decorated = new Decorator(COMPONENT);
console.log("Decorated:", Decorated);

// The decorated component can be decorated again
const Decorated2 = new Decorator(Decorated);
console.log("Decorated2:", Decorated2);
