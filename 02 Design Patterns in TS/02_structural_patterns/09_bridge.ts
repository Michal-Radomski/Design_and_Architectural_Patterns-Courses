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
