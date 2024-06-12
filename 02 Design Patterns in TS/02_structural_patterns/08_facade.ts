export {};
//* Facade Design Pattern
// Sometimes you have a system that becomes quite complex over time as more features are added or modified. It may be useful to provide a simplified API over it. This is the Facade pattern.

//* The Facade pattern concept

class SubSystemClassA {
  // A hypothetically complicated class
  method(): string {
    return "A";
  }
}

class SubSystemClassB {
  // A hypothetically complicated class
  method(value: string): string {
    return value;
  }
}

class SubSystemClassC {
  // A hypothetically complicated class
  method(value: { C: number[] }): { C: number[] } {
    return value;
  }
}

class Facade {
  // A simplified facade offering the services of subsystems
  subSystemClassA(): string {
    // Uses the subsystems method
    return new SubSystemClassA().method();
  }

  subSystemClassB(value: string): string {
    // Uses the subsystems method
    return new SubSystemClassB().method(value);
  }

  subSystemClassC(value: { C: number[] }): { C: number[] } {
    // Uses the subsystems method
    return new SubSystemClassC().method(value);
  }
}

// The Client
// Calling potentially complicated subsystems directly
console.log(new SubSystemClassA().method());
console.log(new SubSystemClassB().method("B"));
console.log(JSON.stringify(new SubSystemClassC().method({ C: [1, 2, 3] })));

// or using the simplified facade instead
const FACADE = new Facade();
console.log(FACADE.subSystemClassA());
console.log(FACADE.subSystemClassB("B"));
console.log(JSON.stringify(FACADE.subSystemClassC({ C: [1, 2, 3] })));
