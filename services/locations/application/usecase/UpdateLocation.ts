import Location from "../../domain/entity/Location";

export class HandleLocationUpdate {

    async execute(input: string) {

        try {

            if (!input) {
                throw new Error('Input is not defined');
            }

            const inputData = JSON.parse(input) as Input;

            const locationData = Location.create(
                inputData.driverId,
                inputData.latitude,
                inputData.longitude,
                new Date()
            );

            Location.create(locationData.driverId, locationData.latitude, locationData.longitude);

        } catch (error: any) {
            console.error('Error  location update:', error);
            throw new Error('Failed to process data:' + error.message);
        }
    }
}

interface Input {
    driverId: string;
    latitude: number;
    longitude: number;
}
