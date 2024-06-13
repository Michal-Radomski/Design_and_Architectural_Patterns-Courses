export {};
//* Interpreter Design Pattern
// The Interpreter pattern helps to convert information from one language into another.

// interface IAbstractExpression {
//   // All Terminal and Non-Terminal expressions will implement
//   // an `interpret` method
//   interpret(): number;
// }

// class Numeral implements IAbstractExpression {
//   // Terminal Expression

//   value: number;

//   constructor(value: string) {
//     this.value = parseInt(value);
//   }

//   interpret(): number {
//     return this.value;
//   }
// }

// class Add implements IAbstractExpression {
//   // Non-Terminal Expression.
//   left: IAbstractExpression;
//   right: IAbstractExpression;

//   constructor(left: IAbstractExpression, right: IAbstractExpression) {
//     this.left = left;
//     this.right = right;
//   }

//   interpret() {
//     return this.left.interpret() + this.right.interpret();
//   }
// }

// class Subtract implements IAbstractExpression {
//   // Non-Terminal Expression.
//   left: IAbstractExpression;
//   right: IAbstractExpression;

//   constructor(left: IAbstractExpression, right: IAbstractExpression) {
//     this.left = left;
//     this.right = right;
//   }

//   interpret() {
//     return this.left.interpret() - this.right.interpret();
//   }
// }

// // The Client
// // The sentence complies with a simple grammar of
// // Number -> Operator -> Number -> etc,
// const SENTENCE = "5 + 4 - 3 + 7 - 2";
// console.log(SENTENCE);

// // Split the sentence into individual expressions that will be added to
// // an Abstract Syntax Tree(AST) as Terminal and Non - Terminal expressions
// const TOKENS = SENTENCE.split(" ");
// console.log(JSON.stringify(TOKENS));

// // Manually Creating an Abstract Syntax Tree from the tokens
// const AST: IAbstractExpression[] = []; // An array of AbstractExpressions
// AST.push(new Add(new Numeral(TOKENS[0]), new Numeral(TOKENS[2]))); // 5 + 4
// AST.push(new Subtract(AST[0], new Numeral(TOKENS[4]))); // ^ - 3
// AST.push(new Add(AST[1], new Numeral(TOKENS[6]))); // ^ + 7
// AST.push(new Subtract(AST[2], new Numeral(TOKENS[8]))); // ^ - 2

// // Use the final AST row as the root node.
// const AST_ROOT = AST.pop();

// // Interpret recursively through the full AST starting from the root.
// console.log((AST_ROOT as IAbstractExpression).interpret());

// // Print out a representation of the AST_ROOT
// console.log(JSON.stringify(AST_ROOT, null, 2));
// console.dir(AST_ROOT, { depth: null });

//* The Interpreter Pattern Use Case Example
class RomanNumeral implements IAbstractExpression {
  // Non Terminal expression

  romanNumeral: string;
  context: [string, number];

  constructor(romanNumeral: string) {
    this.romanNumeral = romanNumeral;
    this.context = [romanNumeral, 0];
  }

  interpret(): number {
    RomanNumeral1000.interpret(this.context);
    RomanNumeral100.interpret(this.context);
    RomanNumeral10.interpret(this.context);
    RomanNumeral1.interpret(this.context);
    return new Numeral(this.context[1]).interpret();
  }
}

class RomanNumeral1 extends RomanNumeral {
  // Roman Numerals 1 - 9
  static one = "I";
  static four = "IV";
  static five = "V";
  static nine = "IX";
  static multiplier = 1;

  static interpret(context: [string, number]) {
    if (context[0].length === 0) {
      return new Numeral(context[1]).interpret();
    }

    if (context[0].substring(0, 2) === this.nine) {
      context[1] += 9 * this.multiplier;
      context[0] = context[0].substring(2);
    } else if (context[0].substring(0, 1) === this.five) {
      context[1] += 5 * this.multiplier;
      context[0] = context[0].substring(1);
    } else if (context[0].substring(0, 2) === this.four) {
      context[1] += +(4 * this.multiplier);
      context[0] = context[0].substring(2);
    }
    while (context[0].length > 0 && context[0][0] === this.one) {
      context[1] += 1 * this.multiplier;
      context[0] = context[0].substring(1);
    }
    return new Numeral(context[1]).interpret();
  }
}

class RomanNumeral10 extends RomanNumeral1 {
  // Roman Numerals 10 - 99
  static one = "X";
  static four = "XL";
  static five = "L";
  static nine = "XC";
  static multiplier = 10;
}

class RomanNumeral100 extends RomanNumeral1 {
  // Roman Numerals 100 - 999
  static one = "C";
  static four = "CD";
  static five = "D";
  static nine = "CM";
  static multiplier = 100;
}

class RomanNumeral1000 extends RomanNumeral1 {
  // Roman Numerals 1000 - 3999
  static one = "M";
  static four = "";
  static five = "";
  static nine = "";
  static multiplier = 1000;
}

class Subtract implements IAbstractExpression {
  // Non-Terminal Expression.

  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

class Add implements IAbstractExpression {
  // Non-Terminal Expression.

  left: IAbstractExpression;
  right: IAbstractExpression;

  constructor(left: IAbstractExpression, right: IAbstractExpression) {
    this.left = left;
    this.right = right;
  }

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class Numeral implements IAbstractExpression {
  // Terminal Expression

  value: number;

  constructor(value: string | number) {
    this.value = typeof value === "string" ? parseInt(value) : value;
  }

  interpret(): number {
    return this.value;
  }
}

interface IAbstractExpression {
  // All Terminal and Non-Terminal expressions will implement
  // an `interpret` method
  value?: number;
  left?: IAbstractExpression;
  right?: IAbstractExpression;
  interpret(): number;
}

class Parser {
  // Dynamically create the Abstract Syntax Tree

  static parse(sentence: string): IAbstractExpression | undefined {
    // Create the AST from the sentence

    const tokens = sentence.split(" ");

    const tree: IAbstractExpression[] = []; // Abstract Syntax Tree
    while (tokens.length > 1) {
      const leftExpression = Parser.decideLeftExpression(tree, tokens);

      // get the operator, make the token list shorter
      const operator = tokens.shift();

      const right = tokens[0];

      if (!Number(right)) {
        tree.push(new RomanNumeral(right));
        if (operator === "-") {
          tree.push(new Subtract(leftExpression, tree[tree.length - 1]));
        }
        if (operator === "+") {
          tree.push(new Add(leftExpression, tree[tree.length - 1]));
        }
      } else {
        const rightExpression = new Numeral(right);
        if (!tree.length) {
          // Empty Data Structures return False by default
          if (operator === "-") {
            tree.push(new Subtract(leftExpression, rightExpression));
          }
          if (operator === "+") {
            tree.push(new Add(leftExpression, rightExpression));
          }
        } else {
          if (operator === "-") {
            tree.push(new Subtract(tree[tree.length - 1], rightExpression));
          }
          if (operator === "+") {
            tree.push(new Add(tree[tree.length - 1], rightExpression));
          }
        }
      }
    }
    return tree.pop();
  }

  static decideLeftExpression(tree: IAbstractExpression[], tokens: string[]): IAbstractExpression {
    // On the First iteration, the left expression can be either a
    // number or roman numeral.Every consecutive expression is
    // reference to an existing AST row
    const left = tokens.shift();
    let leftExpression: IAbstractExpression;
    if (!tree.length) {
      // only applicable if first round
      if (!Number(left)) {
        // if 1st token a roman numeral
        tree = [];
        tree.push(new RomanNumeral(left as string));
        leftExpression = tree[tree.length - 1] as IAbstractExpression;
      } else {
        leftExpression = new Numeral(left as string);
      }
      return leftExpression;
    } else {
      leftExpression = tree[tree.length - 1] as IAbstractExpression;
      return leftExpression;
    }
  }
}

// The sentence complies with a simple grammar of
// Number -> Operator -> Number -> etc,
const SENTENCE = "5 + IV - 3 + VII - 2";
// const SENTENCE = "4 + II + XII + 1 + 2"
// const SENTENCE = "5 + 4 - 3 + 7 - 2"
// const SENTENCE = "V + IV - III + 7 - II"
// const SENTENCE= "CIX + V"
// const SENTENCE = "CIX + V - 3 + VII - 2"
// const SENTENCE = "MMMCMXCIX - CXIX + MCXXII - MMMCDXII - XVIII - CCXXXV"
console.log(SENTENCE);

const AST_ROOT = Parser.parse(SENTENCE);

// Interpret recursively through the full AST starting from the root.
console.log((AST_ROOT as IAbstractExpression).interpret());

// Print out a representation of the AST_ROOT
console.log(JSON.stringify(AST_ROOT, null, 2));
console.dir(AST_ROOT, { depth: null });
