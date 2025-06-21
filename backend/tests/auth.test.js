import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let app, mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongo.getUri();
  app = (await import("../server.js")).default;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe("Auth API", () => {
  it("registers and logs in a user", async () => {
    const res1 = await request(app).post("/auth/register")
      .send({ name: "Test", email: "t@t.com", password: "123456" });
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toHaveProperty("token");

    const res2 = await request(app).post("/auth/login")
      .send({ email: "t@t.com", password: "123456" });
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty("token");
  });
});
