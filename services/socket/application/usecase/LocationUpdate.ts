import { MessagePublisher } from "../../infrastructure/rabbitMQ";
import Location from "../../domain/entity/Location";

export class HandleLocationUpdate {

    private messagePublisher: MessagePublisher;
    private queueName: string;

    constructor(messagePublisher: MessagePublisher, queueName: string = 'location_update') {
        this.messagePublisher = messagePublisher;
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
        await this.messagePublisher.publish(this.queueName, message);
    }
}

interface Input {
    driverId: string;
    latitude: number;
    longitude: number;
}
