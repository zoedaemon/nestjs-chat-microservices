/* eslint-disable @typescript-eslint/no-unused-vars */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './websocket.module';
import { MessageModule } from './message.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { CustomWebSocketAdapter } from './websocket/websocket.adapter';
// import { WebSocketModule } from '@nestjs/websockets';

@Module({
  imports: [WebSocketModule], //MessageModule,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
