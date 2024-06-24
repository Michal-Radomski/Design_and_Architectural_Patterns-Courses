//* Classic Visitor
class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitNumber(this);
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class Visitor {
  constructor() {
    this.buffer = [];
  }
}

class ExpressionPrinter extends Visitor {
  constructor() {
    super();
  }

  visitNumber(e) {
    this.buffer.push(e.value);
  }

  visitAddition(e) {
    this.buffer.push("(");
    e.left.accept(this);
    this.buffer.push("+");
    e.right.accept(this);
    this.buffer.push(")");
  }

  toString() {
    return this.buffer.join("");
  }
}

class ExpressionCalculator {
  // this visitor is stateful which can lead to problems
  constructor() {
    this.result = 0;
  }

  visitNumber(e) {
    this.result = e.value;
  }

  visitAddition(e) {
    e.left.accept(this);
    let temp = this.result;
    e.right.accept(this);
    this.result += temp;
  }
}

const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);

const ep = new ExpressionPrinter();
ep.visitAddition(e);

const ec = new ExpressionCalculator();
ec.visitAddition(e);

console.log(`${ep.toString()} = ${ec.result}`);

//* Intrusive Visitor
// class NumberExpression {
//   constructor(value) {
//     this.value = value;
//   }

//   print(buffer) {
//     buffer.push(this.value.toString());
//   }
// }

// class AdditionExpression {
//   constructor(left, right) {
//     this.left = left;
//     this.right = right;
//   }

//   print(buffer) {
//     buffer.push("(");
//     this.left.print(buffer);
//     buffer.push("+");
//     this.right.print(buffer);
//     buffer.push(")");
//   }
// }

// // 1 + (2+3)
// const e = new AdditionExpression(
//   new NumberExpression(1),
//   new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
// );
// const buffer = [];
// e.print(buffer);
// console.log(1, buffer.join(""));

//* Reflective Visitor
// class NumberExpression2 {
//   constructor(value) {
//     this.value = value;
//   }
// }

// class AdditionExpression2 {
//   constructor(left, right) {
//     this.left = left;
//     this.right = right;
//   }
// }

// class ExpressionPrinter2 {
//   print(e, buffer) {
//     if (e instanceof NumberExpression2) {
//       buffer.push(e.value);
//     } else if (e instanceof AdditionExpression2) {
//       buffer.push("(");
//       this.print(e.left, buffer);
//       buffer.push("+");
//       this.print(e.right, buffer);
//       buffer.push(")");
//     }
//   }
// }

// const e2 = new AdditionExpression2(
//   new NumberExpression2(1),
//   new AdditionExpression2(new NumberExpression2(2), new NumberExpression2(3))
// );
// const buffer2 = [];
// const ep2 = new ExpressionPrinter2();
// ep2.print(e2, buffer2);
// console.log(2, buffer2.join(""));
