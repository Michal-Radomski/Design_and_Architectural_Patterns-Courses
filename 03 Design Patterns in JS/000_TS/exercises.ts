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
