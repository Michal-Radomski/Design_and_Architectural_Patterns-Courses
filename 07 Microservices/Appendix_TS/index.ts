// Annotations
const point: { x: number; y: number } = {
  x: 10,
  y: 20,
};
console.log({ point });

const logNumber: (i: number) => void = (i: number): void => {
  console.log({ i });
};
logNumber(5);

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log("coordinates:", coordinates); // {x: 10, y: 20};

// 2) When we declare a variable on one line and initialize it later
const words = ["red", "green", "blue"];
let foundWord!: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = true;
  }
}
console.log({ foundWord });

// 3) Variable whose type cannot be inferred correctly
const numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
console.log({ numberAboveZero });

// Functions
const throwError = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
};

// Objects
{
  const profile = {
    name: "Alex",
    age: 20,
    coords: {
      lat: 0,
      lng: 15,
    },
    setAge(age: number): void {
      this.age = age;
    },
  };

  const { age, name }: { age: number; name: string } = profile;
  console.log({ age, name });

  const {
    coords: { lat, lng },
  }: { coords: { lat: number; lng: number } } = profile;
  console.log({ lat, lng });
}

// Flexible types
const importantDates: (Date | string)[] = [];
importantDates.push("2030-10-10");
importantDates.push(new Date());

// Tuples
const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40,
};

// Type alias
type Drink = [string, boolean, number];

const pepsi: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", true, 40];
const tea: Drink = ["brown", false, 0];

const carSpecs: [number, number] = [400, 3354];

const carStats = {
  horsepower: 400,
  weight: 3354,
};

{
  // Interfaces
  interface Reportable {
    summary(): string;
  }

  const oldCivic = {
    name: "civic",
    year: new Date(),
    broken: true,
    summary(): string {
      return `Name: ${this.name}`;
    },
  };

  const drink = {
    color: "brown",
    carbonated: true,
    sugar: 40,
    summary(): string {
      return `My drink has ${this.sugar} grams of sugar`;
    },
  };

  const printSummary = (item: Reportable): void => {
    console.log(item.summary());
  };

  printSummary(oldCivic);
  printSummary(drink);
}
