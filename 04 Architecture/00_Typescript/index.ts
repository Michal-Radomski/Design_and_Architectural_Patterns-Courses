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

//* 02. Single Page Application
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

//* 03. State Management Architecture
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
