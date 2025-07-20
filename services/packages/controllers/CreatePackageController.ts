import HttpServer from '@track_system/resources/http';
import CreatePackage from '../application/usecase/CreatePackage';

export default class CreatePackageController {

    private httpServer: HttpServer;

    constructor(httpServer: HttpServer, private createPackageUseCase: CreatePackage) {
        this.httpServer = httpServer;

        this.httpServer.route('post', '/packages', this.createPackage.bind(this))
    }

    async createPackage(params: any, body: any) {
        console.log(body)
        const data = body;
        const response = await this.createPackageUseCase.execute(data)
        console.log('Package created successfully:', response);
        console.log(response)
        return response
    }
}

