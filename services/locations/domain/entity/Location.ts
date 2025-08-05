
export default class Location {


    constructor(readonly driverId: string, readonly packageId: string, readonly latitude: number, readonly longitude: number, readonly createdAt = new Date()) {
        this.driverId = driverId;
        this.packageId = packageId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
    }

    validate() {
        if (!this.driverId) {
            throw new Error('Entregador é obrigatório');
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            throw new Error('Latitude e Longitude devem ser números');
        }

        if (this.latitude < -90 || this.latitude > 90) {
            throw new Error('Latitude deve estar entre -90 e 90');
        }
        if (this.longitude < -180 || this.longitude > 180) {
            throw new Error('Longitude deve estar entre -180 e 180');
        }
    }

    static create(driverId: string, packageId: string, latitude: number, longitude: number, createdAt?: Date) {
        return new Location(driverId, packageId, latitude, longitude, createdAt);
    }
}