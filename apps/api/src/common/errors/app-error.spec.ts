import { HttpStatus } from "@nestjs/common";
import { describe, expect, it } from "vitest";

import { AppError } from "./app-error.js";

describe("AppError", () => {
  it("is an Error with the supplied message, status, and name", () => {
    const error = new AppError("Not allowed", HttpStatus.FORBIDDEN);

    expect(error).toBeInstanceOf(Error);
    expect(error).toMatchObject({
      message: "Not allowed",
      statusCode: HttpStatus.FORBIDDEN,
      name: "AppError",
    });
  });

  it("uses the standard HTTP status name by default", () => {
    expect(new AppError("Missing", HttpStatus.NOT_FOUND).code).toBe(
      "NOT_FOUND",
    );
  });

  it("preserves a custom code and optional details", () => {
    const details = { resource: "system-metadata" };
    const error = new AppError(
      "Unavailable",
      503,
      "SERVICE_UNAVAILABLE",
      details,
    );

    expect(error.code).toBe("SERVICE_UNAVAILABLE");
    expect(error.details).toBe(details);
  });

  it("uses APPLICATION_ERROR for a nonstandard status", () => {
    expect(new AppError("Custom", 499).code).toBe("APPLICATION_ERROR");
  });
});
