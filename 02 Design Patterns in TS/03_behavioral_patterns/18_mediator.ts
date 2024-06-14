export {};
//* Mediator Design Pattern
// Objects communicate through the Mediator rather than directly with each other.

// Mediator Concept Sample Code
// class Mediator {
//   // The Mediator Concrete Class
//   colleague1: Colleague1;
//   colleague2: Colleague2;

//   constructor() {
//     this.colleague1 = new Colleague1();
//     this.colleague2 = new Colleague2();
//   }

//   colleague1Method() {
//     // Calls the method provided by Colleague1
//     return this.colleague1.method1();
//   }

//   colleague2Method() {
//     // Calls the method provided by Colleague2
//     return this.colleague2.method2();
//   }
// }

// class Colleague1 {
//   // This Colleague provides data for Colleague2

//   method1() {
//     return "Here is the Colleague1 specific data you asked for";
//   }
// }

// class Colleague2 {
//   // This Colleague provides data for Colleague1

//   method2() {
//     return "Here is the Colleague2 specific data you asked for";
//   }
// }

// // The Client
// const MEDIATOR = new Mediator();

// // Colleague1 wants some data from Colleague2
// let DATA = MEDIATOR.colleague2Method();
// console.log(`COLLEAGUE1 <--> ${DATA}`);

// // Colleague2 wants some data from Colleague1
// DATA = MEDIATOR.colleague1Method();
// console.log(`COLLEAGUE2 <--> ${DATA}`);

//* The Mediator Use Case Example
interface IComponent {
  notify(message: string): void;

  receive(message: string): void;
}

class Mediator {
  // A Subject whose notify method is mediated
  #components: Set<IComponent>;

  constructor() {
    this.#components = new Set();
  }

  add(component: IComponent): void {
    // Add components
    this.#components.add(component);
  }

  notify(message: string, originator: IComponent): void {
    // Add components except for the originator component
    this.#components.forEach((component) => {
      if (component !== originator) {
        component.receive(message);
      }
    });
  }
}

class Component implements IComponent {
  #mediator: Mediator;
  #name: string;

  constructor(mediator: Mediator, name: string) {
    this.#mediator = mediator;
    this.#name = name;
  }

  notify(message: string): void {
    console.log(this.#name + ": >>> Out >>> : " + message);
    this.#mediator.notify(message, this);
  }

  receive(message: string): void {
    console.log(this.#name + ": <<< In <<< : " + message);
  }
}

const MEDIATOR = new Mediator();
const COMPONENT1 = new Component(MEDIATOR, "Component1");
const COMPONENT2 = new Component(MEDIATOR, "Component2");
const COMPONENT3 = new Component(MEDIATOR, "Component3");

MEDIATOR.add(COMPONENT1);
MEDIATOR.add(COMPONENT2);
MEDIATOR.add(COMPONENT3);

COMPONENT1.notify("data A");
COMPONENT2.notify("data B");
COMPONENT3.notify("data C");
