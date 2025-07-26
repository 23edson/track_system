
export default class Location {

    /* 
        private driverId: string;
        private latitude: number;
        private longitude: number;
        private createdAt: Date;
     */
    constructor(readonly driverId: string, readonly latitude: number, readonly longitude: number, readonly createdAt = new Date()) {


        this.driverId = driverId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
    }

    static create(driverId: string, latitude: number, longitude: number, createdAt?: Date) {
        return new Location(driverId, latitude, longitude, createdAt);
    }
}