//* Abstract Factory Pattern
// The Abstract Factory Pattern adds an abstraction layer over multiple other creational pattern implementations.

namespace FactoryA {
  export interface IProductA {
    name: string;
  }

  class ConcreteProduct implements IProductA {
    name = "";
  }

  class ConcreteProductA extends ConcreteProduct {
    constructor() {
      super();
      this.name = "FactoryA:ConcreteProductA";
    }
  }

  class ConcreteProductB extends ConcreteProduct {
    constructor() {
      super();
      this.name = "FactoryA:ConcreteProductB";
    }
  }

  class ConcreteProductC extends ConcreteProduct {
    constructor() {
      super();
      this.name = "FactoryA:ConcreteProductC";
    }
  }

  export class FactoryA {
    static getObject(some_property: string): IProductA {
      try {
        if (some_property === "a") {
          return new ConcreteProductA();
        } else if (some_property === "b") {
          return new ConcreteProductB();
        } else if (some_property === "c") {
          return new ConcreteProductC();
        } else {
          throw new Error("Class Not Found");
        }
      } catch (e) {
        console.log(e);
      }
      return new ConcreteProduct();
    }
  }
}

namespace FactoryB {
  export interface IProductB {
    name: string;
  }

  class ConcreteProduct implements IProductB {
    name = "";
  }

  class ConcreteProductA extends ConcreteProduct {
    constructor() {
      super();
      this.name = "FactoryB:ConcreteProductA";
    }
  }

  class ConcreteProductB extends ConcreteProduct {
    constructor() {
      super();
      this.name = "FactoryB:ConcreteProductB";
    }
  }

  class ConcreteProductC extends ConcreteProduct {
    constructor() {
      super();
      this.name = "FactoryB:ConcreteProductC";
    }
  }

  export class FactoryB {
    static getObject(some_property: string): IProductB {
      try {
        if (some_property === "a") {
          return new ConcreteProductA();
        } else if (some_property === "b") {
          return new ConcreteProductB();
        } else if (some_property === "c") {
          return new ConcreteProductC();
        } else {
          throw new Error("Class Not Found");
        }
      } catch (e) {
        console.log(e);
      }
      return new ConcreteProduct();
    }
  }
}

interface IProduct extends FactoryA.IProductA, FactoryB.IProductB {}

class AbstractFactory {
  // The Abstract Factory Concrete Class

  static createObject(factory: string): IProduct | undefined {
    try {
      if (["aa", "ab", "ac"].indexOf(factory) > -1) {
        return FactoryA.FactoryA.getObject(factory[1]);
      }
      if (["ba", "bb", "bc"].indexOf(factory) > -1) {
        return FactoryB.FactoryB.getObject(factory[1]);
      }
      throw new Error("No Factory Found");
    } catch (e) {
      console.log(e);
    }
  }
}

// The Client
const product_1 = AbstractFactory.createObject("ab");
console.log("product_1:", product_1);

const product_2 = AbstractFactory.createObject("bc");
console.log("product_2:", product_2);
