export {};
//* Prototype Design Pattern
// The Prototype design pattern is good for when creating new objects requires more resources than you want to use or have available. You can save resources by just creating a copy of any existing object that is already in memory.

interface IProtoType {
  // interface with clone method
  clone(): this;
}

class MyClass implements IProtoType {
  // A Concrete Class
  field: number[];

  constructor(field: number[]) {
    this.field = field; // any value of any type
  }

  clone() {
    // return Object.assign({}, this); //* shallow copy
    return JSON.parse(JSON.stringify(this)); //* deep copy
  }
}

// The Client
// Create an object containing an array
const object1 = new MyClass([1, 2, 3, 4]);
console.log(`object1: ${JSON.stringify(object1)}`);

const object2 = object1.clone(); // Clone
console.log(`object2: ${JSON.stringify(object2)}`);
object2.field[1] = 101;

// Comparing object1 and object2
console.log("object1:", object1);
console.log("object2:", object2);
