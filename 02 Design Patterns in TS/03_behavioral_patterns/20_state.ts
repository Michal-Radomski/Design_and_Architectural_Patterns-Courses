export {};
//* State Design Pattern
// The State Pattern is more concerned about changing the handle of an object's method dynamically. This makes an object itself more dynamic and may reduce the need of many conditional statements.

class Context {
  // This is the object whose behavior will change
  #stateHandles: IState[];
  #handle: IState | undefined;

  constructor() {
    this.#stateHandles = [new ConcreteStateA(), new ConcreteStateB(), new ConcreteStateC()];
    this.#handle = undefined;
  }

  request() {
    // A method of the state that dynamically changes which
    // class it uses depending on the value of this.#handle
    this.#handle = this.#stateHandles[Math.floor(Math.random() * 3)];
    return this.#handle;
  }
}

interface IState {
  // A State Interface
  toString(): string;
}

class ConcreteStateA implements IState {
  // A ConcreteState Subclass

  toString() {
    return "I am ConcreteStateA";
  }
}

class ConcreteStateB implements IState {
  // A ConcreteState Subclass

  toString() {
    return "I am ConcreteStateB";
  }
}

class ConcreteStateC implements IState {
  // A ConcreteState Subclass

  toString() {
    return "I am ConcreteStateC";
  }
}

// The Client
const CONTEXT = new Context();
console.log(CONTEXT.request());
console.log(CONTEXT.request());
console.log(CONTEXT.request());
console.log(CONTEXT.request());
console.log(CONTEXT.request());

//* The State Use Case Example
enum ExampleState {
  Initializing = "Initializing",
  Started = "Started",
  Running = "Running",
  Finished = "Finished",
}

interface IExampleState {
  // A State Interface
  request(): void;
}

class StateContext implements IExampleState {
  #state: ExampleState;

  constructor() {
    this.#state = ExampleState.Initializing;
  }

  public get state() {
    return this.#state;
  }

  public set state(value: ExampleState) {
    switch (value) {
      case ExampleState.Started:
        this.request = Started.prototype.request;
        break;
      case ExampleState.Running:
        this.request = Running.prototype.request;
        break;
      case ExampleState.Finished:
        this.request = Finished.prototype.request;
        break;
    }
    this.#state = value;
  }

  request() {
    // Does nothing until state changes, when then
    // this method handle is reassigned to a different
    // concrete states request method
  }
}

class Started implements IExampleState {
  // A ConcreteState Subclass
  request() {
    console.log(`I am now Started`);
  }
}

class Running implements IExampleState {
  // A ConcreteState Subclass
  request() {
    console.log(`I am now Running`);
  }
}

class Finished implements IExampleState {
  // A ConcreteState Subclass
  request() {
    console.log(`I am now Finished`);
  }
}

// The Client
const STATE_CONTEXT = new StateContext();
console.log("STATE_CONTEXT = " + STATE_CONTEXT.state);
STATE_CONTEXT.state = ExampleState.Started;
STATE_CONTEXT.request();
STATE_CONTEXT.state = ExampleState.Running;
STATE_CONTEXT.request();
STATE_CONTEXT.state = ExampleState.Finished;
STATE_CONTEXT.request();
STATE_CONTEXT.state = ExampleState.Started;
STATE_CONTEXT.request();
STATE_CONTEXT.state = ExampleState.Running;
STATE_CONTEXT.request();
STATE_CONTEXT.state = ExampleState.Finished;
STATE_CONTEXT.request();
