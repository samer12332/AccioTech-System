import { ValidationPipe, type INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { GlobalExceptionFilter } from "../common/filters/global-exception.filter.js";

export function configureApplication(
  app: INestApplication,
  isDevelopment: boolean,
) {
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new GlobalExceptionFilter(isDevelopment));
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
}
