

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

/*   (async () => {

      try {

          const rabbitConnection = await amqp.connect('amqp://admin:admin@localhost');
          console.log('Successfully connected to RabbitMQ!');


          const channel = await rabbitConnection.createChannel();
          await channel.assertQueue('locations_update');

          socketServer.on('connection', (socket) => {
              console.log('New client connected');

              socket.on('send_location', (data) => {
                  channel.sendToQueue('location_update', Buffer.from(JSON.stringify(data)));
              })
          })
      } catch (err: any) {
          console.error('Failed to connect to RabbitMQ:', err.message);
          // Adicione um log mais detalhado do erro para depuração
          console.error(err);
          // Opcional: tentar reconectar após um tempo
          // setTimeout(connectToRabbitMQ, 5000);
      }
  })() */



