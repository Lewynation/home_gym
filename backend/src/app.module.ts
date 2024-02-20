import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook/webhook.module';
import { SocketGatewayModule } from './socket-gateway/socket-gateway.module';

@Module({
  imports: [WebhookModule, SocketGatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
