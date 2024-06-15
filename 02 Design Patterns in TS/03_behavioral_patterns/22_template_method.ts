export {};
//* Template Method Design Pattern
// In the Template Method pattern, you create an abstract class (template) that contains a Template Method that is a series of instructions that are a combination of abstract and hook methods.

// The Template Method Pattern Concept

abstract class AbstractClass {
  // A template class containing a template method and primitive methods

  stepOne(): void {
    // Hooks are normally empty in the abstract class. The
    // implementing class can optionally override providing a custom
    // implementation
  }

  abstract stepTwo(): void;
  // An abstract method that must be overridden in the implementing class.

  stepThree(): void {
    // Hooks can also contain default behavior and can be optionally
    // overridden
    console.log("Step Three is a hook that prints this line by default.");
  }

  templateMethod() {
    // This is the template method that the subclass will call.
    // The subclass(implementing class) doesn't need to override this
    // method since it has would have already optionally overridden
    // the following methods with its own implementations
    this.stepOne();
    this.stepTwo();
    this.stepThree();
  }
}

class ConcreteClassA extends AbstractClass {
  // A concrete class that only overrides step two"
  stepTwo() {
    console.log("Class_A : Step Two (overridden)");
  }
}

class ConcreteClassB extends AbstractClass {
  // A concrete class that only overrides steps one, two and three"
  stepOne() {
    console.log("Class_B : Step One (overridden)");
  }

  stepTwo() {
    console.log("Class_B : Step Two. (overridden)");
  }

  stepThree() {
    console.log("Class_B : Step Three. (overridden)");
  }
}

// The Client
const CLASS_A = new ConcreteClassA();
CLASS_A.templateMethod();

const CLASS_B = new ConcreteClassB();
CLASS_B.templateMethod();

//* The Template Pattern Use Case Example
// An abstract document containing a combination of hooks and abstract methods

interface Document {
  [id: string]: string;
}

abstract class AbstractDocument {
  // A template class containing a template method and primitive methods

  doc: Document = {};

  abstract title(doc: Document): void;
  // Must implement

  description?(doc: Document): void;
  // Optional

  author?(doc: Document): void;
  // Optional

  backgroundColour(doc: Document): void {
    // Optional with a default behavior
    doc["bg-col"] = "white";
  }

  abstract text(doc: Document, text: string): void;
  // Must implement

  footer?(doc: Document): void;
  // Optional

  print(doc: Document): void {
    // Optional with a default behavior"
    let out = "";
    out += "----------------------";
    Object.keys(doc).forEach((attribute: string) => {
      out += `${attribute}\t: ${doc[attribute]}`;
    });
    console.log(1, "out:", out);
  }

  createDocument(text: string): void {
    // The template method
    this.title(this.doc);
    if (this.description) this.description(this.doc);
    if (this.author) this.author(this.doc);
    this.backgroundColour(this.doc);
    this.text(this.doc, text);
    if (this.footer) this.footer(this.doc);
    this.print(this.doc);
  }
}

class TextDocument extends AbstractDocument {
  title(doc: Document): void {
    doc["title"] = "New Text Document";
  }

  text(doc: Document, text: string): void {
    doc["text"] = text;
  }

  footer(doc: Document): void {
    doc["footer"] = "-- Page 1 --";
  }
}

class HTMLDocument extends AbstractDocument {
  title(doc: Document): void {
    doc["title"] = "New HTML Document";
  }

  text(doc: Document, text: string): void {
    // Putting multiple lines into there own p tags
    const lines = text.split("\n");
    let markup = "";
    lines.forEach((line) => {
      markup = markup + "    &lt;p&gt;" + line + "&lt;/p&gt;";
      doc["text"] = markup.substring(0, markup.length - 1);
    });
  }

  print(doc: Document): void {
    // overriding print to output with html tags
    let out = "";
    out += "&lt;html&gt;";
    out += "  &lt;head&gt;";
    Object.keys(doc).forEach((attribute: string) => {
      if (["title", "description", "author"].indexOf(attribute) > -1) {
        out += `    &lt;${attribute}>${doc[attribute]}&lt;/${attribute}&gt;`;
      }
      if (attribute === "bg-col") {
        out += "    &lt;style&gt;";
        out += "      body {";
        out += `        background-color: ${doc[attribute]};`;
        out += "      }";
        out += "    &lt;/style&gt;";
      }
    });
    out += "  &lt;/head&gt;";
    out += "  &lt;body&gt;";
    out += `${doc["text"]}`;
    out += "  &lt;/body&gt;";
    out += "&lt;/html&gt;";
    console.log("out:", out);
  }
}

const TEXT_DOCUMENT = new TextDocument();
TEXT_DOCUMENT.createDocument("Some Text");

const HTML_DOCUMENT = new HTMLDocument();
HTML_DOCUMENT.createDocument("Line 1\nLine 2");
