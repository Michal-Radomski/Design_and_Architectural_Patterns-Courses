import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("test-cluster", randomBytes(4).toString("hex"), {
  url: "http://127.0.0.1:4222",
  connectTimeout: 10000, // increase connection timeout in ms, if supported
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe("ticket:created", "orders-service-queue-group", options);

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
