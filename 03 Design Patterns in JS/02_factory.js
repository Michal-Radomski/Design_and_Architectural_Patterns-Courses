CoordinateSystem = {
  CARTESIAN: 0,
  POLAR: 1,
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // constructor(a, b, cs=CoordinateSystem.CARTESIAN)
  // {
  //   switch (cs)
  //   {
  //     case CoordinateSystem.CARTESIAN:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinateSystem.POLAR:
  //       this.x = a * Math.cos(b);
  //       this.y = a * Math.sin(b);
  //       break;
  //   }

  //   // steps to add a new system
  //   // 1. augment CoordinateSystem
  //   // 2. change ctor
  // }

  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }

  static get factory() {
    return new PointFactory();
  }
}

class PointFactory {
  // not necessarily static
  newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const p1 = new Point(2, 3, CoordinateSystem.CARTESIAN);
console.log({ p1 });

// Point → PointFactory
const p2 = PointFactory.newPolarPoint(5, Math.PI / 2);
console.log({ p2 });

// this line will not work if newCartesianPoint is static!
const p3 = Point.factory.newCartesianPoint(2, 3);
console.log({ p3 });

//* Example 2
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// console.log("rl:", rl);

class HotDrink {
  consume() {}
}

class Tea extends HotDrink {
  consume() {
    console.log("This tea is nice with lemon!");
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

class HotDrinkFactory {
  prepare(amount) {
    /* abstract */
  }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

const AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
});

class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }

  makeDrink(type) {
    switch (type) {
      case "tea":
        return new TeaFactory().prepare(200);
      case "coffee":
        return new CoffeeFactory().prepare(50);
      default:
        throw new Error(`Don't know how to make ${type}`);
    }
  }

  interact(consumer) {
    rl.question("Please specify drink and amount " + "(e.g., tea 50): ", (answer) => {
      let parts = answer.split(" ");
      let name = parts[0];
      let amount = parseInt(parts[1]);
      let d = this.factories[name].prepare(amount);
      rl.close();
      consumer(d);
    });
  }
}

const machine = new HotDrinkMachine();
// rl.question('which drink? ', function(answer)
// {
//   let drink = machine.makeDrink(answer);
//   drink.consume();
//
//   rl.close();
// });
machine.interact(function (drink) {
  drink.consume();
});
