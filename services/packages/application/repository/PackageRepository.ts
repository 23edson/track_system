import Package from "../../domain/entity/Package";
import DatabaseConnection, { DatabaseConnectionMongo } from "../../infrastructure/database";

interface PackageRepositoryInterface {
    createPackage(package_data: Package): Promise<any>;
    getPackageById(id: string): Promise<any>;
    updatePackage(id: string, data: any): Promise<any>;
    deletePackage(id: string): Promise<void>;
}

export default class PackageRepository implements PackageRepositoryInterface {

    constructor(readonly connection: DatabaseConnection) {

    }
    async createPackage(package_data: Package) {
        const newPackage = await this.connection.query('Package', package_data, 'create');
        return newPackage;
    }

    getPackageById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updatePackage(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deletePackage(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}