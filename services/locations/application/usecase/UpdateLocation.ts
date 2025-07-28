import Location from "../../domain/entity/Location";
import LocationRepository from "../repository/LocationRepository";

export class HandleLocationUpdate {

    constructor(readonly locationRepository: LocationRepository) { }

    async execute(input: string) {

        try {

            if (!input) {
                throw new Error('Input is not defined');
            }

            const inputData = input as any as Input;

            const locationData = Location.create(
                inputData.driverId,
                inputData.location.latitude,
                inputData.location.longitude,
                new Date()
            );

            const locationRepository = await this.locationRepository.createLocation(locationData);

        } catch (error: any) {
            console.error('Error  location update:', error);
            throw new Error('Failed to process data:' + error.message);
        }
    }
}

interface Input {
    driverId: string;
    location: {
        latitude: number;
        longitude: number;
    }

}
