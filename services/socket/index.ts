

import http from 'http';
import { SocketIOServer } from './infrastructure/socketServer';
import { HandleLocationUpdate } from './application/usecase/LocationUpdate';
import { RabbitMQPublisher } from './infrastructure/rabbitMQ';
import { LocationSocketController } from './controllers/LocationSocketController';


async function main() {
    try {

        const server = http.createServer();
        const socketServer = new SocketIOServer(server)

        const rabbitMQ = new RabbitMQPublisher()
        await rabbitMQ.connect('amqp://admin:admin@rabbitmq_container')

        const locationUpdateUseCase = new HandleLocationUpdate(rabbitMQ)
        const locationSocketController = new LocationSocketController(socketServer, locationUpdateUseCase);

        socketServer.listen(4000, () => {
            console.log('Socket service is running on port 4000');
        })
    } catch (error: any) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

main()




