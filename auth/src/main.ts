import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { ValidationPipe } from "@nestjs/common";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, stopAtFirstError: true }));

  const options = new DocumentBuilder()
    .setTitle("Nest.js Chat Microservices")
    .setDescription("API documentation")
    .setVersion("1.0")
    .addTag("auth")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen("3000");
}
bootstrap();
