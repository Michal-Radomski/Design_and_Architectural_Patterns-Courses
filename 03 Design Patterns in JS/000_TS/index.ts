//^ 01. Builder Design Pattern
console.log("01. Builder Design Pattern ----------------");
class Product {
  public partA!: string;
  public partB!: string;
  public partC!: string;

  public listParts(): void {
    console.log(`Product parts: ${this.partA}, ${this.partB}, ${this.partC}`);
  }
}

interface IBuilder {
  buildPartA(): this;
  buildPartB(): this;
  buildPartC(): this;
  getResult(): Product;
}

class ConcreteBuilder implements IBuilder {
  private product: Product;

  constructor() {
    this.product = new Product();
  }

  public buildPartA(): this {
    this.product.partA = "PartA";
    return this;
  }

  public buildPartB(): this {
    this.product.partB = "PartB";
    return this;
  }

  public buildPartC(): this {
    this.product.partC = "PartC";
    return this;
  }

  public getResult(): Product {
    return this.product;
  }
}

class Director {
  private builder!: IBuilder;

  public setBuilder(builder: IBuilder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.buildPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.buildPartA().buildPartB().buildPartC();
  }
}

(function main() {
  const director = new Director();
  const builder = new ConcreteBuilder();

  director.setBuilder(builder);

  console.log("Building minimal viable product:");
  director.buildMinimalViableProduct();
  builder.getResult().listParts();

  console.log("Building full-featured product:");
  director.buildFullFeaturedProduct();
  builder.getResult().listParts();

  console.log("Building custom product:");
  builder.buildPartA().buildPartC();
  builder.getResult().listParts();
})();
