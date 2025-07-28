import Location from "../../domain/entity/Location";
import DatabaseConnection, { DatabaseConnectionMongo } from "../../infraestructure/database";

interface LocationRepositoryInterface {
    createLocation(location_data: Location): Promise<any>;
    getLocationById(id: string): Promise<any>;
    updateLocation(id: string, data: any): Promise<any>;
    deleteLocation(id: string): Promise<void>;
}

export default class LocationRepository implements LocationRepositoryInterface {

    constructor(readonly connection: DatabaseConnection) {

    }
    async createLocation(location_data: Location) {
        const newLocation = await this.connection.query('Location', location_data, 'create');
        return newLocation;
    }

    getLocationById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateLocation(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteLocation(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}