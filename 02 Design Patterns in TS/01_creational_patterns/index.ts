//* Factory Pattern
// The Factory pattern is really about adding that extra abstraction between the object creation and where it is used. This gives you extra options that you can more easily extend in the future.
interface IProduct {
  name: string;
}

class ConcreteProduct implements IProduct {
  name = "";
}

class ConcreteProductA extends ConcreteProduct {
  constructor() {
    super();
    this.name = "ConcreteProductA";
  }
}

class ConcreteProductB extends ConcreteProduct {
  constructor() {
    super();
    this.name = "ConcreteProductB";
  }
}

class ConcreteProductC extends ConcreteProduct {
  constructor() {
    super();
    this.name = "ConcreteProductC";
  }
}

class Creator {
  static createObject(someProperty: string): IProduct {
    if (someProperty === "a") {
      return new ConcreteProductA();
    } else if (someProperty === "b") {
      return new ConcreteProductB();
    } else {
      return new ConcreteProductC();
    }
  }
}

// The Client
const product = Creator.createObject("b");
console.log(product.name); // ConcreteProductB
