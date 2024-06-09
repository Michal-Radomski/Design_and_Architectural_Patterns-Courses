// function foo(bar: string): string {
//   return `Hello: ${bar}`;
// }

// const baz = "Abc";
// console.log("foo(baz):", foo(baz));

// let foo: string;
// let bar: boolean;
// let baz: number;
// let qux: string[];
// let quuz: [number, string];
// let corge: { [key: number]: string }; //* Dictionary
// let grault: Set<number>;

// foo = "ABC";
// bar = true;
// baz = 123;
// qux = ["a", "b", "c"];
// quuz = [1, "abc"];
// corge = { 123: "abc", 456: "def" }; //* Dictionary
// grault = new Set([1, 2, 3]);

//* Types
// const foo: string = "string";
// const bar: boolean = true;

//* Number are transpiled to decimal
// let baz: number;
// baz = 123; // decimal
// console.log("baz:", baz);
// baz = 123.456; // float
// console.log("baz:", baz);
// baz = 0xffff; // hex //* 65535
// console.log("baz:", baz);
// baz = 0b10101; // binary //* 21
// console.log("baz:", baz);
// baz = 0o671; // octal //* 441
// console.log("baz:", baz);

// const a: string[] = ["a", "b", "d", "d"];
// console.log("a[0]", a[0]);

//* Dictionary: key-value pairs
// let a: { [key: number]: string };
// const a: { [key: number]: string } = { 123: "abc", 456: "def" };
// const b: { [key: string]: boolean } = { abc: true, def: false, ghi: true };
// console.log("a[123]:", a[123]);
// console.log('b["def"]:', b["def"]);

let a: { [key: string]: string };
let b: { [id: number]: string };
a = { a: "car", b: "train", c: "plane", d: "boat" };
b = { 1: "car", 2: "train", 3: "plane", 4: "boat" };
// and can be retrieved as such
console.log(a["a"]);
console.log(b[2]);
// Since Dictionaries are really just objects. You can also retrieve
// a dictionary's value using object notation if the keys are strings
console.log(a.c);
//* console.log(b.2) // this doesn't work when the key is a number

// you can add items to a dictionary
a["e"] = "go-cart";
console.log(a);

// you can delete
delete b[2];
console.log(b);

// The values of a dictionary can be of any type, even an array.
let c: { [id: number]: number[] };
c = { 1: [1, 2, 3], 2: [4, 5, 6], 3: [7, 8, 9], 4: [10, 11, 12] };
console.log("c:", c);
