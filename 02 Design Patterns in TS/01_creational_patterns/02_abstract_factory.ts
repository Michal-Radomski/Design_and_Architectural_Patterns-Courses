export {};
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

//* Abstract Factory Use Case Example
type dimension = {
  height: number;
  width: number;
  depth: number;
};

interface IChair {
  name: string;
  height: number;
  width: number;
  depth: number;

  getDimensions(): dimension;
}

class Chair implements IChair {
  name = "";
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
    } else if (chair == "SmallChair") {
      return new SmallChair();
    } else {
      throw new Error("No Chair Found");
    }
  }
}

class SmallChair extends Chair {
  constructor() {
    super();
    this.name = "SmallChair";
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}

class MediumChair extends Chair {
  constructor() {
    super();
    this.name = "MediumChair";
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}

class BigChair extends Chair {
  constructor() {
    super();
    this.name = "BigChair";
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

interface ITable {
  name: string;
  height: number;
  width: number;
  depth: number;

  getDimensions(): dimension;
}

class Table implements ITable {
  name = "";
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

class TableFactory {
  static getTable(table: string): ITable {
    if (table === "BigTable") {
      return new BigTable();
    } else if (table === "MediumTable") {
      return new MediumTable();
    } else if (table === "SmallTable") {
      return new SmallTable();
    } else {
      throw new Error("No Table Found");
    }
  }
}

class SmallTable extends Table {
  constructor() {
    super();
    this.name = "SmallTable";
    this.height = 40;
    this.width = 40;
    this.depth = 40;
  }
}

class MediumTable extends Table {
  constructor() {
    super();
    this.name = "MediumTable";
    this.height = 60;
    this.width = 60;
    this.depth = 60;
  }
}

class BigTable extends Table {
  constructor() {
    super();
    this.name = "BigTable";
    this.height = 80;
    this.width = 80;
    this.depth = 80;
  }
}

interface IFurniture extends IChair, ITable {}

class FurnitureFactory {
  static getFurniture(furniture: string): IFurniture | undefined {
    try {
      if (["SmallChair", "MediumChair", "BigChair"].indexOf(furniture) > -1) {
        return ChairFactory.getChair(furniture);
      }
      if (["SmallTable", "MediumTable", "BigTable"].indexOf(furniture) > -1) {
        return TableFactory.getTable(furniture);
      }
      throw new Error("No Factory Found");
    } catch (e) {
      console.log(e);
    }
  }
}

// The Client

const furniture_1 = FurnitureFactory.getFurniture("SmallChair");
console.log(
  "furniture_1?.name, JSON.stringify(furniture_1?.getDimensions():",
  furniture_1?.name,
  JSON.stringify(furniture_1?.getDimensions())
);
const furniture_2 = FurnitureFactory.getFurniture("SmallChair");
console.log(
  "furniture_2?.name, JSON.stringify(furniture_2?.getDimensions():",
  furniture_2?.name,
  JSON.stringify(furniture_2?.getDimensions())
);
