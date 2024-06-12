export {};
//* Composite Design Pattern
// The Composite design pattern is a structural pattern useful for hierarchical management.

interface ICompositeComponent {
  // A component interface describing the common
  // fields and methods of leaves and composites
  name: string; // A name for this component
  referenceToParent?: Composite;
  method(): void; // A method each Leaf and composite container should implement
  detach(): void; // Called before a leaf is attached to a composite
}

class Leaf implements ICompositeComponent {
  // A Leaf can be added to a composite, but not a leaf
  referenceToParent?: Composite = undefined;
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  method(): void {
    const parent = this.referenceToParent ? this.referenceToParent.name : "none";
    console.log(`&lt;Leaf&gt;\t\tname:${this.name}\tParent:\t${parent}`);
  }

  detach(): void {
    "Detaching this leaf from its parent composite";
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
    }
  }
}

class Composite implements ICompositeComponent {
  // A composite can contain leaves and composites

  referenceToParent?: Composite;
  components: ICompositeComponent[];
  name: string;

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  method(): void {
    const parent = this.referenceToParent ? this.referenceToParent.name : "none";
    console.log(`&lt;Composite&gt;\tname:${this.name}\tParent:\t${parent}\tComponents:${this.components.length}`);
    this.components.forEach((component) => {
      component.method();
    });
  }

  attach(component: ICompositeComponent): void {
    // Detach leaf / composite from any current parent reference and
    // then set the parent reference to this composite
    component.detach();
    component.referenceToParent = this;
    this.components.push(component);
  }

  delete(component: ICompositeComponent): void {
    // Removes leaf/composite from this composite this.components
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  detach(): void {
    // Detaching this composite from its parent composite
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
      this.referenceToParent = undefined;
    }
  }
}

// The Client
const LEAF_A = new Leaf("leaf-a");
const LEAF_B = new Leaf("leaf-b");
const COMPOSITE_1 = new Composite("comp-1");
const COMPOSITE_2 = new Composite("comp-2");

// Attach LEAF_A to COMPOSITE_1
COMPOSITE_1.attach(LEAF_A);

// Instead, attach LEAF_A to COMPOSITE_2
COMPOSITE_2.attach(LEAF_A);

// Attach COMPOSITE1 to COMPOSITE_2
COMPOSITE_2.attach(COMPOSITE_1);

// Run the methods that
LEAF_B.method(); // not in any composites
COMPOSITE_2.method(); // COMPOSITE_2 contains both COMPOSITE_1 and LEAF_A

//* A use case of the composite pattern.
interface IComponent {
  // A component interface describing the common
  // fields and methods of leaves and composites

  referenceToParent?: Folder;

  dir(indent: string): void;
  // A method each Leaf and composite container should implement

  detach(): void;
  // Called before a leaf is attached to a composite
}

class Folder implements IComponent {
  // A composite can contain leaves and composites

  referenceToParent?: Folder;
  name: string;
  components: IComponent[];

  constructor(name: string) {
    this.name = name;
    this.components = [];
  }

  dir(indent: string): void {
    console.log(`${indent}&lt;DIR&gt;  ${this.name}`);

    this.components.forEach((component) => {
      component.dir(indent + "..");
    });
  }

  attach(component: IComponent): void {
    // Detach leaf / composite from any current parent reference and
    // then set the parent reference to this composite
    component.detach();
    component.referenceToParent = this;
    this.components.push(component);
  }

  delete(component: IComponent): void {
    // Removes leaf/composite from this composite this.components
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  detach(): void {
    // Detaching this composite from its parent composite
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
      this.referenceToParent = undefined;
    }
  }
}

class File implements IComponent {
  // The File Class. The files are the leaves

  name: string;
  referenceToParent?: Folder = undefined;

  constructor(name: string) {
    this.name = name;
  }

  dir(indent: string): void {
    console.log(`${indent}&lt;FILE&gt; ${this.name}`);
  }

  detach(): void {
    "Detaching this leaf from its parent composite";
    if (this.referenceToParent) {
      this.referenceToParent.delete(this);
    }
  }
}

const FILESYSTEM = new Folder("root");
const FILE_1 = new File("abc.txt");
const FILE_2 = new File("123.txt");
FILESYSTEM.attach(FILE_1);
FILESYSTEM.attach(FILE_2);
const FOLDER_A = new Folder("folder_a");
FILESYSTEM.attach(FOLDER_A);
const FILE_3 = new File("xyz.txt");
FOLDER_A.attach(FILE_3);
const FOLDER_B = new Folder("folder_b");
const FILE_4 = new File("456.txt");
FOLDER_B.attach(FILE_4);
FILESYSTEM.attach(FOLDER_B);
FILESYSTEM.dir("");

// now move FOLDER_A and its contents to FOLDER_B
console.log("");
FOLDER_B.attach(FOLDER_A);
FILESYSTEM.dir("");
