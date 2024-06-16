//* Single Responsibility Principle

import fs from "fs";

interface ObjectI {
  [key: string]: string | number | ObjectI;
}

class Journal {
  entries: ObjectI;
  static count: number;
  constructor() {
    this.entries = {} as ObjectI;
  }

  addEntry(text: string) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    console.log({ c });
    return c;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  //* Moved to other class!
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
}
Journal.count = 0;

class PersistenceManager {
  load(filename: string) {
    console.log({ filename });
  }
  loadFromUrl(url: string) {
    console.log({ url });
  }
  saveToFile(journal: Journal, filename: fs.PathOrFileDescriptor) {
    fs.writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");
console.log(j.toString());

let p = new PersistenceManager();
let filename = "./journal.txt";
p.saveToFile(j, filename);
