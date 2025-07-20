
import { DatabaseConnectionMongo } from './infrastructure/database';
import PackageRepository from './application/repository/PackageRepository';
import CreatePackage from './application/usecase/CreatePackage';
import CreatePackageController from './controllers/CreatePackageController';
import { HttpServerExpress } from '@track_system/resources/http';

async function main() {

    const httpServer = new HttpServerExpress();

    const database = new DatabaseConnectionMongo('mongodb://mongo:27017/tracking');

    await database.connect();

    const packageRepository = new PackageRepository(database);

    const packageUseCase = new CreatePackage(packageRepository);

    const packageController = new CreatePackageController(httpServer, packageUseCase)

    httpServer.listen(3001)

}

main()
