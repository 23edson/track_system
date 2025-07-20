import Package from "../../domain/entity/Package";
import PackageRepository from "../repository/PackageRepository";

export default class CreatePackage {

    constructor(readonly packageRepository: PackageRepository) { }

    async execute(input: Input) {

        const packageData = Package.create(
            input.clientId,
            input.drivenId,
            input.destination,
            input.status,
            input.createdAt
        );

        const packageRepository = await this.packageRepository.createPackage(packageData);

        const output: Output = {
            id: packageRepository.id.toString()
        };

        return output;

    }
}

type Input = {
    clientId: string;
    drivenId: string;
    destination: string;
    status: 'aguardando' | 'em_transito' | 'entregue';
    createdAt?: Date;
};

type Output = {
    id: string;
}