export {};
//* Facade Design Pattern
// Sometimes you have a system that becomes quite complex over time as more features are added or modified. It may be useful to provide a simplified API over it. This is the Facade pattern.

//* The Facade pattern concept

class SubSystemClassA {
  // A hypothetically complicated class
  method(): string {
    return "A";
  }
}

class SubSystemClassB {
  // A hypothetically complicated class
  method(value: string): string {
    return value;
  }
}

class SubSystemClassC {
  // A hypothetically complicated class
  method(value: { C: number[] }): { C: number[] } {
    return value;
  }
}

class Facade {
  // A simplified facade offering the services of subsystems
  subSystemClassA(): string {
    // Uses the subsystems method
    return new SubSystemClassA().method();
  }

  subSystemClassB(value: string): string {
    // Uses the subsystems method
    return new SubSystemClassB().method(value);
  }

  subSystemClassC(value: { C: number[] }): { C: number[] } {
    // Uses the subsystems method
    return new SubSystemClassC().method(value);
  }
}

// The Client
// Calling potentially complicated subsystems directly
console.log(new SubSystemClassA().method());
console.log(new SubSystemClassB().method("B"));
console.log(JSON.stringify(new SubSystemClassC().method({ C: [1, 2, 3] })));

// or using the simplified facade instead
const FACADE = new Facade();
console.log(FACADE.subSystemClassA());
console.log(FACADE.subSystemClassB("B"));
console.log(JSON.stringify(FACADE.subSystemClassC({ C: [1, 2, 3] })));

//* The Facade Example Use Case
type GameState = {
  clock: number;
  gameOpen: boolean;
  entries: [string, number][];
};

class GameEngine {
  static instance: GameEngine;
  #startTime = 0;
  #clock = 0;
  #entries: [string, number][] = [];
  #gameOpen = true;
  #reports = new Reports();
  #wallets = new Wallets();

  constructor() {
    if (GameEngine.instance) {
      return GameEngine.instance;
    }
    this.#startTime = Math.floor(Date.now() / 1000);
    this.#clock = 60;
    GameEngine.instance = this;
  }

  getGameState(): GameState {
    // Get a snapshot of the current game state
    const now = Math.floor(Date.now() / 1000);
    let timeRemaining = this.#startTime - now + this.#clock;
    console.log("getGameState " + timeRemaining);
    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
    this.#gameOpen = false;
    return {
      clock: timeRemaining,
      gameOpen: this.#gameOpen,
      entries: this.#entries,
    } as GameState;
  }

  submitEntry(userId: string, entry: number): boolean {
    // Submit a new entry for the user in this game
    const now = Math.floor(Date.now() / 1000);
    const time_remaining = this.#startTime - now + this.#clock;
    if (time_remaining > 0) {
      if (this.#wallets.getBalance(userId) > 1) {
        if (this.#wallets.adjustBalance(userId, -1)) {
          this.#entries.push([userId, entry]);
          this.#reports.logEvent(`New entry '${entry}' submitted by '${userId}'`);
          return true;
        }
        this.#reports.logEvent(`Problem adjusting balance for '${userId}'`);
        return false;
      }
      this.#reports.logEvent(`User Balance for '${userId}' to low`);
      return false;
    }
    this.#reports.logEvent("Game Closed");
    return false;
  }
}

class Reports {
  static instance: Reports;
  #reports: { [id: string]: [number, string] } = {};
  #rowId = 0;

  constructor() {
    if (Reports.instance) {
      return Reports.instance;
    }
    Reports.instance = this;
  }

  getHistory(): { [id: string]: [number, string] } {
    return this.#reports;
  }

  logEvent(event: string): boolean {
    this.#reports[this.#rowId] = [Date.now(), event];
    this.#rowId = this.#rowId + 1;
    return true;
  }
}

class Users {
  static instance: Users;
  #users: { [id: string]: { [id: string]: string } } = {};
  #reports = new Reports();
  #wallets = new Wallets();

  constructor() {
    if (Users.instance) {
      return Users.instance;
    }
    Users.instance = this;
  }

  registerUser(newUser: { [id: string]: string }): string {
    // register a user
    if (!(newUser["user_name"] in this.#users)) {
      // generate really complicated unique user_id.
      // Using the existing user_name as the id for simplicity
      const userId = newUser["user_name"];
      this.#users[userId] = newUser;
      this.#reports.logEvent(`new user '${userId}' created`);
      // create a wallet for the new user
      this.#wallets.createWallet(userId);
      // give the user a sign up bonus
      this.#reports.logEvent(`Give new user '${userId}' sign up bonus of 10`);
      this.#wallets.adjustBalance(userId, 10);
      return userId;
    }
    return "";
  }

  editUser(userId: string, user: { [id: string]: string }): boolean {
    // do nothing. Not implemented yet
    console.log("userId:", userId);
    console.log("user:", user);

    return false;
  }

  changePwd(userId: string, password: string): boolean {
    // do nothing. Not implemented yet
    console.log("userId:", userId);
    console.log("password:", password);
    return false;
  }
}

class Wallets {
  static instance: Wallets;
  #wallets: { [id: string]: number } = {};
  #reports = new Reports();

  constructor() {
    if (Wallets.instance) {
      return Wallets.instance;
    }
    Wallets.instance = this;
  }

  createWallet(userId: string): boolean {
    // A method to initialize a users wallet
    if (!(userId in this.#wallets)) {
      this.#wallets[userId] = 0;
      this.#reports.logEvent(`wallet for '${userId}' created and set to 0`);
      return true;
    }
    return false;
  }

  getBalance(userId: string): number {
    // A method to check a users balance
    this.#reports.logEvent(`Balance check for '${userId}' = ${this.#wallets[userId]}`);
    return this.#wallets[userId];
  }

  adjustBalance(userId: string, amount: number): number {
    // A method to adjust a user balance up or down
    this.#wallets[userId] = this.#wallets[userId] + amount;
    this.#reports.logEvent(`Balance adjustment for '${userId}'. New balance = ${this.#wallets[userId]}`);
    return this.#wallets[userId];
  }
}

class GameAPI {
  #wallets: Wallets;
  #reports: Reports;
  #users: Users;
  #gameEngine: GameEngine;

  constructor() {
    this.#wallets = new Wallets();
    this.#reports = new Reports();
    this.#users = new Users();
    this.#gameEngine = new GameEngine();
  }

  getBalance(userId: string): number {
    // Get a players balance
    return this.#wallets.getBalance(userId);
  }

  gameState(): GameState {
    // Get the current game state
    return this.#gameEngine.getGameState();
  }

  getHistory(): { [id: string]: [number, string] } {
    // get the game history
    return this.#reports.getHistory();
  }

  changePwd(userId: string, password: string): boolean {
    // change users password
    return this.#users.changePwd(userId, password);
  }

  submitEntry(userId: string, entry: number): boolean {
    // submit a bet
    return this.#gameEngine.submitEntry(userId, entry);
  }

  registerUser(value: { [id: string]: string }): string {
    // register a new user and returns the new id
    return this.#users.registerUser(value);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function facadeExample() {
  const gameAPI = new GameAPI();

  const user = { user_name: "sean" };
  const userId = gameAPI.registerUser(user);

  await sleep(500);

  gameAPI.submitEntry(userId, 5);

  await sleep(500);

  console.log("---- GameState Snapshot ----");
  console.log(JSON.stringify(gameAPI.gameState()));

  await sleep(1000);

  const HISTORY = gameAPI.getHistory();

  console.log("");
  console.log("");
  console.log("---- Reports History ----");

  Object.keys(HISTORY).forEach((key) => {
    console.log(`${key} : ${HISTORY[key][0]} : ${HISTORY[key][1]}`);
  });

  await sleep(1000);

  console.log("");
  console.log("");
  console.log("---- User Balance ----");
  console.log(user.user_name + " : " + gameAPI.getBalance(userId));

  await sleep(1000);

  console.log("");
  console.log("");
  console.log("---- GameState Snapshot ----");
  console.log(JSON.stringify(gameAPI.gameState()));
}
facadeExample();
