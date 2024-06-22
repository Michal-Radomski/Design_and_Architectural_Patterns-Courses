//* Reflect
const duck = {
  name: "Maurice",
  color: "white",
  greeting() {
    console.log(`Quaaaack! My name is ${this.name}`);
  },
};

console.log('Reflect.has(duck, "color")', Reflect.has(duck, "color")); // true
console.log('Reflect.has(duck, "haircut")', Reflect.has(duck, "haircut")); // false

//* Pre-increment (++i)
// The ++i operator increments the value of i before it is used in an expression.
//* Post-increment (i++)
// The i++ operator increments the value of i after it is used in an expression.

for (let i = 0; i < 10; ++i) {
  console.log(i); // Pre-increment: increments before each iteration
}

for (let i = 0; i < 10; i++) {
  console.log(i); // Post-increment: increments after each iteration
}

let i = 0;
if (++i === 1) {
  console.log("This will be logged"); // Pre-increment: i is incremented to 1 before the comparison
}

i = 0;
if (i++ === 1) {
  console.log("This will not be logged"); // Post-increment: i is incremented to 1 after the comparison
}

//* Symbol.iterator
class Range2 {
  constructor(public start: number, public end: number) {}

  [Symbol.iterator](): Iterator<number> {
    let current = this.start;
    const end = this.end;

    return {
      next(): IteratorResult<number> {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { value: null, done: true };
        }
      },
    };
  }
}

// Usage
const range2 = new Range2(1, 5);

for (const num of range2) {
  console.log(num); // Outputs: 1, 2, 3, 4, 5
}

class ItemCollection {
  private items: string[];

  constructor(items: string[]) {
    this.items = items;
  }

  [Symbol.iterator](): Iterator<string> {
    let index = 0;
    const items = this.items;

    return {
      next(): IteratorResult<string> {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: null, done: true };
        }
      },
    };
  }
}

// Usage
const collection = new ItemCollection(["apple", "banana", "cherry"]);

for (const item of collection) {
  console.log(item); // Outputs: 'apple', 'banana', 'cherry'
}
