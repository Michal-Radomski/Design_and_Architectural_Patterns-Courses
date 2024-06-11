export {};
//* Prototype Design Pattern
// The Prototype design pattern is good for when creating new objects requires more resources than you want to use or have available. You can save resources by just creating a copy of any existing object that is already in memory.

// interface IProtoType {
//   // interface with clone method
//   clone(): this;
// }

// class MyClass implements IProtoType {
//   // A Concrete Class
//   field: number[];

//   constructor(field: number[]) {
//     this.field = field; // any value of any type
//   }

//   clone() {
//     // return Object.assign({}, this); //* shallow copy
//     return JSON.parse(JSON.stringify(this)); //* deep copy
//   }
// }

// // The Client
// // Create an object containing an array
// const object1 = new MyClass([1, 2, 3, 4]);
// console.log(`object1: ${JSON.stringify(object1)}`);

// const object2 = object1.clone(); // Clone
// console.log(`object2: ${JSON.stringify(object2)}`);
// object2.field[1] = 101;

// // Comparing object1 and object2
// console.log(`object1: ${JSON.stringify(object1)}`);
// console.log(`object2: ${JSON.stringify(object2)}`);

// // const object3 = object2.clone(); //* Error
// // console.log(`object3: ${JSON.stringify(object3)}`);

//* Prototype Use Case Example Code

interface IProtoType {
  // interface with clone method
  clone(mode: number): Document;
  // The clone, deep or shallow.
  // It is up to you how you  want to implement
  // the details in your concrete class"""
}

class Document implements IProtoType {
  name: string;
  array: [number[], number[]];

  constructor(name: string, array: [number[], number[]]) {
    this.name = name;
    this.array = array;
  }

  customMethod() {
    console.log("Custom method");
  }

  clone(mode: number): Document {
    // This clone method uses different copy techniques
    let array;
    if (mode === 2) {
      // results in a deep copy of the Document
      array = JSON.parse(JSON.stringify(this.array));
    } else {
      // default, results in a shallow copy of the Document
      array = Object.assign([], this.array);
    }
    return new Document(this.name, array);
  }
}

// Creating a document containing an array of two arrays
const ORIGINAL_DOCUMENT = new Document("Original", [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
]);
console.log("ORIGINAL_DOCUMENT:", ORIGINAL_DOCUMENT);

const DOCUMENT_COPY_1 = ORIGINAL_DOCUMENT.clone(1); // shallow copy
DOCUMENT_COPY_1.name = "Copy 1";
// This also modified ORIGINAL_DOCUMENT because of the shallow copy
// when using mode 1
DOCUMENT_COPY_1.array[1][2] = 200;
console.log("DOCUMENT_COPY_1:", DOCUMENT_COPY_1);
console.log("ORIGINAL_DOCUMENT:", ORIGINAL_DOCUMENT);

const DOCUMENT_COPY_2 = ORIGINAL_DOCUMENT.clone(1); // shallow copy
DOCUMENT_COPY_2.name = "Copy 2";
// This does NOT modify ORIGINAL_DOCUMENT because it changes the
// complete array[1] reference that was shallow copied when using mode 1
DOCUMENT_COPY_2.array[1] = [9, 10, 11, 12];
console.log("DOCUMENT_COPY_2:", DOCUMENT_COPY_2);
console.log("ORIGINAL_DOCUMENT:", ORIGINAL_DOCUMENT);

const DOCUMENT_COPY_3 = ORIGINAL_DOCUMENT.clone(2); // deep copy
DOCUMENT_COPY_3.name = "Copy 3";
// This does modify ORIGINAL_DOCUMENT because it changes the element of
// array[1][0] that was deep copied recursively when using mode 2
DOCUMENT_COPY_3.array[1][0] = 1234;
console.log("DOCUMENT_COPY_3:", DOCUMENT_COPY_3);
console.log("ORIGINAL_DOCUMENT:", ORIGINAL_DOCUMENT);

DOCUMENT_COPY_3.customMethod();
