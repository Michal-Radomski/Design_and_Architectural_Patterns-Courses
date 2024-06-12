export {};
//* Command Design Pattern
// The Command pattern is a behavioral design pattern, in which an abstraction exists between an object that invokes a command, and the object that performs it.

interface ICommand {
  execute(): void;
}

class Invoker {
  // The Invoker Class
  #commands: { [id: string]: ICommand };

  constructor() {
    this.#commands = {};
  }

  register(commandName: string, command: ICommand) {
    // Register commands in the Invoker
    this.#commands[commandName] = command;
  }

  execute(commandName: string) {
    // Execute any registered commands
    if (commandName in this.#commands) {
      this.#commands[commandName].execute();
    } else {
      console.log(`Command [${commandName}] not recognized`);
    }
  }
}

class Receiver {
  // The Receiver

  runCommand1() {
    // A set of instructions to run
    console.log("Executing Command 1");
  }

  runCommand2() {
    // A set of instructions to run
    console.log("Executing Command 2");
  }
}

class Command1 implements ICommand {
  // A Command object, that implements the ICommand interface and
  // runs the command on the designated receiver

  #receiver: Receiver;

  constructor(receiver: Receiver) {
    this.#receiver = receiver;
  }

  execute() {
    this.#receiver.runCommand1();
  }
}

class Command2 implements ICommand {
  // A Command object, that implements the ICommand interface and
  // runs the command on the designated receiver

  #receiver: Receiver;

  constructor(receiver: Receiver) {
    this.#receiver = receiver;
  }

  execute() {
    this.#receiver.runCommand2();
  }
}

// The Client
// Create a receiver
const RECEIVER = new Receiver();

// Create Commands
const COMMAND1 = new Command1(RECEIVER);
const COMMAND2 = new Command2(RECEIVER);

// Register the commands with the invoker
const INVOKER = new Invoker();
INVOKER.register("1", COMMAND1);
INVOKER.register("2", COMMAND2);

// Execute the commands that are registered on the Invoker
INVOKER.execute("1");
INVOKER.execute("2");
INVOKER.execute("1");
INVOKER.execute("2");

//* The Command Pattern Use Case Example. A smart light Switch
interface ICommand {
  execute(): void;
}

interface ISwitchCommand {
  execute(commandName: string): void;
}

class Light {
  turnOn(): void {
    // A set of instructions to run
    console.log("Light turned ON");
  }

  turnOff(): void {
    // A set of instructions to run
    console.log("Light turned OFF");
  }
}

class SwitchOnCommand implements ISwitchCommand {
  #light: Light;

  constructor(light: Light) {
    this.#light = light;
  }

  execute(): void {
    this.#light.turnOn();
  }
}

class SwitchOffCommand implements ISwitchCommand {
  #light: Light;

  constructor(light: Light) {
    this.#light = light;
  }

  execute(): void {
    this.#light.turnOff();
  }
}

class Switch {
  #commands: { [id: string]: ICommand };
  #history: [number, string][];

  constructor() {
    this.#commands = {};
    this.#history = [];
  }

  showHistory(): void {
    // Print the history of each time a command was invoked"
    this.#history.forEach((row) => {
      console.log(`${row[0]} : ${row[1]}`);
    });
  }

  register(commandName: string, command: ICommand): void {
    // Register commands in the Invoker
    this.#commands[commandName] = command;
  }

  execute(commandName: string): void {
    // Execute any registered commands
    if (commandName in this.#commands) {
      this.#commands[commandName].execute();
      this.#history.push([Date.now(), commandName]);
    } else {
      console.log(`Command [${commandName}] not recognized`);
    }
  }

  replayLast(numberOfCommands: number): void {
    // Replay the last N commands
    const commands = this.#history.slice(this.#history.length - numberOfCommands, this.#history.length);
    commands.forEach((command) => {
      this.#commands[command[1]].execute();
      // or if you wanted to also record this replay in history
      // this.execute(command[1])
    });
  }
}

// Create a receiver
const LIGHT = new Light();

// Create Commands
const SWITCH_ON = new SwitchOnCommand(LIGHT);
const SWITCH_OFF = new SwitchOffCommand(LIGHT);

// Register the commands with the invoker
const SWITCH = new Switch();
SWITCH.register("ON", SWITCH_ON);
SWITCH.register("OFF", SWITCH_OFF);

// Execute the commands that are registered on the Invoker
SWITCH.execute("ON");
SWITCH.execute("OFF");
SWITCH.execute("ON");
SWITCH.execute("OFF");

// show history
SWITCH.showHistory();

// replay last two executed commands
SWITCH.replayLast(2);
