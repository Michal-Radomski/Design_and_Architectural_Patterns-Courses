export {};
//* Observer Pattern
// The Observer pattern is a software design pattern in which an object, called the Subject (Observable), manages a list of dependents, called Observers, and notifies them automatically of any internal state changes by calling one of their method

// interface IObservable {
//   // The Subject Interface

//   subscribe(observer: IObserver): void;
//   // The subscribe method

//   unsubscribe(observer: IObserver): void;
//   // The unsubscribe method

//   notify(...args: unknown[]): void;
//   // The notify method
// }

// class Subject implements IObservable {
//   // The Subject (a.k.a Observable)
//   #observers: Set<IObserver>;
//   constructor() {
//     this.#observers = new Set();
//   }

//   subscribe(observer: IObserver) {
//     this.#observers.add(observer);
//   }

//   unsubscribe(observer: IObserver) {
//     this.#observers.delete(observer);
//   }

//   notify(...args: unknown[]) {
//     this.#observers.forEach((observer) => {
//       observer.notify(...args);
//     });
//   }
// }

// interface IObserver {
//   // A method for the Observer to implement

//   notify(...args: unknown[]): void;
//   // Receive notifications"
// }

// class Observer implements IObserver {
//   // The concrete observer
//   #id: number;

//   constructor(observable: IObservable) {
//     this.#id = COUNTER++;
//     observable.subscribe(this);
//   }

//   notify(...args: unknown[]) {
//     console.log(`OBSERVER_${this.#id} received ${JSON.stringify(args)}`);
//   }
// }

// // The Client
// let COUNTER = 1; // An ID to help distinguish between objects

// const SUBJECT = new Subject();
// const OBSERVER_1 = new Observer(SUBJECT);
// const OBSERVER_2 = new Observer(SUBJECT);

// SUBJECT.notify("First Notification", [1, 2, 3]);

// // Unsubscribe OBSERVER_2
// SUBJECT.unsubscribe(OBSERVER_2);

// SUBJECT.notify("Second Notification", { A: 1, B: 2, C: 3 });

//* Observer Design Pattern Use Case
interface IDataController {
  // A Subject Interface
  subscribe(observer: IDataModel): void;
  unsubscribe(observer: IDataModel): void;
  notify(data: number[]): void;
}

class DataController implements IDataController {
  // A Subject (a.k.a Observable)

  static instance: DataController;
  #observers: Set<IDataModel> = new Set();

  constructor() {
    if (DataController.instance) {
      return DataController.instance;
    }
    DataController.instance = this;
  }

  subscribe(observer: IDataModel): void {
    this.#observers.add(observer);
  }

  unsubscribe(observer: IDataModel): void {
    this.#observers.delete(observer);
  }

  notify(data: number[]): void {
    this.#observers.forEach((observer) => {
      observer.notify(data);
    });
  }
}

interface IDataModel {
  // A Subject Interface
  subscribe(observer: IDataView): number;
  unsubscribe(observerId: number): void;
  notify(data: number[]): void;
}

class DataModel implements IDataModel {
  // A Subject (a.k.a Observable)

  #observers: { [id: number]: IDataView } = {};
  #dataController: IDataController;
  #counter: number;

  constructor() {
    this.#counter = 0;
    this.#dataController = new DataController();
    this.#dataController.subscribe(this);
  }

  subscribe(observer: IDataView): number {
    this.#counter++;
    this.#observers[this.#counter] = observer;
    return this.#counter;
  }

  unsubscribe(observerId: number): void {
    delete this.#observers[observerId];
  }

  notify(data: number[]): void {
    Object.keys(this.#observers).forEach((observer) => {
      this.#observers[parseInt(observer)].notify(data);
    });
  }
}

interface IDataView {
  // A Subject Interface
  notify(data: number[]): void;
  draw(data: number[]): void;
  delete(): void;
}

class BarGraphView implements IDataView {
  // A concrete observer
  #observable: IDataModel;
  #id: number;

  constructor(observable: IDataModel) {
    this.#observable = observable;
    this.#id = this.#observable.subscribe(this);
  }

  notify(data: number[]): void {
    console.log(`BarGraph, id:${this.#id}`);
    this.draw(data);
  }

  draw(data: number[]): void {
    console.log(`Drawing a Bar graph using data:${JSON.stringify(data)}`);
  }

  delete(): void {
    this.#observable.unsubscribe(this.#id);
  }
}

class PieGraphView implements IDataView {
  // A concrete observer
  #observable: IDataModel;
  #id: number;

  constructor(observable: IDataModel) {
    this.#observable = observable;
    this.#id = this.#observable.subscribe(this);
  }

  notify(data: number[]): void {
    console.log(`PieGraph, id:${this.#id}`);
    this.draw(data);
  }

  draw(data: number[]): void {
    console.log(`Drawing a Pie graph using data:${data}`);
  }

  delete(): void {
    this.#observable.unsubscribe(this.#id);
  }
}

class TableView implements IDataView {
  // A concrete observer
  #observable: IDataModel;
  #id: number;

  constructor(observable: IDataModel) {
    this.#observable = observable;
    this.#id = this.#observable.subscribe(this);
  }

  notify(data: number[]): void {
    console.log(`TableView, id:${this.#id}`);
    this.draw(data);
  }

  draw(data: number[]): void {
    console.log(`Drawing a Table using data:${JSON.stringify(data)}`);
  }

  delete(): void {
    this.#observable.unsubscribe(this.#id);
  }
}

// A local data view that the hypothetical external controller updates
const DATA_MODEL = new DataModel();

// Add some visualization that use the dataview
const PIE_GRAPH_VIEW = new PieGraphView(DATA_MODEL);
const BAR_GRAPH_VIEW = new BarGraphView(DATA_MODEL);
const TABLE_VIEW = new TableView(DATA_MODEL);

// A hypothetical data controller running in a different process
const DATA_CONTROLLER = new DataController(); // (Singleton)

// The hypothetical external data controller updates some data
DATA_CONTROLLER.notify([1, 2, 3]);

// Client now removes a local BAR_GRAPH
BAR_GRAPH_VIEW.delete();

// The hypothetical external data controller updates the data again
DATA_CONTROLLER.notify([4, 5, 6]);
