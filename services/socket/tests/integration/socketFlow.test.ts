
import { io as Client } from 'socket.io-client';
import { SocketIOServer } from '../../infrastructure/socketServer';

import { HandlePublishLocationUpdate } from '../../application/usecase/HandlePublishLocationUpdate';
import { LocationSocketController } from '../../controllers/LocationSocketController';
import { jest } from '@jest/globals';
import http from 'http';


const SOCKET_URL = 'http://localhost:4001';

test('teste', () => {
    expect(true).toBe(true);
});

describe('Socket Service Integration', () => {
    let socketServer: any;
    let mockMessagePublisher: any
    let clientSocket: any;
    const server = http.createServer();

    beforeAll(async () => {

        mockMessagePublisher = {
            publish: jest.fn(),
            connect: jest.fn(),
            disconnect: jest.fn()
        } as any;

        // Instancia a aplicação com o mock
        socketServer = new SocketIOServer(server);
        const handleLocationUpdateUseCase = new HandlePublishLocationUpdate(mockMessagePublisher);
        new LocationSocketController(socketServer, handleLocationUpdateUseCase);

        // Inicia o servidor Socket.IO
        socketServer.listen(4001);

        // Conecta o cliente de teste
        clientSocket = Client(SOCKET_URL);


        await new Promise((resolve) => clientSocket.on('connect', resolve));
    }, 10000); // Aumenta o timeout para garantir que o servidor e o cliente se conectem

    afterAll(async () => {
        // Desconecta o cliente e fecha o servidor
        clientSocket.disconnect();

        await new Promise((resolve) => setTimeout(resolve, 500));
    });

    it('Deve atualizar a localização do entregador', async () => {
        const testData = {
            driverId: '123e4567-e89b-12d3-a456-426614174000',
            latitude: -23.1234,
            longitude: -46.5678,
        };

        // Emite o evento do cliente para o servidor
        clientSocket.emit('location_update', testData);

        await new Promise((resolve) => setTimeout(resolve, 100));

        // Verifica se o mock do RabbitMQPublisher foi chamado
        expect(mockMessagePublisher.publish).toHaveBeenCalledTimes(1);
        expect(mockMessagePublisher.publish).toHaveBeenCalledWith(
            'location_updates',
            expect.objectContaining({
                driverId: testData.driverId,
                latitude: testData.latitude,
                longitude: testData.longitude,
                timestamp: expect.any(Date)
            })
        );
    });

    /*  it('Não deve publicar dados inválidos e deve emitir um erro de volta', async () => {
         mockMessagePublisher.publish.mockClear();
         const invalidData = {
             driverId: 'invalid-id',
             latitude: 'not-a-number',
         };
 
         const errorPromise = new Promise((resolve) => {
             clientSocket.once('error', (error: any) => {
                 expect(error.message).toBe('Dados de localização inválidos.');
                 resolve(true);
             });
         });
 
         clientSocket.emit('location_update', invalidData);
 
         await errorPromise; 
 
         expect(mockMessagePublisher.publish).not.toHaveBeenCalled();
     }); */
});