// websocket.adapter.ts

import { WebSocketAdapter, INestApplication } from '@nestjs/common';
import { Server } from 'http';
import * as WebSocket from 'ws';

export class CustomWebSocketAdapter implements WebSocketAdapter {
  constructor(public app: INestApplication) {}

  create(port: number, _options?: any): any {
    return new WebSocket.Server({ port, ..._options });
  }

  bindClientConnect(server: Server, callback: (...args: any[]) => void) {
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: any,
    handlers: any[],
    process: (data: any) => void,
  ) {
    client.on('message', process);
  }

  close(server: Server) {
    server.close();
  }
}
