
export default class Location {

    constructor(readonly driverId: string, readonly packageId: string, readonly latitude: number, readonly longitude: number, readonly createdAt = new Date()) {
        this.driverId = driverId;
        this.packageId = packageId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
    }

    static create(driverId: string, packageId: string, latitude: number, longitude: number, createdAt?: Date) {
        return new Location(driverId, packageId, latitude, longitude, createdAt);
    }
}