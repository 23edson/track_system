import mongoose from 'mongoose';
import amqp from 'amqplib';
import Location from './domain/entity/Location';
import { DatabaseConnectionMongo } from './infraestructure/database';
import { RabbitMQConsumer } from './infraestructure/rabbitMQConsumer';
import { HandleLocationUpdate } from './application/usecase/UpdateLocation';
import LocationRepository from './application/repository/LocationRepository';


async function main() {

    try {
        const database = new DatabaseConnectionMongo('mongodb://mongo:27017/tracking');

        await database.connect();

        const rabbitMQ = new RabbitMQConsumer()
        await rabbitMQ.connect('amqp://admin:admin@rabbitmq_container')

        const locationRepository = new LocationRepository(database);
        const locationUserCase = new HandleLocationUpdate(locationRepository);
        await rabbitMQ.startConsuming('location_update', async (msg) => {

            console.log('Received message:', msg);
            await locationUserCase.execute(msg);

            rabbitMQ.sendTOQueue('location_broadcast', Buffer.from(JSON.stringify({
                driverId: msg.driverId,
                location: {
                    latitude: msg.location.latitude,
                    longitude: msg.location.longitude,
                }
            })));
            console.log('Message sent to location_broadcast queue');
        })


    } catch (error) {
        console.log('Error starting location service:', error);
    }
}
main()