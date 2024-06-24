//* Intrusive Visitor
class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  print(buffer) {
    buffer.push(this.value.toString());
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  print(buffer) {
    buffer.push("(");
    this.left.print(buffer);
    buffer.push("+");
    this.right.print(buffer);
    buffer.push(")");
  }
}

// 1 + (2+3)
const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
const buffer = [];
e.print(buffer);
console.log(1, buffer.join(""));

//* Reflective Visitor
class NumberExpression2 {
  constructor(value) {
    this.value = value;
  }
}

class AdditionExpression2 {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

class ExpressionPrinter2 {
  print(e, buffer) {
    if (e instanceof NumberExpression2) {
      buffer.push(e.value);
    } else if (e instanceof AdditionExpression2) {
      buffer.push("(");
      this.print(e.left, buffer);
      buffer.push("+");
      this.print(e.right, buffer);
      buffer.push(")");
    }
  }
}

const e2 = new AdditionExpression2(
  new NumberExpression2(1),
  new AdditionExpression2(new NumberExpression2(2), new NumberExpression2(3))
);
const buffer2 = [];
const ep2 = new ExpressionPrinter2();
ep2.print(e2, buffer2);
console.log(2, buffer2.join(""));
