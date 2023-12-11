export {};
//@ The SOLID Principles
// The Single-responsibility principle: "There should never be more than one reason for a class to change.
// The Open–closed principle: "Software entities ... should be open for extension, but closed for modification.
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
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  saveSettings() {
    this.database.storeData("Some data");
  }
}

const sqlDatabase = new SQLDatabase();
sqlDatabase.connect("my-url");
const app = new App(sqlDatabase);
