import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";

let mongo!: MongoMemoryServer;

beforeAll(async (): Promise<void> => {
  // console.log("process.env.JWT_KEY:", process.env.JWT_KEY);
  process.env.JWT_KEY = "asdfasdf";

  const mongo = await MongoMemoryServer.create();
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
