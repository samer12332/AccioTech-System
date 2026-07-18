import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.js";
import { configureApplication } from "./bootstrap/configure-application.js";
import type { EnvironmentVariables } from "./config/env.validation.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.getOrThrow("PORT", { infer: true });
  const nodeEnv = configService.getOrThrow("NODE_ENV", { infer: true });

  configureApplication(app, nodeEnv === "development");

  await app.listen(port);
  Logger.log(`API is running at http://localhost:${port}/api`, "Bootstrap");
  Logger.log(
    `Swagger is available at http://localhost:${port}/api/docs`,
    "Bootstrap",
  );
}

void bootstrap();
