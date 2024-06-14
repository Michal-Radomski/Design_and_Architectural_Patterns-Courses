//* Memento Design Pattern
// You can use the Memento pattern for saving a copy of state and for later retrieval if necessary.

// class Memento {
//   // A container of state
//   state: string;
//   constructor(state: string) {
//     this.state = state;
//   }
// }

// class Originator {
//   // The Object in the application whose state changes

//   #state: string;

//   constructor() {
//     this.#state = "";
//   }

//   public get state(): string {
//     return this.#state;
//   }

//   public set state(value: string) {
//     this.#state = value;
//     console.log(`Originator: Set state to '${value}'`);
//   }

//   public get memento(): Memento {
//     console.log("Originator: Providing Memento of state to caretaker.");
//     return new Memento(this.#state);
//   }

//   public set memento(value: Memento) {
//     this.#state = value.state;
//     console.log(`Originator: State after restoring from Memento: '${this.#state}'`);
//   }
// }

// class CareTaker {
//   // Guardian. Provides a narrow interface to the mementos

//   #originator: Originator;
//   #mementos: Memento[];

//   constructor(originator: Originator) {
//     this.#originator = originator;
//     this.#mementos = [];
//   }

//   create() {
//     // Store a new Memento of the Originators current state
//     console.log("CareTaker: Getting a copy of Originators current state");
//     const memento = this.#originator.memento;
//     this.#mementos.push(memento);
//   }

//   restore(index: number) {
//     // Replace the Originators current state with the state stored in the saved Memento
//     console.log("CareTaker: Restoring Originators state from Memento");
//     const memento = this.#mementos[index];
//     this.#originator.memento = memento;
//   }
// }

// // The Client
// const ORIGINATOR = new Originator();
// const CARETAKER = new CareTaker(ORIGINATOR);

// // originators state can change periodically due to application events
// ORIGINATOR.state = "State #1";
// ORIGINATOR.state = "State #2";

// // lets backup the originators
// CARETAKER.create();

// // more changes, and then another backup
// ORIGINATOR.state = "State #3";
// CARETAKER.create();

// // more changes
// ORIGINATOR.state = "State #4";
// console.log(ORIGINATOR.state);

// // restore from first backup
// CARETAKER.restore(0);
// console.log(ORIGINATOR.state);

// // restore from second backup
// CARETAKER.restore(1);
// console.log(ORIGINATOR.state);

//* Memento example Use Case
class Memento {
  score: number;
  inventory: Set<string>;
  level: number;
  location: { x: number; y: number; z: number };

  constructor(score: number, inventory: Set<string>, level: number, location: { x: number; y: number; z: number }) {
    this.score = score;
    this.inventory = inventory;
    this.level = level;
    this.location = location;
  }
}

class CareTaker {
  // Guardian. Provides a narrow interface to the mementos

  #originator: GameCharacter;
  #mementos: Memento[];

  constructor(originator: GameCharacter) {
    this.#originator = originator;
    this.#mementos = [];
  }

  save(): void {
    // Store a new Memento of the Characters current state
    console.log("CareTaker: Game Save");
    const memento = this.#originator.memento;
    this.#mementos.push(memento);
  }

  restore(index: number): void {
    // Replace the Characters current attributes with the state
    // stored in the saved Memento
    console.log("CareTaker: Restoring Characters attributes from Memento");
    const memento = this.#mementos[index];
    this.#originator.memento = memento;
  }
}

class GameCharacter {
  #score: number;
  #inventory: Set<string>;
  #level: number;
  #location: { x: number; y: number; z: number };

  constructor() {
    this.#score = 0;
    this.#inventory = new Set();
    this.#level = 0;
    this.#location = { x: 0, y: 0, z: 0 };
  }

  public get score(): number {
    // A getter for the score"
    return this.#score;
  }

  registerKill(): void {
    // The character kills its enemies as it progresses
    this.#score += 100;
  }

  addInventory(item: string): void {
    // The character finds objects in the game
    this.#inventory.add(item);
  }

  progressToNextLevel(): void {
    // The character progresses to the next level
    this.#level = this.#level + 1;
  }

  moveForward(amount: number): void {
    // The character moves around the environment
    this.#location["z"] += amount;
  }

  status(): string {
    return (
      `Score: ${this.#score}, ` +
      `Level: ${this.#level}, ` +
      `Location: ${JSON.stringify(this.#location)}\n` +
      `Inventory: ${JSON.stringify(Array.from(this.#inventory))}`
    );
  }

  public get memento(): Memento {
    "A `getter` for the characters attributes as a Memento";
    return new Memento(this.#score, new Set(this.#inventory), this.#level, Object.assign({}, this.#location));
  }

  public set memento(value: Memento) {
    this.#score = value.score;
    this.#inventory = value.inventory;
    this.#level = value.level;
    this.#location = value.location;
  }
}

const GAME_CHARACTER = new GameCharacter();
const CARETAKER = new CareTaker(GAME_CHARACTER);

// start the game
GAME_CHARACTER.registerKill();
GAME_CHARACTER.moveForward(1);
GAME_CHARACTER.addInventory("sword");
GAME_CHARACTER.registerKill();
GAME_CHARACTER.addInventory("rifle");
GAME_CHARACTER.moveForward(1);
console.log(GAME_CHARACTER.status());

// save progress
CARETAKER.save();

GAME_CHARACTER.registerKill();
GAME_CHARACTER.moveForward(1);
GAME_CHARACTER.progressToNextLevel();
GAME_CHARACTER.registerKill();
GAME_CHARACTER.addInventory("motorbike");
GAME_CHARACTER.moveForward(10);
GAME_CHARACTER.registerKill();
console.log(GAME_CHARACTER.status());

// save progress
CARETAKER.save();
GAME_CHARACTER.moveForward(1);
GAME_CHARACTER.progressToNextLevel();
GAME_CHARACTER.registerKill();
console.log(GAME_CHARACTER.status());

// decide you made a mistake, go back to first save
CARETAKER.restore(0);
console.log(GAME_CHARACTER.status());

// continue
GAME_CHARACTER.registerKill();
