//* Explicit Copying
// class Address {
//   constructor(streetAddress, city, country) {
//     this.streetAddress = streetAddress;
//     this.city = city;
//     this.country = country;
//   }

//   deepCopy() {
//     return new Address(this.streetAddress, this.city, this.country);
//   }

//   toString() {
//     return `Address: ${this.streetAddress}, ` + `${this.city}, ${this.country}`;
//   }
// }

// class Person {
//   constructor(name, address) {
//     this.name = name;
//     this.address = address; //!
//   }

//   deepCopy() {
//     return new Person(
//       this.name,
//       this.address.deepCopy() // needs to be recursive
//     );
//   }

//   toString() {
//     return `${this.name} lives at ${this.address}`;
//   }
// }

// const john = new Person("John", new Address("123 London Road", "London", "UK"));

// // const jane = john //* Bad copying!
// const jane = john.deepCopy();

// jane.name = "Jane";
// jane.address.streetAddress = "321 Angel St"; // oops

// console.log(john.toString()); // John lives at Address: 123 London Road, London, UK
// console.log(jane.toString()); // Jane lives at Address: 321 Angel St, London, UK

//* Copy Through Serialization
class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address: ${this.streetAddress}, ` + `${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address; //!
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    console.log(`Hi, my name is ${this.name}, ` + `I live at ${this.address.toString()}`);
  }
}

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    // anoint each object with a type index
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object["typeIndex"] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) this.markRecursive(object[key]);
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

const john = new Person("John", new Address("123 London Road", "London", "UK"));

let jane = JSON.parse(JSON.stringify(john));

jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

john.greet();
// jane.greet(); //* this won't work

// try a dedicated serializer
const s = new Serializer([Person, Address]); // pain point
jane = s.clone(john);

jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString()); // John lives at Address: 123 London Road, London, UK
console.log(jane.toString()); // Jane lives at Address: 321 Angel St, London, UK
