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

//^ 04. Singleton Design Pattern
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
