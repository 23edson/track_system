import mongoose from 'mongoose';
import amqp from 'amqplib';
import Location from './domain/entity/Location';
import { DatabaseConnectionMongo } from './infraestructure/database';
import { RabbitMQConsumer } from './infraestructure/rabbitMQConsumer';
import { HandleLocationUpdate } from './application/usecase/UpdateLocation';
import LocationRepository from './application/repository/LocationRepository';
import { HttpServerExpress } from '@track_system/resources/http';
import LocationController from './controllers/LocationController';
import { GetLocation } from './application/usecase/GetLocation';
import DeliveryRepository from './application/repository/DeliveryRepository';
import { HandleDeliveryUpdate } from './application/usecase/UpdateDelivery';
import { GetPackageLocation } from './application/usecase/GetPackageLocation';


async function main() {

    try {
        const database = new DatabaseConnectionMongo('mongodb://mongo:27017/tracking');

        const httpServer = new HttpServerExpress();
        await database.connect();

        const rabbitMQ = new RabbitMQConsumer()
        await rabbitMQ.connect('amqp://admin:admin@rabbitmq_container')

        const locationRepository = new LocationRepository(database);
        const locationUpdateUserCase = new HandleLocationUpdate(locationRepository);
        const locationGetUserCase = new GetLocation(locationRepository);
        const locationGetByPackageIdUseCase = new GetPackageLocation(locationRepository);

        const deliveryUpdateUserCase = new HandleDeliveryUpdate(new DeliveryRepository(database));
        await rabbitMQ.startConsuming('location_update', async (msg) => {

            console.log('Received message:', msg);
            await locationUpdateUserCase.execute(msg);
            await deliveryUpdateUserCase.execute(msg);

            rabbitMQ.sendTOQueue('location_broadcast', Buffer.from(JSON.stringify({
                driverId: msg.driverId,
                packageId: msg.packageId,
                location: {
                    latitude: msg.location.latitude,
                    longitude: msg.location.longitude,
                }
            })));
            console.log('Message sent to location_broadcast queue');
        })
        new LocationController(httpServer, locationGetUserCase, locationGetByPackageIdUseCase);
        httpServer.listen(3004)


    } catch (error) {
        console.log('Error starting location service:', error);
    }
}
main()