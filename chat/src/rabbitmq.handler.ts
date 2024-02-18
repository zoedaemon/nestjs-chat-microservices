// rabbitmq.handler.ts

import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as amqp from 'amqplib';
// import { WebsocketGateway } from './websocket/websocket.gateway';

@Injectable()
export class RabbitMQHandler {
  private client: ClientProxy;
  // constructor(private readonly websocketGateway: WebsocketGateway)

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], // RabbitMQ connection URL
        queue: 'chat_queue', // RabbitMQ queue name
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async handleMessage(message: any) {
    // Forward the message to connected clients via WebSockets
    // Example: broadcast message to WebSocket clients
    this.client.emit('chat_message', message);
  }

  async startListening() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'chat_queue';
    await channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        this.handleMessage(msg.content.toString());
        // channel.ack(msg);//Don't do Ack so can retrieve again and again the data
      }
    });
  }

  async publishMessage(queueName: string, message: string) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    // Publish the message to RabbitMQ queue
    const resp = channel.sendToQueue(queueName, Buffer.from(message), {
      persistent: true,
    });

    await channel.close();
    await connection.close();

    return resp;
  }

  async consumeMessages(queueName: string, limit?: number, offset?: number) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    const messages = [];
    let consumedMessages = 0;
    await channel.consume(queueName, (msg) => {
      if (msg !== null) {
        if (consumedMessages >= offset && messages.length < limit) {
          messages.push(msg.content.toString());
        }
        // channel.ack(msg);//Don't do Ack so can retrieve again and again the data
        consumedMessages++;
      }
    });

    await channel.close();
    await connection.close();

    return messages;
  }
}
