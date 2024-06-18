//* There is only one instance of the class!
class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }

  foo() {
    console.log("Doing something...");
  }
}

let s1 = new Singleton();
let s2 = new Singleton();
console.log("Are they identical? " + (s1 === s2), typeof s1, s1); // true
s1.foo();

//* Example 2 -> Monostate
class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name is ${this.name} ` + `and he is ${this.age} years old.`;
  }
}
ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

let ceo = new ChiefExecutiveOfficer();
ceo.name = "Adam Smith";
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = "John Gold";
ceo2.age = 66;

console.log(ceo.toString()); // CEO's name is John Gold and he is 66 years old.!
console.log(ceo2.toString()); // CEO's name is John Gold and he is 66 years old.!
