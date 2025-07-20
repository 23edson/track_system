import express, { Express } from 'express';
import cors from 'cors';

export default interface HttpServer {
    route(method: string, url: string, callback: Function): void;
    listen(port: number): void;
}

export class HttpServerExpress implements HttpServer {

    express: Express

    constructor() {
        this.express = express()
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
        this.express.use(cors())

    }
    listen(port: number): void {
        this.express.listen(port, () => {
            console.log(`Service is running on port ${port}`);
        })
    }

    route(method: 'get' | 'post' | 'put' | 'delete', url: string, callback: Function): void {

        this.express[method](url, async (req, res) => {
            try {

                const response = await callback(req.params, req.body);

                console.log('esseeeee')
                console.log(response)
                res.status(200).json(response);

            } catch (error: any) {
                console.error('Error in route handler:', error);
                res.status(500).json({ error: error.message || 'Internal Server Error' });
            }
        })


    }
}