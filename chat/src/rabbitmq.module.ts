import { Module } from '@nestjs/common';
import { RabbitMQHandler } from './rabbitmq.handler';

@Module({
  imports: [],
  providers: [RabbitMQHandler],
  exports: [RabbitMQHandler],
})
export class RabbitMQModule {}
