import { Module } from '@nestjs/common';
import { MessageController } from './api/message.controller';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { MessageService } from './message.service';
import { RabbitMQHandler } from './rabbitmq.handler';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [WebsocketGateway, MessageService, RabbitMQHandler],
})
export class MessageModule {}
