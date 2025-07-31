

import http from 'http';
import { SocketIOServer } from './infrastructure/socketServer';
import { HandlePublishLocationUpdate } from './application/usecase/HandlePublishLocationUpdate';
import { RabbitMQ } from './infrastructure/rabbitMQ';
import { LocationSocketController } from './controllers/LocationSocketController';
import { BroadCastConsumeUpdateLocation } from './application/usecase/BroadCastUpdateLocation';


async function main() {
    try {

        const server = http.createServer();
        const socketServer = new SocketIOServer(server)

        const rabbitMQ = new RabbitMQ()
        await rabbitMQ.connect('amqp://admin:admin@rabbitmq_container')

        const locationUpdateUseCase = new HandlePublishLocationUpdate(rabbitMQ)
        new LocationSocketController(socketServer, locationUpdateUseCase);
        new BroadCastConsumeUpdateLocation(rabbitMQ, 'location_broadcast', socketServer);

        socketServer.listen(4000, () => {
            console.log('Socket service is running on port 4000');
        })
    } catch (error: any) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

main()




