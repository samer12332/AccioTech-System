import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import type { Server } from "node:http";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { AppModule } from "../src/app.module.js";
import { configureApplication } from "../src/bootstrap/configure-application.js";
import type { EnvironmentVariables } from "../src/config/env.validation.js";
import { PrismaService } from "../src/prisma/prisma.service.js";

describe("API HTTP integration", () => {
  let app: INestApplication;
  const originalEnvironment = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    process.env.PORT = "3101";
    process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue({
        $connect: () => Promise.resolve(),
        $disconnect: () => Promise.resolve(),
      })
      .compile();

    app = moduleRef.createNestApplication();
    const config = app.get<ConfigService<EnvironmentVariables>>(ConfigService);
    configureApplication(
      app,
      config.getOrThrow("NODE_ENV", { infer: true }) === "development",
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    for (const [key, value] of Object.entries(originalEnvironment)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  });

  it("returns the health payload", async () => {
    await request(app.getHttpServer() as Server)
      .get("/api/health")
      .expect(200)
      .expect({ status: "ok", service: "acciotech-api" });
  });

  it("returns the standardized safe 404 response", async () => {
    const response = await request(app.getHttpServer() as Server)
      .get("/api/does-not-exist")
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      error: "NOT_FOUND",
      path: "/api/does-not-exist",
    });
    expect(response.body.message).toEqual(expect.any(String));
    expect(response.body.timestamp).toEqual(expect.any(String));
    expect(response.body).not.toHaveProperty("stack");
  });

  it("serves Swagger and documents the health endpoint", async () => {
    await request(app.getHttpServer() as Server)
      .get("/api/docs")
      .expect(200);
    const document = await request(app.getHttpServer() as Server)
      .get("/api/docs-json")
      .expect(200);

    expect(document.body.paths).toHaveProperty("/api/health");
    expect(document.body.paths).not.toHaveProperty("/api/test-debug");
  });
});
