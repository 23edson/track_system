import { HandleLocationUpdate } from "../application/usecase/LocationUpdate";
import { SocketServer } from "../infrastructure/socketServer";
import Joi from 'joi';


const locationUpdateSchema = Joi.object({
    driverId: Joi.string().uuid().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
    createdAt: Joi.date().default(() => new Date())
}).required();



export class LocationSocketController {
    private socketServer: SocketServer;
    private handleLocationUpdate: HandleLocationUpdate;

    constructor(socketServer: SocketServer, handleLocationUpdate: HandleLocationUpdate) {
        this.socketServer = socketServer;
        this.handleLocationUpdate = handleLocationUpdate;

        this.initialize();
    }

    private initialize() {
        this.socketServer.onConnection((socket) => {
            console.log('New client:', socket.id);

            socket.on('location_update', async (data: any) => {
                try {
                    const { error, value } = locationUpdateSchema.validate(data);
                    if (error) {
                        console.error('Validation error:', error.details);
                        socket.emit('error', {
                            message: 'Dados inválidos:' + JSON.stringify(error.details)
                        })
                        return;
                    }
                    await this.handleLocationUpdate.execute(value);
                    console.log('Location update processed:', data);
                } catch (error) {
                    console.error('Error location update:', error);
                }
            });
        });
    }
}