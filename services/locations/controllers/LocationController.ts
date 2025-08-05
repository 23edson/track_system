import HttpServer from '@track_system/resources/http';
import { GetLocation } from '../application/usecase/GetLocation';
import { GetPackageLocation } from '../application/usecase/GetPackageLocation';


export default class LocationController {

    private httpServer: HttpServer;

    constructor(httpServer: HttpServer, private getLocationUseCase: GetLocation, private getLocationByPackageIdUseCase: GetPackageLocation) {
        this.httpServer = httpServer;

        this.httpServer.route('get', '/locations/:driverId', this.getLocationById.bind(this));
        this.httpServer.route('get', '/locations/package/:packageId', this.getPackageLocation.bind(this));
    }

    async getLocationById(driverId: string) {

        const response = await this.getLocationUseCase.execute(driverId);
        console.log('Location retrieved successfully:', response);
        return response;
    }

    async getPackageLocation(packageId: string) {

        const response = await this.getLocationByPackageIdUseCase.execute(packageId);

        if (response.length === 0) {
            throw new Error('No locations found for the given package ID');
        }

        return response;
    }
}

