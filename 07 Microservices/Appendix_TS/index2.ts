class Vehicle {
  public color: string;
  constructor(color: string) {
    this.color = color;
  }

  protected honk(): void {
    console.log("beep");
  }
}

{
  //* The same as above -> Parameter properties pattern!
  // class Vehicle {
  //   constructor(public color: string) {}
  //   protected honk(): void {
  //     console.log("beep");
  //   }
  // }
}

// const vehicle = new Vehicle("orange");
// console.log("vehicle.color:", vehicle.color);

class Car extends Vehicle {
  public wheels: number;
  constructor(wheels: number, color: string) {
    super(color);
    this.wheels = wheels;
  }

  private drive(): void {
    console.log("vroom");
  }

  public startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car: Car = new Car(4, "red");
console.log("car:", car);
car.startDrivingProcess();

class Person {
  constructor(private firstName: string, private lastName: string) {
    this.firstName = firstName; // redundant?
    this.lastName = lastName; // redundant?
  }
  getName(): string {
    return `I am ${this.firstName} ${this.lastName}.`;
  }
}

class Employee extends Person {
  constructor(firstName: string, lastName: string, private jobTitle: string) {
    // Invoking the constructor of the Person class
    super(firstName, lastName);
    this.jobTitle = jobTitle; // redundant?
  }
  displayInfo(): void {
    console.log(super.getName());
    console.log(`My Job title is ${this.jobTitle}`);
  }
}
const employee = new Employee("X", "Y", "Web Developer");
employee.displayInfo();
