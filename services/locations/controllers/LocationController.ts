import HttpServer from '@track_system/resources/http';
import { GetLocation } from '../application/usecase/GetLocation';


export default class LocationController {

    private httpServer: HttpServer;

    constructor(httpServer: HttpServer, private getLocationUseCase: GetLocation) {
        this.httpServer = httpServer;

        this.httpServer.route('get', '/locations/:driverId', this.getLocationById.bind(this));
    }

    async getLocationById(driverId: string) {

        const response = await this.getLocationUseCase.execute(driverId);
        console.log('Location retrieved successfully:', response);
        return response;
    }

}

