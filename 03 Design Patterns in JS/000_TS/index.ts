//^ 01. Builder Design Pattern
// console.log("01. Builder Design Pattern ----------------");
// class Product {
//   public partA!: string;
//   public partB!: string;
//   public partC!: string;

//   public listParts(): void {
//     console.log(`Product parts: ${this.partA}, ${this.partB}, ${this.partC}`);
//   }
// }

// interface IBuilder {
//   buildPartA(): this;
//   buildPartB(): this;
//   buildPartC(): this;
//   getResult(): Product;
// }

// class ConcreteBuilder implements IBuilder {
//   private product: Product;

//   constructor() {
//     this.product = new Product();
//   }

//   public buildPartA(): this {
//     this.product.partA = "PartA";
//     return this;
//   }

//   public buildPartB(): this {
//     this.product.partB = "PartB";
//     return this;
//   }

//   public buildPartC(): this {
//     this.product.partC = "PartC";
//     return this;
//   }

//   public getResult(): Product {
//     return this.product;
//   }
// }

// class Director {
//   private builder!: IBuilder;

//   public setBuilder(builder: IBuilder): void {
//     this.builder = builder;
//   }

//   public buildMinimalViableProduct(): void {
//     this.builder.buildPartA();
//   }

//   public buildFullFeaturedProduct(): void {
//     this.builder.buildPartA().buildPartB().buildPartC();
//   }
// }

// (function main() {
//   const director = new Director();
//   const builder = new ConcreteBuilder();

//   director.setBuilder(builder);

//   console.log("Building minimal viable product:");
//   director.buildMinimalViableProduct();
//   builder.getResult().listParts();

//   console.log("Building full-featured product:");
//   director.buildFullFeaturedProduct();
//   builder.getResult().listParts();

//   console.log("Building custom product:");
//   builder.buildPartA().buildPartC();
//   builder.getResult().listParts();
// })();

//^ 02. Factory Design Pattern
console.log("02. Factory Design Pattern ----------------");

interface IProduct {
  operation(): string;
}

class ConcreteProductA implements IProduct {
  public operation(): string {
    return "Result of ConcreteProductA";
  }
}

class ConcreteProductB implements IProduct {
  public operation(): string {
    return "Result of ConcreteProductB";
  }
}

abstract class Creator {
  public abstract factoryMethod(): IProduct;

  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreatorA extends Creator {
  public factoryMethod(): IProduct {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  public factoryMethod(): IProduct {
    return new ConcreteProductB();
  }
}

function clientCode(creator: Creator) {
  console.log("Client: I'm not aware of the creator's class, but it still works.");
  console.log(creator.someOperation());
}

console.log("App: Launched with ConcreteCreatorA.");
clientCode(new ConcreteCreatorA());

console.log("");

console.log("App: Launched with ConcreteCreatorB.");
clientCode(new ConcreteCreatorB());

//^ 03. Prototype Design Pattern
interface Prototype<T> {
  clone(): T;
}

class Address implements Prototype<Address> {
  constructor(public street: string, public city: string) {}

  clone(): Address {
    return new Address(this.street, this.city);
  }

  toString(): string {
    return `${this.street}, ${this.city}`;
  }
}

class Person implements Prototype<Person> {
  constructor(public name: string, public age: number, public address: Address) {}

  clone(): Person {
    return new Person(this.name, this.age, this.address.clone());
  }

  toString(): string {
    return `${this.name}, ${this.age}, ${this.address}`;
  }
}

const originalAddress = new Address("123 Main St", "New York");
const originalPerson = new Person("John Doe", 30, originalAddress);

const clonedPerson = originalPerson.clone();

// Modify the cloned person and address
clonedPerson.name = "Jane Doe";
clonedPerson.address.street = "456 Elm St";

console.log(originalPerson.toString()); // John Doe, 30, 123 Main St, New York
console.log(clonedPerson.toString()); // Jane Doe, 30, 456 Elm St, New York
