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
