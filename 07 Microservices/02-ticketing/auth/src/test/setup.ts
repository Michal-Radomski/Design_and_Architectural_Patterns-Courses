import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";
import request from "supertest";

import { httpServer as app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo!: MongoMemoryServer;

beforeAll(async (): Promise<void> => {
  // console.log("process.env.JWT_KEY:", process.env.JWT_KEY);
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri: string = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async (): Promise<void> => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async (): Promise<void> => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async (): Promise<string[]> => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie") as string[];

  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
};
