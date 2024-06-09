// function foo(bar: string): string {
//   return `Hello: ${bar}`;
// }

// const baz = "Abc";
// console.log("foo(baz):", foo(baz));

// let foo: string;
// let bar: boolean;
// let baz: number;
// let qux: string[];
// let quuz: [number, string];
// let corge: { [key: number]: string }; //* Dictionary
// let grault: Set<number>;

// foo = "ABC";
// bar = true;
// baz = 123;
// qux = ["a", "b", "c"];
// quuz = [1, "abc"];
// corge = { 123: "abc", 456: "def" }; //* Dictionary
// grault = new Set([1, 2, 3]);

//* Types
// const foo: string = "string";
// const bar: boolean = true;

//* Number are transpiled to decimal
// let baz: number;
// baz = 123; // decimal
// console.log("baz:", baz);
// baz = 123.456; // float
// console.log("baz:", baz);
// baz = 0xffff; // hex //* 65535
// console.log("baz:", baz);
// baz = 0b10101; // binary //* 21
// console.log("baz:", baz);
// baz = 0o671; // octal //* 441
// console.log("baz:", baz);

// const a: string[] = ["a", "b", "d", "d"];
// console.log("a[0]", a[0]);

//* Dictionary: key-value pairs
// let a: { [key: number]: string };
// const a: { [key: number]: string } = { 123: "abc", 456: "def" };
// const b: { [key: string]: boolean } = { abc: true, def: false, ghi: true };
// console.log("a[123]:", a[123]);
// console.log('b["def"]:', b["def"]);

// let a: { [key: string]: string };
// let b: { [id: number]: string };
// a = { a: "car", b: "train", c: "plane", d: "boat" };
// b = { 1: "car", 2: "train", 3: "plane", 4: "boat" };
// // and can be retrieved as such
// console.log(a["a"]);
// console.log(b[2]);
// // Since Dictionaries are really just objects. You can also retrieve
// // a dictionary's value using object notation if the keys are strings
// console.log(a.c);
// //* console.log(b.2) // this doesn't work when the key is a number

// // you can add items to a dictionary
// a["e"] = "go-cart";
// console.log(a);

// // you can delete
// delete b[2];
// console.log(b);

// // The values of a dictionary can be of any type, even an array.
// let c: { [id: number]: number[] };
// c = { 1: [1, 2, 3], 2: [4, 5, 6], 3: [7, 8, 9], 4: [10, 11, 12] };
// console.log("c:", c);

//* Tuple (like an array only in TS)
// let a: [number, string];
// a = [1, "abc"];
// let b: [string, boolean, number];
// b = ["abc", false, 123];

// console.log(a[1]);
// console.log(b[2]);

//* Set
// let a: Set<number>;
// a = new Set([1, 2, 3, 4]);
// let b: Set<string>;
// b = new Set(["a", "b", "c", "d", "a"]); // The second `a` is not added
// let c: Set<unknown>;
// c = new Set([1, "b", true]);

// console.log(a); // Set(4) { 1, 2, 3, 4 }
// console.log(b); // Set(4) { 'a', 'b', 'c', 'd' }
// console.log(c); // Set(3) { 1, 'b', true }

// const a: Set<string> = new Set();
// // adding items
// a.add("cat");
// a.add("dog");
// a.add("bird");
// console.log(a); // Set(3) { 'cat', 'dog', 'bird' }

// // remove an item
// a.delete("dog");
// console.log(a); // Set(2) { 'cat', 'bird' }

// // Retrieve an individual item.
// console.log("Array.from(a)[1]:", Array.from(a)[1]); // bird

// // The great thin about a set compared to an array, is that all
// // items are guaranteed to be unique. No duplicates allowed.
// a.add("bird");
// a.add("bird");
// console.log(a); // Set(2) { 'cat', 'bird' }

// // Get the length of the Set
// console.log(a.size); // 2

// // Check if a Set has a value
// console.log(a.has("cat")); // true

//* Classes
// class Cat {
//   constructor() {}

//   walk(): void {
//     console.log("Cat is walking");
//   }
// }

// const cat = new Cat();
// cat.walk(); // Cat is walking

// class Cat {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   walk(steps: number): void {
//     console.log(this.name + " the cat has walked " + steps + " steps.");
//   }
// }

// const cat = new Cat("Cosmo");
// cat.walk(20); // Cosmo the cat, has walked 20 steps.

// class Cat {
//   name: string;
//   stepsWalked: number = 0;

//   constructor(name: string) {
//     this.name = name;
//   }

//   walk(steps: number): void {
//     console.log(this.name + " the cat has walked " + steps + " steps.");
//     this.stepsWalked += steps;
//   }

//   totalStepCount(): number {
//     return this.stepsWalked;
//   }
// }

// const cat = new Cat("Cosmo");
// cat.walk(20);
// cat.walk(20);
// cat.walk(10);
// console.log(cat.name + " the cat, has walked a total of " + cat.totalStepCount() + " steps.");

//* Interfaces
// interface IAnimal {
//     name: string
//     age?: number
// }

// class Cat implements IAnimal {
//     name: string

//     constructor(name: string) {
//         this.name = name
//     }
// }

// interface IAnimal {
//   name: string;
//   age: number;

//   feed?(food: string, amount: number): void;
// }

// class Cat implements IAnimal {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }

// interface IAnimal {
//   name: string;
//   age: number;

//   feed(food: string, amount: number): void;
// }

// class Cat implements IAnimal {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }

//   feed(food: string, amount: number): void {
//     console.log("Feeding " + this.name + " the Cat " + amount + " kg of " + food);
//   }
// }

// class Dog implements IAnimal {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }

//   feed(food: string, amount: number): void {
//     console.log("Feeding " + this.name + " the Dog " + amount + " kg of " + food);
//   }
// }

// const cat = new Cat("Cosmo", 8);
// const dog = new Dog("Rusty", 12);
// cat.feed("Fish", 0.1); // Feeding Cosmo the Cat, 0.1kg of Fish
// dog.feed("Beef", 0.25); // Feeding Rusty the Dog, 0.25kg of Beef

//* Extending Classes
// class Animal {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }

//   feed(food: string, amount: number): void {
//     console.log("Feeding " + this.name + " the " + this.constructor.name + " " + amount + " kg of " + food);
//   }
// }

// class Cat extends Animal {
//   isHungry: boolean;
//   constructor(name: string, age: number, isHungry: boolean) {
//     super(name, age);
//     this.isHungry = isHungry;
//   }

//   feed(food: string, amount: number): void {
//     if (this.isHungry) {
//       super.feed(food, amount);
//     } else {
//       console.log(this.name + " the " + this.constructor.name + " is not hungry");
//     }
//   }
// }

// class Dog extends Animal {}

// const cat = new Cat("Cosmo", 8, false);
// const cat2 = new Cat("Cosmo", 8, true);
// const dog = new Dog("Rusty", 12);
// cat.feed("Fish", 0.1); // Feeding Cosmo the Cat, 0.1kg of Fish
// dog.feed("Beef", 0.25); // Feeding Rusty the Dog, 0.25kg of Beef
// cat2.feed("Fish", 0.1); // Feeding Cosmo the Cat 0.1 kg of Fish

//* Abstract Classes (Abstract classes are like a mixture of implementing interfaces and extending a class in one step)
// abstract class Animal {
//   abstract name: string;
//   age: number;

//   constructor(age: number) {
//     // this.name = name //* this must now be assigned in the derived class instead
//     this.age = age;
//   }

//   feed(food: string, amount: number): void {
//     console.log("Feeding " + this.name + " the " + this.constructor.name + " " + amount + " kg of " + food);
//   }
// }

// // const animal = new Animal(); //* Cannot create an instance of an abstract class.ts(2511)

// class Cat extends Animal {
//   name: string;
//   constructor(name: string, age: number) {
//     super(age);
//     this.name = name;
//   }
// }

// class Dog extends Animal {
//   name: string;
//   constructor(name: string, age: number) {
//     super(age);
//     this.name = name;
//   }
// }

// const cat = new Cat("Cosmo", 8);
// const dog = new Dog("Rusty", 12);
// cat.feed("Fish", 0.1); // Feeding Cosmo the Cat 0.1 kg of Fish
// dog.feed("Beef", 0.25); // Feeding Rusty the Dog 0.25 kg of Beef

// abstract class Animal {
//   abstract name: string;
//   age = -1; //* Setting a default value is optional.

//   constructor() {}

//   // abstract feed(food: string, amount: number): void {
//   //   console.log("Feeding " + this.name + " the Cat " + amount + " kg of " + food);
//   // } //* Method 'feed' cannot have an implementation because it is marked abstract.ts(1245)
//   // abstract feed(food: string, amount: number): void;
// }

// class Cat extends Animal {
//   name: string;
//   constructor(name: string, age: number) {
//     super();
//     this.name = name;
//     this.age = age;
//   }

//   feed(food: string, amount: number): void {
//     console.log("Feeding " + this.name + " the Cat " + amount + " kg of " + food);
//   }
// }

// class Dog extends Animal {
//   name: string;
//   constructor(name: string, age: number) {
//     super();
//     this.name = name;
//     this.age = age;
//   }

//   feed(food: string, amount: number): void {
//     console.log("Feeding " + this.name + " the Dog " + amount + " kg of " + food);
//   }
// }

// const cat = new Cat("Cosmo", 8);
// const dog = new Dog("Rusty", 12);
// cat.feed("Fish", 0.1); // Feeding Cosmo the Cat 0.1 kg of Fish
// dog.feed("Beef", 0.25); // Feeding Rusty the Dog 0.25 kg of Beef

//* Access Modifiers
// class Cat {
//   public name: string; //* public is default!

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const cat = new Cat("Cosmo");
// console.log(cat.name); // Cosmo

// class Cat {
//   private name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const cat = new Cat("Cosmo");
// console.log(cat.name); //* Property 'name' is private and only accessible within class 'Cat'.ts(2341)

// class Cat {
//   #name: string;
//   constructor(name: string) {
//     this.#name = name;
//   }
// }

// const cat = new Cat("Cosmo");
// console.log(cat.#name); //* Property '#name' is not accessible outside class 'Cat' because it has a private identifier.ts(18013)

class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
    console.log(this.name);
  }
}

const cat = new Cat("Cosmo", 8);
console.log(cat.name); //* Property 'name' is protected and only accessible within class 'Animal' and its subclasses.ts(2445)
