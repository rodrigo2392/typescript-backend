import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userService from "../../src/services/user.service";
import CreateServer from "../../src/server";
import { Express } from "express";
let mongoServer: MongoMemoryServer;

let app: Express;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  app = CreateServer();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
describe("Authentication endpoint", () => {
  it("Should return 401 for incorrect email/password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "itic.rodrigomg@gmail.com",
      password: "test123",
    });
    expect(res.status).toBe(200);
    expect(res.body.error?.message).toBe("invalid credentials");
  });

  it("Should return 200 for correct email/password", async () => {
    await userService.create({
      email: "itic.rodrigomg@gmail.com",
      password: "test123",
      name: "rodrigo2",
    });
    const res = await request(app).post("/auth/login").send({
      email: "itic.rodrigomg@gmail.com",
      password: "test123",
    });
    expect(res.status).toBe(200);
  });
});
