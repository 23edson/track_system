
import amqp from 'amqplib';
import * as socketIo from 'socket.io';
import http from 'http';


const server = http.createServer();

const socketServer = new socketIo.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

(async () => {

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
})()

server.listen(4000, () => {
    console.log('Socket service is running on port 4000');
})


