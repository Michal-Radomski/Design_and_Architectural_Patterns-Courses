export {};
//* Chain of Responsibility Design Pattern
// Chain of Responsibility pattern is a behavioral pattern used to achieve loose coupling in software design.

interface IHandler {
  // The Handler Interface that the Successors should implement
  handle(payload: number): number;
}

class Successor1 implements IHandler {
  // A Concrete Handler
  handle(payload: number) {
    console.log(`Successor1 payload = ${payload}`);
    const test = Math.floor(Math.random() * 2) + 1;
    if (test === 1) {
      payload += 1;
      payload = new Successor1().handle(payload);
    } else {
      payload -= 1;
      payload = new Successor2().handle(payload);
    }
    return payload;
  }
}

class Successor2 implements IHandler {
  // A Concrete Handler
  handle(payload: number) {
    console.log(`Successor2 payload = ${payload}`);
    const test = Math.floor(Math.random() * 3) + 1;
    if (test === 1) {
      payload = payload * 2;
      payload = new Successor1().handle(payload);
    } else if (test === 2) {
      payload = payload / 2;
      payload = new Successor2().handle(payload);
    } // if test = 3 then assign no further successors
    return payload;
  }
}

class Chain {
  // A chain with a default first successor
  start(payload: number) {
    // Setting the first successor that will modify the payload
    return new Successor1().handle(payload);
  }
}

// The Client
const CHAIN = new Chain();
const PAYLOAD = 1;
const OUT = CHAIN.start(PAYLOAD);
console.log(`Finished result = ${OUT}`);

//* The Chain Of Responsibility Pattern Use Case
// An ATM Dispenser that dispenses denominations of notes
interface IDispenser {
  nextSuccessor(successor: IDispenser): void;
  handle(amount: number): void;
}

class Dispenser10 implements IDispenser {
  // Dispenses £10s if applicable, otherwise continues to next successor
  #successor: IDispenser | undefined;

  nextSuccessor(successor: IDispenser): void {
    // Set the next successor
    this.#successor = successor;
  }

  handle(amount: number): void {
    // Handle the dispensing of notes"
    if (amount >= 10) {
      const num = Math.floor(amount / 10);
      const remainder = amount % 10;
      console.log(`Dispensing ${num} * £10 note`);
      if (remainder !== 0) {
        (this.#successor as IDispenser).handle(remainder);
      }
    } else {
      (this.#successor as IDispenser).handle(amount);
    }
  }
}

class Dispenser20 implements IDispenser {
  // Dispenses £10s if applicable, otherwise continues to next successor
  #successor: IDispenser | undefined;

  nextSuccessor(successor: IDispenser): void {
    // Set the next successor
    this.#successor = successor;
  }

  handle(amount: number): void {
    // Handle the dispensing of notes"
    if (amount >= 20) {
      const num = Math.floor(amount / 20);
      const remainder = amount % 20;
      console.log(`Dispensing ${num} * £20 note`);
      if (remainder !== 0) {
        (this.#successor as IDispenser).handle(remainder);
      }
    } else {
      (this.#successor as IDispenser).handle(amount);
    }
  }
}

class Dispenser50 implements IDispenser {
  // Dispenses £10s if applicable, otherwise continues to next successor
  #successor: IDispenser | undefined;

  nextSuccessor(successor: IDispenser): void {
    // Set the next successor
    this.#successor = successor;
  }

  handle(amount: number): void {
    // Handle the dispensing of notes"
    if (amount >= 50) {
      const num = Math.floor(amount / 50);
      const remainder = amount % 50;
      console.log(`Dispensing ${num} * £50 note`);
      if (remainder !== 0) {
        (this.#successor as IDispenser).handle(remainder);
      }
    } else {
      (this.#successor as IDispenser).handle(amount);
    }
  }
}

class ATMDispenserChain {
  chain1: Dispenser50;
  chain2: Dispenser20;
  chain3: Dispenser10;

  constructor() {
    // initializing the successors chain
    this.chain1 = new Dispenser50();
    this.chain2 = new Dispenser20();
    this.chain3 = new Dispenser10();
    // Setting a default successor chain that will process the 50s first,
    // the 20s second and the 10s last.The successor chain will be
    // recalculated dynamically at runtime.
    this.chain1.nextSuccessor(this.chain2);
    this.chain2.nextSuccessor(this.chain3);
  }
}

const ATM = new ATMDispenserChain();
console.log("Enter amount to withdrawal : ");
process.stdin.on("data", (data: string) => {
  if (parseInt(data)) {
    const amount = parseInt(data);
    if (amount < 10 || amount % 10 != 0) {
      console.log("Amount should be positive and in multiple of 10s.");
    } else {
      // process the request
      ATM.chain1.handle(amount);
      console.log("Now go spoil yourself");
      process.exit();
    }
  } else {
    console.log("Please enter a number.");
  }
});

(globalThis as any).dispense = (amount: number) => {
  console.log("");
  if (amount < 10 || amount % 10 != 0) {
    console.log("Amount should be positive and in multiple of 10s.");
  } else {
    // process the request
    ATM.chain1.handle(amount);
    console.log("Now go spoil yourself");
  }
};

console.log("Select amount to withdrawal : ");
console.log('<select id="amount" onchange="dispense(this.value)">');
