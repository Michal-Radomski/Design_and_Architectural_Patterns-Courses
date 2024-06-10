export {};
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

//* Factory Use Case Example
type dimension = {
  height: number;
  width: number;
  depth: number;
};

// A Chair Interface
interface IChair {
  height: number;
  width: number;
  depth: number;
  getDimensions(): dimension;
}

// The Chair Base Class
class Chair implements IChair {
  height = 0;
  width = 0;
  depth = 0;

  getDimensions(): dimension {
    return {
      width: this.width,
      depth: this.depth,
      height: this.height,
    };
  }
}

class ChairFactory {
  static getChair(chair: string): IChair {
    if (chair == "BigChair") {
      return new BigChair();
    } else if (chair == "MediumChair") {
      return new MediumChair();
    } else {
      return new SmallChair();
    }
  }
}

class SmallChair extends Chair {
  constructor() {
    super();
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}

class MediumChair extends Chair {
  constructor() {
    super();
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}

class BigChair extends Chair {
  constructor() {
    super();
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

const chair = ChairFactory.getChair("SmallChair");
console.log("chair.getDimensions():", chair.getDimensions()); // { width: 40, depth: 40, height: 40 }
