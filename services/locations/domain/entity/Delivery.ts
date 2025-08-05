

export default class Delivery {


    private status: string;
    private createdAt: Date;

    constructor(readonly packageId: string, readonly driverId: string, status: string, createdAt = new Date()) {
        this.packageId = packageId;
        this.driverId = driverId;
        this.status = status;
        this.createdAt = createdAt;
    }

    static create(packageId: string, driverId: string, status: string, createdAt?: Date) {

        const delivery = new Delivery(packageId, driverId, status, createdAt);
        return delivery;
    }

    setStatus(newStatus: string) {
        this.status = newStatus;
    }

}