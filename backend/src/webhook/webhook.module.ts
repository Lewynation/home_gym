import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { SocketGatewayModule } from 'src/socket-gateway/socket-gateway.module';

@Module({
  providers: [WebhookService],
  controllers: [WebhookController],
  imports: [SocketGatewayModule],
})
export class WebhookModule {}
