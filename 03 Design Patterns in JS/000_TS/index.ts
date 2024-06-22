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
console.log("03. Prototype Design Pattern ----------------");
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

//^ 04. Singleton Design Pattern
console.log("04. Singleton Design Pattern ----------------");
class Singleton {
  private static instance: Singleton;

  private constructor() {
    // Private constructor to prevent instantiation from outside the class
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  // Add any methods or properties you need for your Singleton class
  public someMethod(): void {
    console.log("Singleton method called");
  }
}

// Usage
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true

instance1.someMethod(); // Outputs: "Singleton method called"

//^ 05. Adapter Design Pattern
console.log("05. Adapter Design Pattern ----------------");
interface NewApi {
  newRequest(): void;
}

class OldApi {
  oldRequest(): void {
    console.log("Called oldRequest method");
  }
}

class Adapter implements NewApi {
  private oldApi: OldApi;

  constructor(oldApi: OldApi) {
    this.oldApi = oldApi;
  }

  newRequest(): void {
    this.oldApi.oldRequest();
  }
}

// Client code
function clientCode_2(newApi: NewApi): void {
  newApi.newRequest();
}

// Example usage
const oldApi = new OldApi();
const adapter = new Adapter(oldApi);
clientCode_2(adapter); // Outputs: Called oldRequest method

//^ 06. Bridge Design Pattern
console.log("06. Bridge Design Pattern ----------------");
// Device interface
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(volume: number): void;
}

// Concrete implementation for TV
class TV implements Device {
  private power: boolean = false;
  private volume: number = 10;

  isEnabled(): boolean {
    return this.power;
  }

  enable(): void {
    this.power = true;
  }

  disable(): void {
    this.power = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }
}

// Concrete implementation for Radio
class Radio implements Device {
  private power: boolean = false;
  private volume: number = 20;

  isEnabled(): boolean {
    return this.power;
  }

  enable(): void {
    this.power = true;
  }

  disable(): void {
    this.power = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }
}

// RemoteControl abstraction
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

// AdvancedRemoteControl extending RemoteControl
class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
  }
}

// Usage example
const tv = new TV();
const radio = new Radio();

const remote = new RemoteControl(tv);
const advancedRemote = new AdvancedRemoteControl(radio);

console.log(`TV is ${tv.isEnabled() ? "enabled" : "disabled"}`);
remote.togglePower();
console.log(`TV is ${tv.isEnabled() ? "enabled" : "disabled"}`);

console.log(`Radio volume: ${radio.getVolume()}`);
advancedRemote.volumeUp();
console.log(`Radio volume: ${radio.getVolume()}`);
advancedRemote.mute();
console.log(`Radio volume: ${radio.getVolume()}`);

//^ 07. Composite Design Pattern
console.log("07. Composite Design Pattern ----------------");
interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

class Dot implements Graphic {
  constructor(private x: number, private y: number) {}

  move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  draw(): void {
    console.log(`Drawing a dot at (${this.x}, ${this.y})`);
  }
}

class CompoundGraphic implements Graphic {
  private children: Graphic[] = [];

  add(child: Graphic): void {
    this.children.push(child);
  }

  remove(child: Graphic): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  move(x: number, y: number): void {
    this.children.forEach((child) => child.move(x, y));
  }

  draw(): void {
    console.log("Drawing a compound graphic:");
    this.children.forEach((child) => child.draw());
  }
}

const dot1 = new Dot(1, 2);
const dot2 = new Dot(3, 4);
const compoundGraphic = new CompoundGraphic();

compoundGraphic.add(dot1);
compoundGraphic.add(dot2);

const dot3 = new Dot(5, 6);
const anotherCompoundGraphic = new CompoundGraphic();
anotherCompoundGraphic.add(dot3);
anotherCompoundGraphic.add(compoundGraphic);

anotherCompoundGraphic.move(1, 1);
anotherCompoundGraphic.draw();

//^ 08. Decorator Design Pattern
console.log("08. Decorator Design Pattern ----------------");
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost(): number {
    return 5;
  }

  getDescription(): string {
    return "Simple coffee";
  }
}

class CoffeeDecorator implements Coffee {
  protected decoratedCoffee: Coffee;

  constructor(coffee: Coffee) {
    this.decoratedCoffee = coffee;
  }

  getCost(): number {
    return this.decoratedCoffee.getCost();
  }

  getDescription(): string {
    return this.decoratedCoffee.getDescription();
  }
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getCost(): number {
    return super.getCost() + 2;
  }

  getDescription(): string {
    return super.getDescription() + ", milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getCost(): number {
    return super.getCost() + 1;
  }

  getDescription(): string {
    return super.getDescription() + ", sugar";
  }
}

class WhipDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  getCost(): number {
    return super.getCost() + 3;
  }

  getDescription(): string {
    return super.getDescription() + ", whip";
  }
}

const myCoffee = new SimpleCoffee();
console.log(myCoffee.getDescription() + " $" + myCoffee.getCost()); // Simple coffee $5

const milkCoffee = new MilkDecorator(myCoffee);
console.log(milkCoffee.getDescription() + " $" + milkCoffee.getCost()); // Simple coffee, milk $7

const milkSugarCoffee = new SugarDecorator(milkCoffee);
console.log(milkSugarCoffee.getDescription() + " $" + milkSugarCoffee.getCost()); // Simple coffee, milk, sugar $8

const fancyCoffee = new WhipDecorator(milkSugarCoffee);
console.log(fancyCoffee.getDescription() + " $" + fancyCoffee.getCost()); // Simple coffee, milk, sugar, whip $11

//^ 09. Façade Design Pattern
console.log("09. Façade ----------------");
class CPU {
  freeze(): void {
    console.log("Freezing CPU...");
  }

  jump(position: number): void {
    console.log(`Jumping to position ${position}...`);
  }

  execute(): void {
    console.log("Executing instructions...");
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`Loading data '${data}' into position ${position}...`);
  }
}

class HardDrive {
  read(lba: number, size: number): string {
    return `Reading ${size} bytes from LBA ${lba}...`;
  }
}

class ComputerFacade {
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;

  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start(): void {
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
  }
}

const computer = new ComputerFacade();
computer.start();
//* Output:
// Freezing CPU...
// Loading data 'Reading 1024 bytes from LBA 0...' into position 0...
// Jumping to position 0...
// Executing instructions...

//^ 10. Flyweight Design Pattern
console.log("10. Flyweight Design Pattern ----------------");
interface Shape {
  draw(x: number, y: number): void;
}

class Circle implements Shape {
  private color: string;

  constructor(color: string) {
    this.color = color;
  }

  public draw(x: number, y: number): void {
    console.log(`Drawing a ${this.color} circle at (${x}, ${y})`);
  }
}

class ShapeFactory {
  private shapes: { [key: string]: Shape } = {};

  public getCircle(color: string): Shape {
    if (!this.shapes[color]) {
      this.shapes[color] = new Circle(color);
      console.log(`Creating a circle of color: ${color}`);
    }
    return this.shapes[color];
  }
}

(function main() {
  const shapeFactory = new ShapeFactory();

  const redCircle1 = shapeFactory.getCircle("red");
  redCircle1.draw(10, 20);

  const redCircle2 = shapeFactory.getCircle("red");
  redCircle2.draw(30, 40);

  const blueCircle1 = shapeFactory.getCircle("blue");
  blueCircle1.draw(50, 60);

  const blueCircle2 = shapeFactory.getCircle("blue");
  blueCircle2.draw(70, 80);
})();
// Output
// Creating a circle of color: red
// Drawing a red circle at (10, 20)
// Drawing a red circle at (30, 40)
// Creating a circle of color: blue
// Drawing a blue circle at (50, 60)
// Drawing a blue circle at (70, 80)
