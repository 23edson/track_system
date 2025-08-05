import Delivery from "../../domain/entity/Delivery";
import DeliveryRepository from "../repository/DeliveryRepository";

export class HandleDeliveryUpdate {

    constructor(readonly deliveryRepository: DeliveryRepository) { }

    async execute(input: string) {

        try {

            if (!input) {
                throw new Error('Input is not defined');
            }

            const inputData = input as any as Input;

            const deliveryData = Delivery.create(
                inputData.driverId,
                inputData.packageId,
                'in_progress',
                new Date()
            );

            const checkIfDeliveryExists = await this.deliveryRepository.getDeliveryByPackageId(inputData.packageId);
            if (checkIfDeliveryExists) {
                return await this.deliveryRepository.updateDeliveryStatus(deliveryData);
            } else {
                return await this.deliveryRepository.createDelivery(deliveryData);
            }

        } catch (error: any) {
            console.error('Error  location update:', error);
            throw new Error('Failed to process data:' + error.message);
        }
    }
}

interface Input {
    driverId: string;
    packageId: string;
    location: {
        latitude: number;
        longitude: number;
    }

}
