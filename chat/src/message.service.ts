import { Injectable } from '@nestjs/common';
import { RabbitMQHandler } from './rabbitmq.handler';

@Injectable()
export class MessageService {
  constructor(private readonly rabbitMQHandler: RabbitMQHandler) {}

  async getMessages(
    owner: string,
    recipient: string,
    limit: number,
    offset: number,
  ) {
    // Consume messages from RabbitMQ for the specific chat conversation
    const queueName = this.generateQueueName(owner, recipient);
    return await this.rabbitMQHandler.consumeMessages(queueName, limit, offset);
  }

  async sendMessage(
    owner: string,
    messageData: { recipient: string; message: string },
  ) {
    // Publish the message to RabbitMQ for the specific chat conversation
    const queueName = this.generateQueueName(owner, messageData.recipient);
    const status = await this.rabbitMQHandler.publishMessage(
      queueName,
      messageData.message,
    );
    return { status: status };
  }

  private generateQueueName(owner: string, recipient: string): string {
    // Generate dynamic queue name based on usernames
    return `${owner}-${recipient}`;
  }
}
