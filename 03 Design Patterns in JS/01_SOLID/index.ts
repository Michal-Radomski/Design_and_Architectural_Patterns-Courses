import fs from "fs";

interface ObjectI {
  [key: string]: string | number | ObjectI;
}

//^ 1. Single Responsibility Principle
console.log("-----------------");
class Journal {
  entries: ObjectI;
  static count: number;
  constructor() {
    this.entries = {} as ObjectI;
  }

  addEntry(text: string) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    console.log({ c });
    return c;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  //* Moved to other class!
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
}
Journal.count = 0;

class PersistenceManager {
  load(filename: string) {
    console.log({ filename });
  }
  loadFromUrl(url: string) {
    console.log({ url });
  }
  saveToFile(journal: Journal, filename: fs.PathOrFileDescriptor) {
    fs.writeFileSync(filename, journal.toString());
  }
}

const j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");
console.log(j.toString());

const p = new PersistenceManager();
const filename = "./journal.txt";
p.saveToFile(j, filename);

//^ 2. Open-Closed Principle
console.log("-----------------");
const Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

const Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
  huge: "huge",
});

class Product {
  name: string;
  color: string;
  size: string;
  constructor(name: string, color: string, size: string) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// class ProductFilter {
//   filterByColor(products: Product[], color: any) {
//     return products.filter((p) => p.color === color);
//   }

//   filterBySize(products: Product[], size: string) {
//     return products.filter((p) => p.size === size);
//   }

//   filterBySizeAndColor(products: Product[], size: string, color: string) {
//     return products.filter((p) => p.size === size && p.color === color);
//   }

//   // state space explosion
//   // 3 criteria (+weight) = 7 methods

//   // OCP = open for extension, closed for modification
// }

const apple = new Product("Apple", Color.green, Size.small);
const tree = new Product("Tree", Color.green, Size.large);
const house = new Product("House", Color.blue, Size.large);

const products = [apple, tree, house];

// const pf = new ProductFilter();
// console.log(`Green products (old):`);
// for (let p of pf.filterByColor(products, Color.green))
//   console.log(` * ${p.name} is green`);
//* ↑↑↑ BEFORE

//* ↓↓↓ AFTER
// general interface for a specification
class ColorSpecification {
  color: string;
  constructor(color: string) {
    this.color = color;
  }

  isSatisfied(item: Product) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  size: string;
  constructor(size: string) {
    this.size = size;
  }

  isSatisfied(item: Product) {
    return item.size === this.size;
  }
}

class BetterFilter {
  filter(items: Product[], spec: ColorSpecification | SizeSpecification | AndSpecification) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

// specification combinator
class AndSpecification {
  specs: (ColorSpecification | SizeSpecification)[];
  constructor(...specs: (SizeSpecification | ColorSpecification)[]) {
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

const bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large products:`);
for (let p of bf.filter(products, new SizeSpecification(Size.large))) {
  console.log(` * ${p.name} is large`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(new ColorSpecification(Color.green), new SizeSpecification(Size.large));
for (let p of bf.filter(products, spec)) console.log(` * ${p.name} is large and green`);
