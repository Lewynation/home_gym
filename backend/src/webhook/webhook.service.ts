import { Injectable } from '@nestjs/common';
import { SocketGateway } from 'src/socket-gateway/socket-gateway.gateway';
import { PaymentWebhookDto } from './dto';

@Injectable()
export class WebhookService {
  constructor(private readonly webSocketGateway: SocketGateway) {}

  async paymentWebhook(paymentWebhookDto: PaymentWebhookDto) {
    this.webSocketGateway.sendPaymentConfirmationMessage(
      paymentWebhookDto.userEmail,
      {
        success: paymentWebhookDto.success,
        message: paymentWebhookDto.success
          ? 'Payment successful'
          : 'Payment failed',
      },
    );
  }
}
