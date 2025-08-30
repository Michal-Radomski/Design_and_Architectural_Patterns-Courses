import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { httpServer } from "./app";
import { natsWrapper } from "./nats-wrapper";

(async function start(): Promise<void> {
  //* Port
  const portHTTP = (process.env.HTTP_PORT || 3000) as number;

  const JWT_KEY = process.env.JWT_KEY as string;

  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL must be defined");
  }

  try {
    await natsWrapper.connect("ticketing", "alsdkj", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    //* MongoDB
    // await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    await mongoose
      .connect(process.env.MONGO_URL as string, {})
      .then((con: { connection: { host: string } }) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
      })
      .catch((error: string) => console.log("Mongo DB Error => ", error));

    //* IPv4
    httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
      console.log(`🚀 Server is listening at http://localhost:${portHTTP}`);
      // For testing only
      console.log("Current Time:", new Date().toLocaleTimeString());
    });
  } catch (error) {
    console.error("error:", error);
  }
})();
