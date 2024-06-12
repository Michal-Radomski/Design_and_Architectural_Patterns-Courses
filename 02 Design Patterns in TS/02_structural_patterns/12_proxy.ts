export {};
//* Proxy Design Pattern
// The Proxy design pattern is a class functioning as an interface to another class or object.

interface ISubject {
  // An interface implemented by both the Proxy and Real Subject
  request(): void;
  // A method to implement
}

class RealSubject implements ISubject {
  // The actual real object that the proxy is representing

  enormousData: number[];

  constructor() {
    // hypothetically enormous amounts of data
    this.enormousData = [1, 2, 3];
  }

  request() {
    return this.enormousData;
  }
}

class ProxySubject implements ISubject {
  // In this case the proxy will act as a cache for
  // `enormous_data` and only populate the enormous_data when it
  // is actually necessary

  enormousData: number[];
  realSubject: RealSubject;

  constructor() {
    this.enormousData = [];
    this.realSubject = new RealSubject();
  }
  request() {
    // Using the proxy as a cache, and loading data into it only if
    // it is needed
    if (this.enormousData.length === 0) {
      console.log("pulling data from RealSubject");
      this.enormousData = this.realSubject.request();
      return this.enormousData;
    }
    console.log("pulling data from Proxy cache");
    return this.enormousData;
  }
}

// The Client
const PROXY_SUBJECT = new ProxySubject();
// Use the Subject. First time it will load the enormous amounts of data
let response = JSON.stringify(PROXY_SUBJECT.request());
console.log("response:", response);
// Use the Subject again, but this time it retrieves it from the local cache
response = JSON.stringify(PROXY_SUBJECT.request());
console.log("response:", response);

//* A Proxy Use Case Example
interface IProteus {
  // A Greek mythological character that can change to many forms

  tellMeTheFuture(): void;
  // Proteus will change form rather than tell you the future

  tellMeYourForm(): void;
  // The form of Proteus is elusive like the sea
}

class Lion implements IProteus {
  // Proteus in the form of a Lion

  name = "Lion";

  tellMeTheFuture(): void {
    // Proteus will change to something random
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Serpent());
      this.tellMeTheFuture = Serpent.prototype.tellMeTheFuture;
      this.tellMeYourForm = Serpent.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Leopard());
      this.tellMeTheFuture = Leopard.prototype.tellMeTheFuture;
      this.tellMeYourForm = Leopard.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}

class Serpent implements IProteus {
  // Proteus in the form of a Serpent

  name = "Serpent";

  tellMeTheFuture(): void {
    // Proteus will change to something random
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Leopard());
      this.tellMeTheFuture = Leopard.prototype.tellMeTheFuture;
      this.tellMeYourForm = Leopard.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Lion());
      this.tellMeTheFuture = Lion.prototype.tellMeTheFuture;
      this.tellMeYourForm = Lion.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}

class Leopard implements IProteus {
  // Proteus in the form of a Leopard

  name = "Leopard";

  tellMeTheFuture(): void {
    // Proteus will change to something random
    if (Math.floor(Math.random() * 2)) {
      Object.assign(this, new Lion());
      this.tellMeTheFuture = Lion.prototype.tellMeTheFuture;
      this.tellMeYourForm = Lion.prototype.tellMeYourForm;
    } else {
      Object.assign(this, new Serpent());
      this.tellMeTheFuture = Serpent.prototype.tellMeTheFuture;
      this.tellMeYourForm = Serpent.prototype.tellMeYourForm;
    }
  }

  tellMeYourForm(): void {
    console.log(`I am the form of ${this.name}`);
  }
}

const PROTEUS = new Lion();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
PROTEUS.tellMeTheFuture();
PROTEUS.tellMeYourForm();
