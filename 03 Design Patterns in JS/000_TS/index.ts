export {}; //* By adding export {}; at the top of a file, you tell TypeScript to treat this file as a module not a script!

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

//^ 11. Proxy Design Pattern
console.log("11. Proxy Design Pattern ----------------");

// Subject interface
interface DataFetcher {
  fetchData(id: number): string;
}

// RealSubject class that performs the actual operation
class RealDataFetcher implements DataFetcher {
  fetchData(id: number): string {
    console.log(`Fetching data for ID: ${id}`);
    return `Data for ID: ${id}`;
  }
}

// Proxy class that controls access to the RealSubject and adds caching
class DataFetcherProxy implements DataFetcher {
  private realDataFetcher: RealDataFetcher;
  private cache: Map<number, string>;

  constructor() {
    this.realDataFetcher = new RealDataFetcher();
    this.cache = new Map<number, string>();
  }

  fetchData(id: number): string {
    if (this.cache.has(id)) {
      console.log(`Returning cached data for ID: ${id}`);
      return this.cache.get(id)!;
    }

    const data = this.realDataFetcher.fetchData(id);
    this.cache.set(id, data);
    return data;
  }
}

// Usage
const dataFetcher: DataFetcher = new DataFetcherProxy();

console.log(dataFetcher.fetchData(1)); // Fetching data for ID: 1, Data for ID: 1
console.log(dataFetcher.fetchData(1)); // Returning cached data for ID: 1, Data for ID: 1
console.log(dataFetcher.fetchData(2)); // Fetching data for ID: 2, Data for ID: 2
console.log(dataFetcher.fetchData(2)); // Returning cached data for ID: 2, Data for ID: 2

//^ 12. Chain of Responsibility Design Pattern
console.log("12. Chain of Responsibility Design Pattern ----------------");

// Handler interface
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

// Abstract handler class
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// Concrete handlers
class SupportHandler extends AbstractHandler {
  public handle(request: string): void {
    if (request === "low") {
      console.log("SupportHandler: Handling low level request");
    } else {
      console.log("SupportHandler: Passing request to the next handler");
      super.handle(request);
    }
  }
}

class ManagerHandler extends AbstractHandler {
  public handle(request: string): void {
    if (request === "medium") {
      console.log("ManagerHandler: Handling medium level request");
    } else {
      console.log("ManagerHandler: Passing request to the next handler");
      super.handle(request);
    }
  }
}

class DirectorHandler extends AbstractHandler {
  public handle(request: string): void {
    if (request === "high") {
      console.log("DirectorHandler: Handling high level request");
    } else {
      console.log("DirectorHandler: Passing request to the next handler");
      super.handle(request);
    }
  }
}

// Client code
const support = new SupportHandler();
const manager = new ManagerHandler();
const director = new DirectorHandler();

support.setNext(manager).setNext(director);

console.log("Sending low level request:");
support.handle("low");

console.log("\nSending medium level request:");
support.handle("medium");

console.log("\nSending high level request:");
support.handle("high");

console.log("\nSending unknown level request:");
support.handle("unknown");

//^ 13. Command Design Pattern
console.log("13. Command Design Pattern ----------------");

interface Command {
  execute(): void;
}

class Light {
  turnOn() {
    console.log("The light is on");
  }

  turnOff() {
    console.log("The light is off");
  }
}

class TurnOnLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}

class TurnOffLightCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }
}

class RemoteControl2 {
  private command!: Command;

  setCommand(command: Command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }
}

// Client code
const light = new Light();
const turnOnCommand = new TurnOnLightCommand(light);
const turnOffCommand = new TurnOffLightCommand(light);

const remoteControl = new RemoteControl2();

remoteControl.setCommand(turnOnCommand);
remoteControl.pressButton(); // Output: The light is on

remoteControl.setCommand(turnOffCommand);
remoteControl.pressButton(); // Output: The light is off

//^ 14. Interpreter Design Pattern
console.log("14. Interpreter Design Pattern ----------------");

// 1. Abstract Expression
interface Expression {
  interpret(context: string): boolean;
}

// 2. Concrete Expressions
class TerminalExpression implements Expression {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  interpret(context: string): boolean {
    return context.includes(this.data);
  }
}

class OrExpression implements Expression {
  private expr1: Expression;
  private expr2: Expression;

  constructor(expr1: Expression, expr2: Expression) {
    this.expr1 = expr1;
    this.expr2 = expr2;
  }

  interpret(context: string): boolean {
    return this.expr1.interpret(context) || this.expr2.interpret(context);
  }
}

class AndExpression implements Expression {
  private expr1: Expression;
  private expr2: Expression;

  constructor(expr1: Expression, expr2: Expression) {
    this.expr1 = expr1;
    this.expr2 = expr2;
  }

  interpret(context: string): boolean {
    return this.expr1.interpret(context) && this.expr2.interpret(context);
  }
}

// 3. Interpreter
const createInterpreterTree = (): Expression => {
  // Rule: "John" and "Doe" are in the context
  const john = new TerminalExpression("John");
  const doe = new TerminalExpression("Doe");

  // Rule: "Jane" or "Doe" is in the context
  const jane = new TerminalExpression("Jane");

  const isJohnAndDoe = new AndExpression(john, doe);
  const isJaneOrDoe = new OrExpression(jane, doe);

  return new OrExpression(isJohnAndDoe, isJaneOrDoe);
};

// Client code
const interpreter = createInterpreterTree();

const context1 = "John Doe";
const context2 = "Jane Smith";
const context3 = "Jane Doe";
const context4 = "John Smith";

console.log(`Context: "${context1}" - Result: ${interpreter.interpret(context1)}`); // true
console.log(`Context: "${context2}" - Result: ${interpreter.interpret(context2)}`); // true
console.log(`Context: "${context3}" - Result: ${interpreter.interpret(context3)}`); // true
console.log(`Context: "${context4}" - Result: ${interpreter.interpret(context4)}`); // false

//^ 15. Iterator Design Pattern
console.log("15. Iterator Design Pattern ----------------");
// 1. Iterator Interface
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

// 2. Concrete Iterator
class ArrayIterator<T> implements Iterator<T> {
  private collection: T[];
  private position: number = 0;

  constructor(collection: T[]) {
    this.collection = collection;
  }

  public next(): T | null {
    if (this.hasNext()) {
      return this.collection[this.position++];
    }
    return null;
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
}

// 3. Aggregate Interface
interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

// 4. Concrete Aggregate
class NumberCollection implements IterableCollection<number> {
  private items: number[] = [];

  public addItem(item: number): void {
    this.items.push(item);
  }

  public createIterator(): Iterator<number> {
    return new ArrayIterator<number>(this.items);
  }
}

// Client code
const collection2 = new NumberCollection();
collection2.addItem(1);
collection2.addItem(2);
collection2.addItem(3);

const iterator = collection2.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}

//^ 16. Mediator Design Pattern
console.log("16. Mediator Design Pattern ----------------");

// Mediator interface
interface Mediator {
  notify(sender: Colleague, event: string): void;
}

// Colleague abstract class
abstract class Colleague {
  protected mediator!: Mediator;

  constructor(mediator?: Mediator) {
    if (mediator) {
      this.mediator = mediator;
    }
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

// Concrete Colleague A
class ColleagueA extends Colleague {
  public doA(): void {
    console.log("ColleagueA does A.");
    this.mediator.notify(this, "A");
  }

  public doB(): void {
    console.log("ColleagueA does B.");
    this.mediator.notify(this, "B");
  }
}

// Concrete Colleague B
class ColleagueB extends Colleague {
  public doC(): void {
    console.log("ColleagueB does C.");
    this.mediator.notify(this, "C");
  }

  public doD(): void {
    console.log("ColleagueB does D.");
    this.mediator.notify(this, "D");
  }
}

// Concrete Mediator
class ConcreteMediator implements Mediator {
  private colleagueA: ColleagueA;
  private colleagueB: ColleagueB;

  constructor(colleagueA: ColleagueA, colleagueB: ColleagueB) {
    this.colleagueA = colleagueA;
    this.colleagueA.setMediator(this);
    this.colleagueB = colleagueB;
    this.colleagueB.setMediator(this);
  }

  public notify(_sender: Colleague, event: string): void {
    // console.log("_ender:", _sender);
    if (event === "A") {
      console.log("Mediator reacts on A and triggers following operations:");
      this.colleagueB.doC();
    } else if (event === "D") {
      console.log("Mediator reacts on D and triggers following operations:");
      this.colleagueA.doB();
    }
  }
}

// Usage
const colleagueA = new ColleagueA();
const colleagueB = new ColleagueB();
const mediator = new ConcreteMediator(colleagueA, colleagueB);
// console.log("mediator:", mediator);

console.log("Client triggers operation A.");
colleagueA.doA();

console.log("Client triggers operation D.");
colleagueB.doD();
// Output:
// Client triggers operation A.
// ColleagueA does A.
// Mediator reacts on A and triggers following operations:
// ColleagueB does C.

// Client triggers operation D.
// ColleagueB does D.
// Mediator reacts on D and triggers following operations:
// ColleagueA does B.

//^ 17. Momento Design Pattern
console.log("17. Momento Design Pattern ----------------");

// Memento class to store the state
class Memento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  public getState(): string {
    return this.state;
  }
}

// Originator class that creates a memento containing a snapshot of its current internal state
class Originator {
  private state!: string;

  public setState(state: string): void {
    this.state = state;
    console.log(`State set to ${this.state}`);
  }

  public getState(): string {
    return this.state;
  }

  public saveStateToMemento(): Memento {
    return new Memento(this.state);
  }

  public getStateFromMemento(memento: Memento): void {
    this.state = memento.getState();
    console.log(`State restored to ${this.state}`);
  }
}

// Caretaker class that keeps track of multiple mementos
class Caretaker {
  private mementoList: Memento[] = [];

  public add(memento: Memento): void {
    this.mementoList.push(memento);
  }

  public get(index: number): Memento {
    return this.mementoList[index];
  }
}

// Example usage:
const originator = new Originator();
const caretaker = new Caretaker();

originator.setState("State1");
originator.setState("State2");
caretaker.add(originator.saveStateToMemento());

originator.setState("State3");
caretaker.add(originator.saveStateToMemento());

originator.setState("State4");
console.log(`Current State: ${originator.getState()}`);

originator.getStateFromMemento(caretaker.get(0));
console.log(`First saved State: ${originator.getState()}`);
originator.getStateFromMemento(caretaker.get(1));
console.log(`Second saved State: ${originator.getState()}`);

//^ 18. Observer Design Pattern
console.log("18. Observer Design Pattern ----------------");

// Subject interface
interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

// Observer interface
interface Observer {
  update(state: any): void;
}

// Concrete Subject class
class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: any;

  public getState(): any {
    return this.state;
  }

  public setState(state: any): void {
    this.state = state;
    this.notifyObservers();
  }

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  public notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }
}

// Concrete Observer class
class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(state: any): void {
    console.log(`${this.name} received state update: ${state}`);
  }
}

// Example usage
const subject = new ConcreteSubject();

const observer1 = new ConcreteObserver("Observer 1");
const observer2 = new ConcreteObserver("Observer 2");

subject.registerObserver(observer1);
subject.registerObserver(observer2);

subject.setState("State 1");
subject.setState("State 2");

subject.removeObserver(observer1);

subject.setState("State 3");

//^ 19. State Design Pattern
console.log("19. State Design Pattern ----------------");

// State interface
interface State {
  handle(context: Context): void;
}

// Concrete State A
class ConcreteStateA implements State {
  handle(context: Context): void {
    console.log("State A is handling the request.");
    context.setState(new ConcreteStateB());
  }
}

// Concrete State B
class ConcreteStateB implements State {
  handle(context: Context): void {
    console.log("State B is handling the request.");
    context.setState(new ConcreteStateA());
  }
}

// Context class
class Context {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  setState(state: State): void {
    this.state = state;
  }

  request(): void {
    this.state.handle(this);
  }
}

// Example usage
const context = new Context(new ConcreteStateA());

context.request(); // Output: "State A is handling the request."
context.request(); // Output: "State B is handling the request."
context.request(); // Output: "State A is handling the request."
context.request(); // Output: "State B is handling the request."

// //^ 20. Strategy Design Pattern
// console.log("20. Strategy Design Pattern ----------------");

// //^ 21. Template Method Design Pattern
// console.log("21. Template Method Design Pattern ----------------");

// //^ 22. Visitor Design Pattern
// console.log("22. Visitor Design Pattern ----------------");
