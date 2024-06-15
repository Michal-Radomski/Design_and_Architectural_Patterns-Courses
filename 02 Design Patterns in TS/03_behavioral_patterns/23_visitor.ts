export {};
//* Visitor Design Pattern
// Your object structure inside an application may be complicated and varied. A good example is what could be created using the Composite (design pattern) structure.

// interface IVisitor {
//   // An interface that custom Visitors should implement
//   visit(part: Part): void;
// }

// interface IVisitable {
//   // An interface the concrete objects should implement that allows
//   // the visitor to traverse a hierarchical structure of objects
//   accept(visitor: IVisitor): void;
// }

// class Part implements IVisitable {
//   // a.k.a Element. An Object that can be part of any hierarchy
//   name: string;
//   value: number;
//   parts: Set<Part>;

//   constructor(name: string, value: number, parent?: Part) {
//     this.name = name;
//     this.value = value;
//     this.parts = new Set();
//     if (parent) {
//       parent.parts.add(this);
//     }
//   }

//   accept(visitor: IVisitor) {
//     // required by the Visitor that will traverse
//     this.parts.forEach((part) => {
//       part.accept(visitor);
//     });
//     visitor.visit(this);
//   }
// }

// // The Client
// // Creating an example object hierarchy.
// const Part_A = new Part("A", 101);
// const Part_B = new Part("B", 305, Part_A);
// const Part_C = new Part("C", 185, Part_A);
// const Part_D = new Part("D", -30, Part_B);

// // Now Rather than changing the Part class to support custom
// // operations, we can utilize the accept method that was
// // implemented in the Part class because of the addition of
// // the IVisitable interface

// class PrintPartNamesVisitor implements IVisitor {
//   // Create a visitor that prints the part names
//   visit(part: Part) {
//     console.log(part.name);
//   }
// }

// // Using the PrintPartNamesVisitor to traverse the object hierarchy
// Part_A.accept(new PrintPartNamesVisitor());

// class CalculatePartTotalsVisitor implements IVisitor {
//   // Create a visitor that totals the part values
//   totalValue = 0;

//   visit(part: Part) {
//     this.totalValue += part.value;
//   }
// }

// // Using the CalculatePartTotalsVisitor to traverse the
// // object hierarchy
// const CALC_TOTALS_VISITOR = new CalculatePartTotalsVisitor();
// Part_A.accept(CALC_TOTALS_VISITOR);
// console.log(CALC_TOTALS_VISITOR.totalValue);

//* The Visitor Pattern Use Case Example
interface IVisitor {
  // An interface that custom Visitors should implement
  visit(abstractCarPart: AbstractCarPart): void;
}

interface IVisitable {
  // An interface the concrete objects should implement that allows
  // the visitor to traverse a hierarchical structure of objects
  accept(visitor: IVisitor): void;
}

abstract class AbstractCarPart implements IVisitable {
  // The Abstract Car Part
  #name: string;
  #sku: string | undefined;
  #price: number | undefined;

  constructor(name: string, sku?: string, price?: number) {
    this.#name = name;
    this.#sku = sku;
    this.#price = price;
  }

  public get name(): string {
    return this.#name;
  }

  public set name(value: string) {
    this.#name = value;
  }

  public get sku(): string | undefined {
    return this.#sku;
  }

  public set sku(value: string | undefined) {
    this.#sku = value;
  }

  public get price(): number | undefined {
    return this.#price;
  }

  public set price(value: number | undefined) {
    this.#price = value;
  }

  accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}

class CarBody extends AbstractCarPart {
  // A part of the car
}

class Engine extends AbstractCarPart {
  // A part of the car
}

class Wheel extends AbstractCarPart {
  // A part of the car
}

class Car extends AbstractCarPart {
  // A Car with parts
  #parts: AbstractCarPart[];

  constructor(name: string) {
    super(name);
    this.#parts = [
      new CarBody("Utility Body", "ABC-123-21", 1001),
      new Engine("V8 engine", "DEF-456-21", 2555),
      new Wheel("FrontLeft", "GHI-789FL-21", 136),
      new Wheel("FrontRight", "GHI-789FR-21", 136),
      new Wheel("BackLeft", "GHI-789BL-21", 152),
      new Wheel("BackRight", "GHI-789BR-21", 152),
    ];
  }

  accept(visitor: IVisitor) {
    this.#parts.forEach((part) => {
      part.accept(visitor);
    });
    visitor.visit(this);
  }
}

class PrintPartsVisitor implements IVisitor {
  // Print out the part name and sku
  visit(abstractCarPart: AbstractCarPart) {
    if (abstractCarPart.sku !== undefined) {
      console.log(`${abstractCarPart.name}\t:${abstractCarPart.sku}\t:${abstractCarPart.price}`);
    }
  }
}

class TotalPriceVisitor implements IVisitor {
  // Print out the total cost of the parts in the car
  totalPrice = 0;

  visit(abstractCarPart: AbstractCarPart) {
    if (abstractCarPart.price !== undefined) {
      this.totalPrice += abstractCarPart.price as number;
    }
  }
}

// The Client
const CAR = new Car("DeLorean");

// Print out the part name and sku using the PrintPartsVisitor
CAR.accept(new PrintPartsVisitor());

// Calculate the total prince of the parts using the TotalPriceVisitor
const TOTAL_PRICE_VISITOR = new TotalPriceVisitor();
CAR.accept(TOTAL_PRICE_VISITOR);
console.log(`Total Price = ${TOTAL_PRICE_VISITOR.totalPrice}`);
