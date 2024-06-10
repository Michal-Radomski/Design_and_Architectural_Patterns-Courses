export {};
//* Builder Design Pattern
// The Builder Pattern is a creational pattern whose intent is to separate the construction of a complex object from its representation so that you can use the same construction process to create different representations.
class Product {
  parts: string[] = [];
}

interface IBuilder {
  buildPartA(): this;
  buildPartB(): this;
  buildPartC(): this;
  getResult(): Product;
}

class Builder implements IBuilder {
  // The Concrete Builder
  product: Product;

  constructor() {
    this.product = new Product();
  }

  buildPartA() {
    this.product.parts.push("a");
    return this;
  }

  buildPartB() {
    this.product.parts.push("b");
    return this;
  }

  buildPartC() {
    this.product.parts.push("c");
    return this;
  }

  getResult() {
    return this.product;
  }
}

class Director {
  // The Director, building a complex representation

  static construct() {
    "Constructs and returns the final product";
    return new Builder().buildPartA().buildPartB().buildPartC().getResult();
  }
}

// The Client
const product = Director.construct();
console.log("JSON.stringify(product.parts):", JSON.stringify(product.parts));
