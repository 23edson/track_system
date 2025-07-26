import mongoose from 'mongoose';
import amqp from 'amqplib';
import Location from './domain/entity/Location';
import { DatabaseConnectionMongo } from './infraestructure/database';
import { RabbitMQConsumer } from './infraestructure/rabbitMQConsumer';
import { HandleLocationUpdate } from './application/usecase/UpdateLocation';


async function main() {

    try {
        const database = new DatabaseConnectionMongo('mongodb://mongo:27017/tracking');

        await database.connect();

        const rabbitMQ = new RabbitMQConsumer()
        await rabbitMQ.connect('amqp://admin:admin@rabbitmq_container')

        const locationUserCase = new HandleLocationUpdate()
        await rabbitMQ.startConsuming('location_update', async (msg) => {

            console.log('Received message:', msg.content.toString());
            await locationUserCase.execute(msg.content.toString());
        })


    } catch (error) {
        console.log('Error starting location service:', error);
    }
}
main()