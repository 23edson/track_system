import LocationRepository from "../repository/LocationRepository";

export class GetPackageLocation {

    constructor(readonly locationRepository: LocationRepository) { }

    async execute(packageId: string) {
        try {
            if (!packageId) {
                throw new Error('Package ID is not defined');
            }

            const location = await this.locationRepository.getLocationById(packageId);
            if (!location) {
                throw new Error('Location not found for the given package ID');
            }

            return location;

        } catch (error: any) {
            console.error('Error getting location:', error);
            throw new Error('Failed to retrieve location: ' + error.message);
        }
    }
}