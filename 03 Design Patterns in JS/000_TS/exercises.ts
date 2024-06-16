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
