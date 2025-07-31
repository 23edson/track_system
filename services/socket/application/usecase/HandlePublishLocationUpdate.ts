import { Messager } from "../../infrastructure/rabbitMQ";
import Location from "../../domain/entity/Location";

export class HandlePublishLocationUpdate {

    private messageQueue: Messager;
    private queueName: string;

    constructor(messageQueue: Messager, queueName: string = 'location_update') {
        this.messageQueue = messageQueue;
        this.queueName = queueName;
    }

    async execute(input: Input) {


        const locationData = Location.create(
            input.driverId,
            input.latitude,
            input.longitude,
            new Date()
        );
        const message = {
            driverId: locationData.driverId,
            location: {
                latitude: locationData.latitude,
                longitude: locationData.longitude,
            },
        };
        await this.messageQueue.publish(this.queueName, message);
    }
}

interface Input {
    driverId: string;
    latitude: number;
    longitude: number;
}
