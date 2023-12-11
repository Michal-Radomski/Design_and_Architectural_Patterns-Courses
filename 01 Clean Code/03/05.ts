export {};
//@ The SOLID Principles
//! The Single-responsibility principle: "There should never be more than one reason for a class to change.
//! The Open–closed principle: "Software entities ... should be open for extension, but closed for modification.
// The Liskov substitution principle: "Functions using pointers or references to base classes must be able to use objects of derived classes without knowing it.
// The Interface segregation principle: "Clients should not be forced to depend upon interfaces that they do not use.
// The Dependency inversion principle: "Depend upon abstractions, [not] concretes."

//* Single-responsibility principle
class User {
  login(email: string, password: string) {}

  signup(email: string, password: string) {}

  assignRole(role: any) {}
}

//* Open–closed principle
interface Printer {
  print(data: any): void;
}

class PrinterImplementation {
  verifyData(data: any) {}
}

class WebPrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print web document
  }
}

class PDFPrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print PDF document
  }
}

class PagePrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print real page
  }
}

//* Liskov substitution principle
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying...");
  }
}

class Eagle extends FlyingBird {
  dive() {
    console.log("Diving...");
  }
}

const eagle = new Eagle();
eagle.fly();
eagle.dive();

class Penguin extends Bird {
  //* Problem: Can't fly!
}

//* Interface segregation principle
interface Database {
  storeData(data: any): void;
}

interface RemoteDatabase {
  connect(uri: string): void;
}

class SQLDatabase implements Database, RemoteDatabase {
  storeData(data: any): void {
    // Storing data...
  }

  connect(uri: string): void {
    // connecting...
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    // Storing data...
  }
}

//* Dependency Inversion Principle
interface Database2 {
  storeData(data: any): void;
}

interface RemoteDatabase2 {
  connect(uri: string): void;
}

class SQLDatabase2 implements Database2, RemoteDatabase2 {
  connect(uri: string) {
    console.log("Connecting to SQL database!");
  }

  storeData(data: any) {
    console.log("Storing data...");
  }
}

class InMemoryDatabase2 implements Database {
  storeData(data: any) {
    console.log("Storing data...");
  }
}

class App {
  private database2: Database2;

  constructor(database2: Database2) {
    this.database2 = database2;
  }

  saveSettings() {
    this.database2.storeData("Some data");
  }
}

const sqlDatabase2 = new SQLDatabase2();
sqlDatabase2.connect("my-url");
const app2 = new App(sqlDatabase2);
console.log("app2:", app2);

//* KISS => Keep It Simple, Stupid/Smart
// 1. Short-circuit Evaluation -> const firstName = person && person.firstNames
// 2. Arrow Functions -> const sayHello = name => console.log("Hello", name)
// 3. Avoid boring old for loop -> list.forEach(number => console.log(number))
// 4. Implicit Return -> const doubleValue = value => value * 2
// 5. Default Parameters -> const volume = ( l, w = 1, h = 1) => l * w * h
// 6. Destructuring -> let { first = 'John' , last = 'Doe' } = person -> with default values
// 7. Spread Operator -> const nums = [4, 5, 6, ...odd]
// 8. Importing Modules -> import { observable, action, runInAction } from ‘mobx’ -> not the whole library
// 9. Async/Await over Promises ->
// const makeRequest = async () => {
//   console.log(await getJSON())
//   return "done"
// }
// makeRequest()
// 10. Map, Filter, Reduce ->
const distances = [
  { from: "New York", to: "Dhaka", distance: 12654 },
  { from: "Sydney", to: "chittagong", distance: 8858 },
  { from: "Kolkata", to: "Sylhet", distance: 670 },
];

const totalDistanceLT1000 = distances
  .filter((item) => item.distance < 10000)
  .map((item) => item.distance * 0.621371)
  .reduce((prev, distance) => prev + distance, 0);
console.log({ totalDistanceLT1000 });
