class Shape {}

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius;
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class Square extends Shape {
  constructor(side = 0) {
    super();
    this.side = side;
  }

  toString() {
    return `A square with side ${this.side}`;
  }
}

// we don't want ColoredSquare, ColoredCircle, etc.
class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} ` + `has the color ${this.color}`;
  }
}

class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super();
    this.shape = shape;
    this.transparency = transparency;
  }

  toString() {
    return `${this.shape.toString()} has ` + `${this.transparency * 100.0}% transparency`;
  }
}

const circle = new Circle(2);
console.log(circle.toString());

const redCircle = new ColoredShape(circle, "red");
console.log(redCircle.toString());

// impossible: redHalfCircle is not a Circle
// redHalfCircle.resize(2);

const redHalfCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfCircle.toString());
