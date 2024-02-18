import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('api')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('viewMessages/:recipient')
  async viewMessages(
    @Request() req,
    @Param('recipient') recipient: string,
    @Query('limit') limit: number = 20, // Default limit is 20
    @Query('offset') offset: number = 0, // Default offset is 0
  ) {
    if (offset < 0) {
      return { error: 'Offset must be a non-negative integer' };
    }
    if (limit < 1 || limit > 100) {
      return { error: 'Limit must be between 1 and 100' };
    }
    const owner = req.user.username; // Retrieve owner's username from JWT token
    return this.messageService.getMessages(owner, recipient, limit, offset);
  }

  @Post('sendMessage')
  async sendMessage(
    @Request() req,
    @Body() messageData: { recipient: string; message: string },
  ) {
    const owner = req.user.username; // Retrieve owner's username from JWT token
    await this.messageService.sendMessage(owner, messageData);
  }
}
