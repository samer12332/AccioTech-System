import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module.js";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter.js";
import type { EnvironmentVariables } from "./config/env.validation.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.getOrThrow("PORT", { infer: true });
  const nodeEnv = configService.getOrThrow("NODE_ENV", { infer: true });

  app.setGlobalPrefix("api");
  app.useGlobalFilters(new GlobalExceptionFilter(nodeEnv === "development"));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AccioTech Operating System API")
    .setDescription("REST API for the AccioTech Operating System.")
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(port);
  Logger.log(`API is running at http://localhost:${port}/api`, "Bootstrap");
  Logger.log(
    `Swagger is available at http://localhost:${port}/api/docs`,
    "Bootstrap",
  );
}

void bootstrap();
