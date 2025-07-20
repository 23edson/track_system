import mongoose from 'mongoose';
import amqp from 'amqplib';
import Location from './models/location';


mongoose.connect('mongodb://mongo:27017/tracking');

(async () => {

    const rabbitConnection = await amqp.connect('amqp://admin:admin@rabbitmq_container');

    const channel = await rabbitConnection.createChannel();
    await channel.assertQueue('locations_update')

    channel.consume('locations_update', async (msg) => {
        if (msg) {
            const data = JSON.parse(msg.content.toString())
            await Location.create(data);
            channel.ack(msg)
        }
    })
})();
