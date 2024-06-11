export {};
//* Singleton Design Pattern
// Sometimes you need an object in an application where there is only one instance.

class Singleton {
  // The Singleton Class
  static instance: Singleton;
  id: number;

  constructor(id: number) {
    this.id = id;
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

// The Client
// All uses of the singleton point to the same original object

const OBJECT1 = new Singleton(1); // setting its id property to 1
const OBJECT2 = new Singleton(2); // setting its id property to 2

console.log("OBJECT1:", OBJECT1);
console.log("OBJECT2:", OBJECT2);

//* Singleton Use Case Example Code

interface Game {
  addWinner(position: number, name: string): void;
}

class Game1 implements Game {
  leaderboard: Leaderboard;

  constructor() {
    this.leaderboard = new Leaderboard();
  }

  addWinner(position: number, name: string): void {
    this.leaderboard.addWinner(position, name);
  }
}

class Game2 implements Game {
  leaderboard: Leaderboard;

  constructor() {
    this.leaderboard = new Leaderboard();
  }

  addWinner(position: number, name: string): void {
    this.leaderboard.addWinner(position, name);
  }
}

class Game3 implements Game {
  leaderboard: Leaderboard;

  constructor() {
    this.leaderboard = new Leaderboard();
  }

  addWinner(position: number, name: string): void {
    this.leaderboard.addWinner(position, name);
  }
}

class Leaderboard {
  static instance: Leaderboard;
  #table: { [id: number]: string } = {};

  constructor() {
    if (Leaderboard.instance) {
      return Leaderboard.instance;
    }
    Leaderboard.instance = this;
  }

  public addWinner(position: number, name: string): void {
    this.#table[position] = name;
  }

  public print(): void {
    console.log("----------Leaderboard-----------");
    for (const key in this.#table) {
      console.log(`${key}\t\t|\t${this.#table[key]}`);
    }
    console.log("End");
  }
}

// The Client
// Despite all games instantiating a leaderboard, they all point
// to the same memory object since the leaderboard is a singleton.
const GAME1 = new Game1();
GAME1.addWinner(2, "Cosmo");

const GAME2 = new Game2();
GAME2.addWinner(3, "Sean");

const GAME3 = new Game3();
GAME3.addWinner(1, "Emmy");

GAME1.leaderboard.print();
GAME2.leaderboard.print();
GAME3.leaderboard.print();
