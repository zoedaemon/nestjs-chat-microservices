import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { RabbitMQHandler } from './rabbitmq.handler';

@Module({
  imports: [MessageModule, WebsocketGateway, RabbitMQHandler],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
