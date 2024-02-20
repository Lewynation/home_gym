import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketPaymentConfirmationMessageDto } from './dto';

@WebSocketGateway({
  namespace: 'communication',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly _logger = new Logger('AppController');
  constructor() {}

  handleDisconnect(client: Socket) {
    this._logger.log(`Client disconnected: ${client.id}`);
  }
  handleConnection(client: Socket) {
    this._logger.log(`Client connected: ${client.id}`);
  }

  @WebSocketServer()
  server: Server<any, any>;

  @SubscribeMessage('join_room')
  handleMessage(
    @MessageBody() payload: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(payload.room);
    this._logger.log(`Client ${client.id} joined room ${payload.room}`);
    return;
  }

  sendPaymentConfirmationMessage(
    userEmail: string,
    message: SocketPaymentConfirmationMessageDto,
  ) {
    this._logger.log('sendPaymentConfirmationMessage', userEmail, message);
    this.server.to(userEmail).emit('payment_response', message);
  }
}
