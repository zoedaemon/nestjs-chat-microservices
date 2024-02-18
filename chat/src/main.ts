import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { RabbitMQHandler } from './rabbitmq.handler';
// import { CustomWebSocketAdapter } from './websocket/websocket.adapter';
// import { WebsocketGateway } from './websocket/websocket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const rabbitMQHandler = app.get(RabbitMQHandler);
  // const websocketGateway = app.get(WebsocketGateway);
  // const adapter = new CustomWebSocketAdapter(app);
  // app.useWebSocketAdapter(adapter);
  // await rabbitMQHandler.startListening();

  await app.listen(3003);
}
bootstrap();
