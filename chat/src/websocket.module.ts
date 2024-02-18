import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { MessageModule } from './message.module';
import { RabbitMQModule } from './rabbitmq.module';

@Module({
  imports: [RabbitMQModule, MessageModule],
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebSocketModule {}
