import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { PaymentWebhookDto } from './dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webHookService: WebhookService) {}

  @Post('payments')
  async paymentWebhook(@Body() paymentWebhookDto: PaymentWebhookDto) {
    return this.webHookService.paymentWebhook(paymentWebhookDto);
  }
}
