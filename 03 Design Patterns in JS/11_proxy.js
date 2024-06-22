class Percentage {
  constructor(percent) {
    this.percent = percent; // 0 to 100
  }

  toString() {
    return `${this.percent}%`;
  }

  valueOf() {
    return this.percent / 100;
  }
}

const fivePercent = new Percentage(5);
console.log(`${fivePercent} of 50 is ${50 * fivePercent}`);

//* Example2
class Property {
  constructor(value, name = "") {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }
  set value(newValue) {
    if (this._value === newValue) return;
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature {
  constructor() {
    this._agility = new Property(10, "agility");
  }

  get agility() {
    return this._agility.value;
  }
  set agility(value) {
    this._agility.value = value;
  }
}

const c = new Creature();
c.agility = 12;
c.agility = 13;
