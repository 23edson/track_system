import Delivery from "../../domain/entity/Delivery";
import DatabaseConnection from "../../infraestructure/database";


interface DeliveryRepositoryInterface {
    createDelivery(delivery: Delivery): Promise<Delivery>;
    getDeliveryByPackageId(packageId: string): Promise<Delivery | null>;
    updateDeliveryStatus(deliveryData: Delivery): Promise<Delivery | null>;
    deleteDelivery(packageId: string): Promise<void>;
}


export default class DeliveryRepository implements DeliveryRepositoryInterface {

    constructor(readonly connection: DatabaseConnection) {

    }

    async createDelivery(delivery: Delivery): Promise<Delivery> {
        const newDelivery = await this.connection.query('Delivery', delivery, 'create');
        return newDelivery;
    }

    async getDeliveryByPackageId(packageId: string): Promise<Delivery | null> {
        const delivery = await this.connection.query('Delivery', { packageId }, 'findOne');
        return delivery || null;
    }

    async updateDeliveryStatus(deliveryData: Delivery): Promise<Delivery | null> {
        const delivery = await this.getDeliveryByPackageId(deliveryData.packageId);
        await this.connection.query('Delivery', delivery, 'updateOne');
        return delivery;
    }

    async deleteDelivery(id: string): Promise<void> {
        await this.connection.query('Delivery', { id }, 'deleteOne');
    }
}