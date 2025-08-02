import LocationRepository from "../repository/LocationRepository";

export class GetLocation {

    constructor(readonly locationRepository: LocationRepository) { }

    async execute(driverId: string) {
        try {
            if (!driverId) {
                throw new Error('Driver ID is not defined');
            }

            const location = await this.locationRepository.getLocationById(driverId);
            if (!location) {
                throw new Error('Location not found for the given driver ID');
            }

            return location;

        } catch (error: any) {
            console.error('Error getting location:', error);
            throw new Error('Failed to retrieve location: ' + error.message);
        }
    }
}