import request from "supertest";
import { it, expect } from "@jest/globals";

import { httpServer as app } from "../../app";

it("responds with details about the current user", async (): Promise<any> => {
  const cookie: string[] = await global.signin();

  const response = await request(app).get("/api/users/currentuser").set("Cookie", cookie).send().expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async (): Promise<any> => {
  const response = await request(app).get("/api/users/currentuser").send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
