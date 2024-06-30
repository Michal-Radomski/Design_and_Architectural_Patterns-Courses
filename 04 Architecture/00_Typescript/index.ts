//* 01. Component Based Pattern

interface Component {
  update(gameObject: GameObject): void;
  render(gameObject: GameObject): void;
}

class GameObject {
  private components: Component[] = [];

  addComponent(component: Component): void {
    this.components.push(component);
  }

  update(): void {
    this.components.forEach((component) => component.update(this));
  }

  render(): void {
    this.components.forEach((component) => component.render(this));
  }
}

class PhysicsComponent implements Component {
  update(gameObject: GameObject): void {
    console.log("Updating physics");
    // Update physics simulation
  }

  render(gameObject: GameObject): void {
    // No rendering for physics
  }
}

class GraphicsComponent implements Component {
  update(gameObject: GameObject): void {
    // No update needed for graphics
  }

  render(gameObject: GameObject): void {
    console.log("Rendering graphics");
    // Render the game object
  }
}

class AIComponent implements Component {
  update(gameObject: GameObject): void {
    console.log("Updating AI");
    // Update AI behavior
  }

  render(gameObject: GameObject): void {
    // No rendering for AI
  }
}

// Usage
const player = new GameObject();
player.addComponent(new PhysicsComponent());
player.addComponent(new GraphicsComponent());

const enemy = new GameObject();
enemy.addComponent(new PhysicsComponent());
enemy.addComponent(new GraphicsComponent());
enemy.addComponent(new AIComponent());

// In the game loop
player.update();
player.render();
enemy.update();
enemy.render();

// Create more complex game objects
const boss = new GameObject();
boss.addComponent(new PhysicsComponent());
boss.addComponent(new GraphicsComponent());
boss.addComponent(new AIComponent());
// Add more specialized components
boss.addComponent({
  update: (gameObject) => console.log("Boss special ability update"),
  render: (gameObject) => console.log("Boss special effects render"),
});

// In the game loop
boss.update();
boss.render();

{
  //* Example 2
  // Base Component class
  // abstract class Component {
  //   // The root element of the component
  //   protected element: HTMLElement;
  //   constructor(tagName: string = "div") {
  //     this.element = document.createElement(tagName);
  //   }
  //   // Method to render the component
  //   abstract render(): void;
  //   // Method to get the component's root element
  //   getElement(): HTMLElement {
  //     return this.element;
  //   }
  // }
  // // Button component
  // class Button extends Component {
  //   private label: string;
  //   constructor(label: string) {
  //     super("button");
  //     this.label = label;
  //   }
  //   render(): void {
  //     this.element.textContent = this.label;
  //   }
  // }
  // // Card component
  // class Card extends Component {
  //   private title: string;
  //   private content: string;
  //   constructor(title: string, content: string) {
  //     super("div");
  //     this.title = title;
  //     this.content = content;
  //   }
  //   render(): void {
  //     this.element.innerHTML = `
  //     <div class="card">
  //       <h2>${this.title}</h2>
  //       <p>${this.content}</p>
  //     </div>
  //   `;
  //   }
  // }
  // // App class to manage the application
  // class App {
  //   private root: HTMLElement;
  //   constructor(rootId: string) {
  //     const rootElement = document.getElementById(rootId);
  //     if (!rootElement) {
  //       throw new Error("Root element not found");
  //     }
  //     this.root = rootElement;
  //   }
  //   // Method to render components in the root element
  //   render(components: Component[]): void {
  //     this.root.innerHTML = ""; // Clear the root element
  //     components.forEach((component) => {
  //       component.render();
  //       this.root.appendChild(component.getElement());
  //     });
  //   }
  // }
  // // Usage example
  // const button1 = new Button("Click Me!");
  // const card1 = new Card("Card Title", "This is the card content.");
  // const app = new App("app");
  // app.render([button1, card1]);
  // console.log("button1:", button1);
  // console.log("card1:", card1);
  // console.log("app:", app);
}

//* 02. Single Page Application (e.g. React CRA)
// App.tsx (Root component)
// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;

// // Header.tsx
// import React from "react";
// import { Link } from "react-router-dom";

// const Header: React.FC = () => {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

// // Home.tsx
// import React from "react";

// const Home: React.FC = () => {
//   return <h1>Welcome to the Home Page</h1>;
// };

// export default Home;

// // About.tsx
// import React from "react";

// const About: React.FC = () => {
//   return <h1>About Us</h1>;
// };

// export default About;

// // Contact.tsx
// import React from "react";

// const Contact: React.FC = () => {
//   return <h1>Contact Us</h1>;
// };

// export default Contact;

//* 03. State Management Architecture (e.g. React + useContext or React + Redux)
// Action Types
// const ADD_TODO = 'ADD_TODO';
// const TOGGLE_TODO = 'TOGGLE_TODO';
// const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// // Action Creators
// const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: { text }
// });

// const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: { id }
// });

// const setVisibilityFilter = (filter: string) => ({
//   type: SET_VISIBILITY_FILTER,
//   payload: { filter }
// });

// // Reducers
// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// interface State {
//   todos: Todo[];
//   visibilityFilter: string;
// }

// const initialState: State = {
//   todos: [],
//   visibilityFilter: 'SHOW_ALL'
// };

// const todoReducer = (state = initialState, action: any): State => {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           {
//             id: state.todos.length,
//             text: action.payload.text,
//             completed: false
//           }
//         ]
//       };
//     case TOGGLE_TODO:
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
//         )
//       };
//     case SET_VISIBILITY_FILTER:
//       return {
//         ...state,
//         visibilityFilter: action.payload.filter
//       };
//     default:
//       return state;
//   }
// };

// // Store
// import { createStore } from 'redux';
// const store = createStore(todoReducer);

// // Usage in components
// const dispatch = store.dispatch;

// // Add a todo
// dispatch(addTodo('Learn Redux'));

// // Toggle a todo
// dispatch(toggleTodo(0));

// // Set visibility filter
// dispatch(setVisibilityFilter('SHOW_COMPLETED'));

// // Subscribe to state changes
// store.subscribe(() => {
//   console.log(store.getState());
// });

//* Memoization
// Regular recursive Fibonacci function (inefficient for large inputs)
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized Fibonacci function
function memoizedFibonacci() {
  const cache = {} as { [key: string]: number };

  return function fib(n: number): number {
    // console.log("cache:", cache);
    if (n in cache) {
      return cache[n];
    } else {
      if (n <= 1) {
        return n;
      } else {
        const result = (fib(n - 1) + fib(n - 2)) as number;
        cache[n] = result;
        return result;
      }
    }
  };
}

const fib: (n: number) => number = memoizedFibonacci();

console.log("fib(10):", fib(10)); // Output: 55
console.log("fib(50):", fib(50)); // Output: 12586269025

//* 04. MicroFrontends Architecture
// ParentApp.js
// import React from "react";
// import { Header } from "header-app/Header";
// import { Content } from "content-app/Content";
// import { Footer } from "footer-app/Footer";

// const ParentApp = () => (
//   <div>
//     <Header />
//     <Content />
//     <Footer />
//   </div>
// );

// export default ParentApp;

// // Header.js
// import React from "react";

// const Header = () => (
//   <header>
//     <h1>Micro Frontend Header</h1>
//   </header>
// );

// export default Header;

// // Content.js
// import React from "react";

// const Content = () => (
//   <main>
//     <p>This is the content area of the micro frontend.</p>
//   </main>
// );

// export default Content;

// // Footer.js
// import React from "react";

// const Footer = () => (
//   <footer>
//     <p>Micro Frontend Footer</p>
//   </footer>
// );

// export default Footer;

//* 05. Serverless Architecture
// Example of an AWS Lambda Function (Node.js)
exports.handler = async (event: { queryStringParameters: { name: string } }) => {
  const name = event.queryStringParameters.name || "World";
  const response = {
    statusCode: 200,
    body: `Hello, ${name}!`,
  };
  return response;
};

//* 06. PWA
// A Progressive Web Application (PWA) architecture is designed to create web applications that deliver a native app-like experience using modern web capabilities. PWAs combine the best of web and mobile apps, providing users with a reliable, fast, and engaging experience.

//* 07. SSR
// Server-Side Rendering (SSR) is an architecture where the server generates the complete HTML for a web page on each request and sends it to the client. This contrasts with Client-Side Rendering (CSR), where the client (browser) downloads a minimal HTML page and then dynamically generates the rest of the content using JavaScript. SSR can improve performance, SEO, and user experience, especially for content-rich applications.
