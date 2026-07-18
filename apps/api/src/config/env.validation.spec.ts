import { describe, expect, it } from "vitest";

import { validateEnvironment } from "./env.validation.js";

const databaseUrl = "postgresql://test:test@localhost:5432/test";

describe("validateEnvironment", () => {
  it("returns valid explicit configuration", () => {
    expect(
      validateEnvironment({
        NODE_ENV: "production",
        PORT: "4567",
        DATABASE_URL: databaseUrl,
      }),
    ).toEqual({
      NODE_ENV: "production",
      PORT: 4567,
      DATABASE_URL: databaseUrl,
    });
  });

  it("uses development and port 3001 defaults", () => {
    expect(validateEnvironment({ DATABASE_URL: databaseUrl })).toMatchObject({
      NODE_ENV: "development",
      PORT: 3001,
    });
  });

  it.each(["test", "production"])("accepts %s NODE_ENV", (nodeEnv) => {
    expect(
      validateEnvironment({ NODE_ENV: nodeEnv, DATABASE_URL: databaseUrl }),
    ).toMatchObject({ NODE_ENV: nodeEnv });
  });

  it.each([
    [{ NODE_ENV: "staging", DATABASE_URL: databaseUrl }, "NODE_ENV"],
    [{ PORT: "0", DATABASE_URL: databaseUrl }, "between 1 and 65535"],
    [{ PORT: "65536", DATABASE_URL: databaseUrl }, "between 1 and 65535"],
    [{ PORT: "not-a-port", DATABASE_URL: databaseUrl }, "numeric TCP port"],
    [{}, "DATABASE_URL is required"],
    [{ DATABASE_URL: "" }, "DATABASE_URL is required"],
    [{ DATABASE_URL: "   " }, "DATABASE_URL is required"],
    [{ DATABASE_URL: "https://example.test" }, "PostgreSQL connection URL"],
  ])("rejects invalid configuration", (config, message) => {
    expect(() => validateEnvironment(config)).toThrow(message);
  });

  it.each([
    "postgresql://test:test@localhost:5432/test",
    "postgres://test:test@localhost:5432/test",
  ])("accepts PostgreSQL URLs and returns them trimmed", (url) => {
    expect(
      validateEnvironment({ DATABASE_URL: `  ${url}  ` }).DATABASE_URL,
    ).toBe(url);
  });
});
