import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { ArgumentsHost } from "@nestjs/common";
import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { AppError } from "../errors/app-error.js";
import { GlobalExceptionFilter } from "./global-exception.filter.js";

function createHost(path = "/api/example") {
  const status = vi.fn();
  const response = {
    status: status.mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;
  const request = { method: "GET", url: path } as Request;
  const host = {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
    }),
  } as unknown as ArgumentsHost;

  return { host, response, status };
}

function responseBody(response: Response) {
  return vi.mocked(response.json).mock.calls[0][0] as Record<string, unknown>;
}

describe("GlobalExceptionFilter", () => {
  it("serializes AppError fields", () => {
    const { host, response, status } = createHost("/api/metadata");
    new GlobalExceptionFilter(false).catch(
      new AppError("Unavailable", 503, "METADATA_UNAVAILABLE", { retry: true }),
      host,
    );

    expect(status).toHaveBeenCalledWith(503);
    expect(responseBody(response)).toMatchObject({
      statusCode: 503,
      error: "METADATA_UNAVAILABLE",
      message: "Unavailable",
      details: { retry: true },
      path: "/api/metadata",
    });
    expect(responseBody(response).timestamp).toEqual(expect.any(String));
  });

  it("preserves string HttpException messages", () => {
    const { host, response } = createHost();
    new GlobalExceptionFilter(false).catch(
      new HttpException("Too many requests", 429),
      host,
    );

    expect(responseBody(response)).toMatchObject({
      statusCode: 429,
      error: "TOO_MANY_REQUESTS",
      message: "Too many requests",
    });
  });

  it("uses an object HttpException message", () => {
    const { host, response } = createHost();
    new GlobalExceptionFilter(false).catch(
      new HttpException({ message: "Invalid request" }, HttpStatus.BAD_REQUEST),
      host,
    );

    expect(responseBody(response).message).toBe("Invalid request");
  });

  it("normalizes validation message arrays into details", () => {
    const { host, response } = createHost();
    new GlobalExceptionFilter(false).catch(
      new BadRequestException(["name must be a string"]),
      host,
    );

    expect(responseBody(response)).toMatchObject({
      statusCode: 400,
      message: "Validation failed",
      details: ["name must be a string"],
    });
  });

  it("returns a safe response and logs unexpected errors", () => {
    const logger = vi
      .spyOn(Logger.prototype, "error")
      .mockImplementation(() => undefined);
    const { host, response } = createHost();
    new GlobalExceptionFilter(false).catch(
      new Error("database password leaked"),
      host,
    );

    expect(responseBody(response)).toMatchObject({
      statusCode: 500,
      error: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
    expect(responseBody(response)).not.toHaveProperty("stack");
    expect(JSON.stringify(responseBody(response))).not.toContain(
      "database password leaked",
    );
    expect(logger).toHaveBeenCalledOnce();
  });

  it("does not log expected HttpException or AppError responses", () => {
    const logger = vi
      .spyOn(Logger.prototype, "error")
      .mockImplementation(() => undefined);
    const filter = new GlobalExceptionFilter(false);

    filter.catch(new BadRequestException("Invalid"), createHost().host);
    filter.catch(new AppError("Not found", 404), createHost().host);

    expect(logger).not.toHaveBeenCalled();
  });
});
