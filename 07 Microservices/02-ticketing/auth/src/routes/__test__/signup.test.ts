import request from "supertest";
import { it, expect } from "@jest/globals";

import { httpServer as app } from "../../app";

it("returns a 201 on successful signup", async (): Promise<any> => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async (): Promise<any> => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "alskdflaskjfd",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async (): Promise<any> => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "alskdflaskjfd",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "alskjdf",
    })
    .expect(400);
});

it("disallows duplicate emails", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async (): Promise<void> => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
