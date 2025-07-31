import { Messager } from "../../infrastructure/rabbitMQ";
import { SocketIOServer } from "../../infrastructure/socketServer";

export class BroadCastConsumeUpdateLocation {

    private messageQueue: Messager;
    private queueName: string;
    private socket: SocketIOServer;

    constructor(messageQueue: Messager, queueName: string = 'location_broadcast', socket: SocketIOServer) {
        this.messageQueue = messageQueue;
        this.queueName = queueName;
        this.socket = socket;

        this.execute();
    }

    async execute() {

        await this.messageQueue.consumeQueue(this.queueName, async (msg) => {

            const rawBuffer = Buffer.from(msg.data);
            const jsonPayload = JSON.parse(rawBuffer.toString());
            console.log('Broadcasting location update::', jsonPayload);

            this.socket.emit('locationBroadcast', {
                driverId: jsonPayload.driverId,
                latitude: jsonPayload.location.latitude,
                longitude: jsonPayload.location.longitude,
                timestamp: new Date()
            });

        });
    }
}
