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
