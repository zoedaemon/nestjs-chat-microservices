import { Module } from '@nestjs/common';
import { MessageController } from './api/message.controller';
import { MessageService } from './message.service';
import { RabbitMQHandler } from './rabbitmq.handler';
import { RabbitMQModule } from './rabbitmq.module';
// import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [RabbitMQModule],
  controllers: [MessageController],
  providers: [RabbitMQHandler, MessageService],
  exports: [RabbitMQHandler, MessageService],
})
export class MessageModule {}
