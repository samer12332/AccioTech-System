import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

import { AppError } from "../errors/app-error.js";

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  timestamp: string;
  path: string;
  details?: unknown;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly isDevelopment: boolean) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const errorResponse = this.toErrorResponse(exception, request.url);

    if (
      !(exception instanceof HttpException) &&
      !(exception instanceof AppError)
    ) {
      this.logUnexpectedError(exception, request);
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private toErrorResponse(exception: unknown, path: string): ErrorResponse {
    const timestamp = new Date().toISOString();

    if (exception instanceof AppError) {
      return this.createResponse(
        exception.statusCode,
        exception.code,
        exception.message,
        path,
        timestamp,
        exception.details,
      );
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse();
      const message = this.getHttpExceptionMessage(response);
      const details = this.getHttpExceptionDetails(response);

      return this.createResponse(
        statusCode,
        HttpStatus[statusCode] ?? "HTTP_ERROR",
        message,
        path,
        timestamp,
        details,
      );
    }

    return this.createResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      "Internal server error",
      path,
      timestamp,
    );
  }

  private createResponse(
    statusCode: number,
    error: string,
    message: string,
    path: string,
    timestamp: string,
    details?: unknown,
  ): ErrorResponse {
    return {
      statusCode,
      error,
      message,
      timestamp,
      path,
      ...(details === undefined ? {} : { details }),
    };
  }

  private getHttpExceptionMessage(response: string | object): string {
    if (typeof response === "string") {
      return response;
    }

    const message = "message" in response ? response.message : undefined;
    if (typeof message === "string") {
      return message;
    }

    return Array.isArray(message) ? "Validation failed" : "Request failed";
  }

  private getHttpExceptionDetails(response: string | object): unknown {
    if (typeof response === "string") {
      return undefined;
    }

    const message = "message" in response ? response.message : undefined;
    return Array.isArray(message) ? message : undefined;
  }

  private logUnexpectedError(exception: unknown, request: Request) {
    const error =
      exception instanceof Error ? exception : new Error(String(exception));
    const diagnostic = JSON.stringify({
      event: "unhandled_exception",
      method: request.method,
      path: request.url,
      message: error.message,
    });

    this.logger.error(diagnostic, this.isDevelopment ? error.stack : undefined);
  }
}
