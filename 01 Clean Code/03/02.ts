//@ Factory Functions & Polymorphism

function buildUser(name: string, age: number) {
  return {
    name: name,
    age: age,
  };
}

const user = buildUser("Michal", 100);
console.log({ user });

function buildUserByType(name: string, type: string) {
  let greetFn;
  if (type === "friendly") {
    greetFn = function () {
      console.log("Hi, nice to meet you!");
    };
  } else if (type === "unfriendly") {
    greetFn = function () {
      console.log("Hm? What do you want?");
    };
  }

  return {
    name: name,
    greet: greetFn as Function,
  };
}

const friendlyUser = buildUserByType("Max", "friendly");
friendlyUser.greet(); // Hi, nice to meet you!

const unfriendlyUser = buildUserByType("Max", "unfriendly");
unfriendlyUser.greet(); // Hm? What do you want?

// Polymorphism
class firstClass {
  add() {
    console.log("First Method");
  }
}
class secondClass extends firstClass {
  add() {
    console.log(30 + 40);
  }
}
class thirdClass extends secondClass {
  add() {
    console.log("Last Method");
  }
}
const ob = new firstClass();
const ob2 = new secondClass();
const ob3 = new thirdClass();
ob.add(); // First Method
ob2.add(); // 70
ob3.add(); // Last Method
