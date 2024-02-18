/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { MessageService } from '../message.service';
import { Server } from 'ws';
import { Socket } from 'socket.io'; // Or can use socket.io/Server instead ws/Server

@WebSocketGateway({
  // path: '/ws',
  // namespace: '/',
  // transports: ['websocket'],
})
@Injectable()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('viewMessages')
  async handleViewMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { userId: string; recipient: string; limit: number; offset: number },
  ) {
    // const owner = client.request.user.username; // Retrieve owner's username from WebSocket connection
    const owner = data.userId;
    if (data.offset < 0) {
      return { error: 'Offset must be a non-negative integer' };
    }
    if (data.limit < 1 || data.limit > 100) {
      return { error: 'Limit must be between 1 and 100' };
    }
    const listMsgs = await this.messageService.getMessages(
      owner,
      data.recipient,
      data.limit,
      data.offset,
    );
    const clientListeningChannel =
      'viewMessagesReply' + data.userId + 'to' + data.recipient;
    const messages = {
      yourListeningChannel: clientListeningChannel,
      messages: listMsgs,
    };
    this.server.to(client.id).emit('viewMessages', messages); // Send messages to the requesting client
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: any,
    data: { userId: string; recipient: string; message: string },
  ) {
    // const owner = client.request.user.username; // Retrieve owner's username from WebSocket connection
    const owner = data.userId;
    await this.messageService.sendMessage(owner, data);
    const clientListeningChannel =
      'viewMessagesReply' + data.userId + 'to' + data.recipient;
    //sent to recipient
    this.server.emit(clientListeningChannel, data);
    //sent to sender
    const reply = {
      status: true,
      data: data,
    };
    this.server.to(client.id).emit('sendMessage', reply); // Acknowledge the client
  }

  @SubscribeMessage('ping')
  handleMessage(_client: any, _data: any) {
    // this.logger.log(`Message received from client id: ${client.id}`);
    // this.logger.debug(`Payload: ${data}`);
    return {
      event: 'pong',
      data: 'OK',
    };
  }
}
